"use client";

import { useEffect, useRef, useState } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
// Source frames are all 100×100px. Feet land at y=64 in every animation.
const SRC   = 100;   // source frame size (px)
const SCALE = 2;     // display scale (2× for crisp pixel art)
const DISP  = SRC * SCALE; // 200px — one displayed frame side
const FEET  = 64 * SCALE;  // 128px — feet offset from sprite top at display scale

// Small version for the scroll progress bar
const BAR_SCALE = 0.55;
const BAR_W     = Math.round(DISP * BAR_SCALE); // 110px

// All @keyframes pre-built as a static string → injected once, never re-injected
const KEYFRAMES = `
  @keyframes sb-walk    { from{background-position:0 0} to{background-position:-${DISP  *  8}px 0} }
  @keyframes sb-idle    { from{background-position:0 0} to{background-position:-${DISP  * 10}px 0} }
  @keyframes sb-lick    { from{background-position:0 0} to{background-position:-${DISP  *  4}px 0} }
  @keyframes sb-stretch { from{background-position:0 0} to{background-position:-${DISP  * 10}px 0} }
  @keyframes sb-bark    { from{background-position:0 0} to{background-position:-${DISP  *  3}px 0} }
  @keyframes sb-bar-walk{ from{background-position:0 0} to{background-position:-${BAR_W *  8}px 0} }
`;

const SPRITES = {
  walk:    { src: "/saint-bernard-walk.png",    frames: 8,  dur: "0.8s",  durMs: 800,  kf: "sb-walk",    cycleMs: 800 },
  idle:    { src: "/saint-bernard-idle.png",    frames: 10, dur: "1.0s",  durMs: 1000, kf: "sb-idle",    cycleMs: 1000 },
  lick:    { src: "/saint-bernard-lick.png",    frames: 4,  dur: "0.6s",  durMs: 600,  kf: "sb-lick",    cycleMs: 600, startFrame: 2 },
  stretch: { src: "/saint-bernard-stretch.png", frames: 10, dur: "1.1s",  durMs: 1100, kf: "sb-stretch", cycleMs: 1100 },
  bark:    { src: "/saint-bernard-bark.png",    frames: 3,  dur: "0.45s", durMs: 450,  kf: "sb-bark",   cycleMs: 900, startFrame: 2 },
} as const;

type AnimType = keyof typeof SPRITES;

// ms the dog takes to cross the full viewport width (walk time only, excludes pauses)
const WALK_MS = 12000;

