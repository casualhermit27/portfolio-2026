"use client";

import { useEffect, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
// Source frames are all 100×100px. Feet land at y=64 in every animation.
const SRC   = 100;   // source frame size (px)
const SCALE = 2;     // display scale (2× for crisp pixel art)
const DISP  = SRC * SCALE; // 200px — one displayed frame side
const FEET  = 64 * SCALE;  // 128px — feet offset from sprite top at display scale

// All @keyframes pre-built as a static string → injected once, never re-injected
const KEYFRAMES = `
  @keyframes sb-walk    { from{background-position:0 0} to{background-position:-${DISP  *  8}px 0} }
`;

const SPRITES = {
  walk: { src: "/saint-bernard-walk.png", frames: 8, dur: "0.8s", kf: "sb-walk" },
} as const;

type AnimType = keyof typeof SPRITES;

// ms the dog takes to cross the full viewport width (walk time only, excludes pauses)
const WALK_MS = 12000;

// ── Sprite renderer ───────────────────────────────────────────────────────────
// No style injection here — keyframes are global, set once above.
function SaintBernard({ anim }: { anim: AnimType }) {
  const s = SPRITES[anim];

  return (
    <div
      style={{
        width:            DISP,
        height:           DISP,
        backgroundImage:  `url('${s.src}')`,
        backgroundSize:   `${DISP * s.frames}px ${DISP}px`,
        backgroundRepeat: "no-repeat",
        imageRendering:   "pixelated",
        animation:        `${s.kf} ${s.dur} steps(${s.frames}) infinite`,
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DogDivider() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const dogRef         = useRef<HTMLDivElement>(null);
  const rafRef         = useRef<number | undefined>(undefined);
  const lastTRef       = useRef(0);
  const walkMsRef      = useRef(0);      // ms spent walking in current crossing

  // Warm the sprite sheet before the first visible crossing.
  useEffect(() => {
    Object.values(SPRITES).forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // ── Walking loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    walkMsRef.current = 0;

    const tick = (t: number) => {
      const dt = lastTRef.current ? Math.min(t - lastTRef.current, 50) : 0;
      lastTRef.current = t;

      const cw = containerRef.current?.offsetWidth ?? window.innerWidth;
      // Off-screen margins in px — ensures dog is fully hidden before/after crossing
      const margin  = DISP / 2 + 30; // 130px
      const startPx = -margin;
      const endPx   = cw + margin;

      walkMsRef.current += dt;

      if (walkMsRef.current >= WALK_MS) {
        walkMsRef.current = 0;
      }

      const progress = walkMsRef.current / WALK_MS;
      const leftPx   = startPx + progress * (endPx - startPx);

      if (dogRef.current) {
        dogRef.current.style.left = `${leftPx}px`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Geometry ──────────────────────────────────────────────────────────────
  // Container: 80px tall. Line near bottom. Dog top = lineY - FEET.
  const containerH = 80;
  const lineY      = 72;            // px from container top
  const dogTopPx   = lineY - FEET;  // –56px — sprite top sits above container

  return (
    <>
      {/* ── Global keyframes — injected exactly once ─────────────────────── */}
      <style>{KEYFRAMES}</style>

      {/* ── Inline walking divider ────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          position:  "relative",
          width:     "100%",
          height:    containerH,
          overflow:  "visible",
          pointerEvents: "none",
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
          <SaintBernard anim="walk" />
        </div>
      </div>
    </>
  );
}