// ── Sprite renderer ───────────────────────────────────────────────────────────
// No style injection here — keyframes are global, set once above.
function SaintBernard({ anim, bar = false }: { anim: AnimType; bar?: boolean }) {
  const s = SPRITES[anim];
  const w = bar ? BAR_W : DISP;
  const h = w;
  const kf = bar ? "sb-bar-walk" : s.kf;
  const dur = bar ? "0.8s" : s.dur;
  const startFrame = !bar && "startFrame" in s ? s.startFrame : 0;
  const animationDelay = startFrame ? `${-(s.durMs / s.frames) * startFrame}ms` : undefined;

  return (
    <div
      style={{
        width:            w,
        height:           h,
        backgroundImage:  `url('${s.src}')`,
        backgroundSize:   `${w * s.frames}px ${h}px`,
        backgroundRepeat: "no-repeat",
        imageRendering:   "pixelated",
        animation:        `${kf} ${dur} steps(${s.frames}) infinite`,
        animationDelay,
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DogDivider() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollMode,   setIsScrollMode]   = useState(false);
  const [anim,           setAnim]           = useState<AnimType>("walk");

  const containerRef   = useRef<HTMLDivElement>(null);
  const dogRef         = useRef<HTMLDivElement>(null);
  const rafRef         = useRef<number | undefined>(undefined);
  const lastTRef       = useRef(0);
  const walkMsRef      = useRef(0);      // ms spent walking in current crossing
  const animStateRef   = useRef<AnimType>("walk");
  const actionQueueRef = useRef<AnimType[]>([]);
  const nextSwitchRef  = useRef(0);      // RAF timestamp for next state switch
  const freshLoopRef   = useRef(true);   // true right after a loop reset

  // Warm sprite sheets before the first pause so image swaps do not flash.
  useEffect(() => {
    Object.values(SPRITES).forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // ── Scroll tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(y / max, 1) : 0);
      setIsScrollMode(y > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Walking / idle state machine ──────────────────────────────────────────
  useEffect(() => {
    if (isScrollMode) {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      lastTRef.current = 0;
      return;
    }

    // Reset state when coming back from scroll mode
    walkMsRef.current     = 0;
    freshLoopRef.current  = true;
    animStateRef.current  = "walk";
    actionQueueRef.current = [];
    setAnim("walk");

    const tick = (t: number) => {
      const dt = lastTRef.current ? Math.min(t - lastTRef.current, 50) : 0;
      lastTRef.current = t;

      // Seed the first switch timer
      if (nextSwitchRef.current === 0) {
        nextSwitchRef.current = t + 3000 + Math.random() * 3000;
      }

      const cw = containerRef.current?.offsetWidth ?? window.innerWidth;
      // Off-screen margins in px — ensures dog is fully hidden before/after crossing
      const margin  = DISP / 2 + 30; // 130px
      const startPx = -margin;
      const endPx   = cw + margin;

      const state = animStateRef.current;

      if (state === "walk") {
        walkMsRef.current += dt;

        if (walkMsRef.current >= WALK_MS) {
          // Dog has crossed — reset fully off-screen left and re-walk
          walkMsRef.current    = 0;
          freshLoopRef.current = true;
          // Don't allow a pause for the first 35% of the next crossing
          nextSwitchRef.current = t + WALK_MS * 0.35 + Math.random() * (WALK_MS * 0.25);
        }

        const progress = walkMsRef.current / WALK_MS;
        const leftPx   = startPx + progress * (endPx - startPx);

        if (dogRef.current) {
          dogRef.current.style.left = `${leftPx}px`;
        }

        // Clear "fresh loop" flag once dog is safely into the crossing.
        if (freshLoopRef.current && progress > 0.35) {
          freshLoopRef.current = false;
        }

        // Pause only when: dog is in mid-screen (30–70%), not freshly looped, timer ready
        if (!freshLoopRef.current && progress > 0.30 && progress < 0.70 && t >= nextSwitchRef.current) {
          const sequence: AnimType[] =
            Math.random() < 0.5
              ? ["idle", "lick", "bark", "stretch", "idle"]
              : ["idle", "stretch", "bark", "lick", "idle"];
          const [next, ...rest] = sequence;

          actionQueueRef.current = rest;
          animStateRef.current = next;
          setAnim(next);
          nextSwitchRef.current = t + SPRITES[next].cycleMs;
        }
      } else {
        // Paused — don't move dog. Complete each sprite cycle before switching.
        if (t >= nextSwitchRef.current) {
          const next = actionQueueRef.current.shift();

          if (next) {
            animStateRef.current = next;
            setAnim(next);
            nextSwitchRef.current = t + SPRITES[next].cycleMs;
          } else {
            animStateRef.current  = "walk";
            setAnim("walk");
            nextSwitchRef.current = t + WALK_MS * 0.35 + Math.random() * (WALK_MS * 0.3);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      nextSwitchRef.current = 0; // reset so it re-seeds next time
      actionQueueRef.current = [];
    };
  }, [isScrollMode]);

  // ── Geometry ──────────────────────────────────────────────────────────────
  // Container: 80px tall. Line near bottom. Dog top = lineY - FEET.
  const containerH = 80;
  const lineY      = 72;            // px from container top
  const dogTopPx   = lineY - FEET;  // –56px — sprite top sits above container

  // Progress bar dog: feet at bottom of the 3px bar → translateY(-barFeet)
  const barFeetPx = Math.round(FEET * BAR_SCALE); // 70px

  return (
    <>
      {/* ── Global keyframes — injected exactly once ─────────────────────── */}
      <style>{KEYFRAMES}</style>

      {/* ── Scroll progress bar (fixed, top of page) ─────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0"
        style={{
          height:  3,
          zIndex:  999,
          opacity: isScrollMode ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {/* track */}
        <div className="absolute inset-0" style={{ background: "var(--border)" }} />
        {/* fill */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width:      `${scrollProgress * 100}%`,
            background: "var(--text-primary)",
            opacity:    0.6,
            transition: "width 0.05s linear",
          }}
        />
        {/* dog riding the bar */}
        <div
          style={{
            position:  "absolute",
            // clamp so dog center never clips at either edge
            left:      `clamp(${BAR_W / 2}px, ${scrollProgress * 100}%, calc(100% - ${BAR_W / 2}px))`,
            top:       3,                                    // just below bar surface
            transform: `translateX(-50%) translateY(-${barFeetPx}px)`,
          }}
        >
          <SaintBernard anim="walk" bar />
        </div>
      </div>

      {/* ── Inline walking divider ────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          position:  "relative",
          width:     "100%",
          height:    containerH,
          overflow:  "visible",
          opacity:   isScrollMode ? 0 : 1,
          transition:"opacity 0.35s ease",
          pointerEvents: isScrollMode ? "none" : "auto",
        }}
      >
        {/* Divider line */}
        <div
          style={{
            position:   "absolute",
            top:        lineY,
            left:       0,
            right:      0,
            height:     1,
            background: "var(--border)",
          }}
        />

        {/* Dog — `left` owned entirely by RAF, never set in JSX */}
        <div
          ref={dogRef}
          style={{
            position:  "absolute",
            top:       dogTopPx,           // feet land exactly on lineY
            transform: "translateX(-50%)", // center sprite on left position
            pointerEvents: "none",
          }}
        >
          <SaintBernard anim={anim} />
        </div>
      </div>
    </>
  );
}
