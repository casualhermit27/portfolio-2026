"use client";

import { useEffect, useRef, useState } from "react";

// ── Sprite config ────────────────────────────────────────────────────────────
// All source frames are 100×100px. Feet hit at y=64 (64%) in every animation.
const FEET_PX = 64; // pixel row of feet in source frame
const SRC_SIZE = 100;

// Display at 2× for crisp pixel art
const SCALE = 2;
const DISP = SRC_SIZE * SCALE; // 200px — display size of one frame square

const SPRITES = {
  walk: { src: "/saint-bernard-walk.png", frames: 8,  fps: 10 },
  idle: { src: "/saint-bernard-idle.png", frames: 10, fps: 10 },
  lick: { src: "/saint-bernard-lick.png", frames: 4,  fps:  8 },
} as const;

type AnimType = keyof typeof SPRITES;

// How long the dog takes to cross the full screen width (walk-time only)
const WALK_DURATION = 11000; // ms

// ── Sprite display component ─────────────────────────────────────────────────
function SaintBernard({
  anim,
  scale = 1,
}: {
  anim: AnimType;
  scale?: number;
}) {
  const s = SPRITES[anim];
  const w = Math.round(DISP * scale);
  const h = Math.round(DISP * scale);
  const keyframe = `sb-${anim}-${w}`;

  return (
    <>
      <style>{`
        @keyframes ${keyframe} {
          from { background-position: 0px 0px; }
          to   { background-position: -${w * s.frames}px 0px; }
        }
      `}</style>
      <div
        style={{
          width: w,
          height: h,
          backgroundImage: `url('${s.src}')`,
          backgroundSize: `${w * s.frames}px ${h}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          animation: `${keyframe} ${(s.frames / s.fps).toFixed(3)}s steps(${s.frames}) infinite`,
        }}
      />
    </>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function DogDivider() {
  const [scrollY, setScrollY]       = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [anim, setAnim]             = useState<AnimType>("walk");

  // Refs for the RAF loop — avoids stale closures
  const dogRef          = useRef<HTMLDivElement>(null);
  const animRef         = useRef<number | undefined>(undefined);
  const startedRef      = useRef(false);
  const lastTRef        = useRef(0);
  const walkElapsedRef  = useRef(0);  // ms actually spent walking
  const animStateRef    = useRef<AnimType>("walk");
  const nextSwitchRef   = useRef(0);  // RAF timestamp for next state switch

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrollMode = scrollY > 10;

  // ── Walking + idle state machine ──────────────────────────────────────────
  useEffect(() => {
    if (isScrollMode) {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
      startedRef.current = false;
      lastTRef.current   = 0;
      return;
    }

    // Reset dog to off-screen left and show walking sprite
    if (dogRef.current) dogRef.current.style.left = "-4%";
    animStateRef.current = "walk";
    setAnim("walk");

    const tick = (t: number) => {
      if (!startedRef.current) {
        startedRef.current   = true;
        lastTRef.current     = t;
        walkElapsedRef.current = 0;
        // First walk: 3–6 seconds before first pause
        nextSwitchRef.current = t + 3000 + Math.random() * 3000;
      }

      const dt = Math.min(t - lastTRef.current, 50); // cap to avoid time-warp jumps
      lastTRef.current = t;

      const state = animStateRef.current;

      if (state === "walk") {
        walkElapsedRef.current += dt;

        // Loop the walk back to the start (happens off-screen)
        if (walkElapsedRef.current >= WALK_DURATION) {
          walkElapsedRef.current = 0;
        }

        const progress = walkElapsedRef.current / WALK_DURATION;
        if (dogRef.current) {
          dogRef.current.style.left = `${-4 + progress * 108}%`;
        }

        // Only pause when dog is visibly on screen (25–75% of journey)
        if (progress > 0.25 && progress < 0.75 && t >= nextSwitchRef.current) {
          const next: AnimType = Math.random() < 0.55 ? "idle" : "lick";
          animStateRef.current = next;
          setAnim(next);
          // Pause for 1.5–3s
          nextSwitchRef.current = t + 1500 + Math.random() * 1500;
        }
      } else {
        // Paused (idle or lick) — don't advance position
        if (t >= nextSwitchRef.current) {
          animStateRef.current = "walk";
          setAnim("walk");
          // Walk for 4–8s before next pause
          nextSwitchRef.current = t + 4000 + Math.random() * 4000;
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
    };
  }, [isScrollMode]);

  // ── Geometry ──────────────────────────────────────────────────────────────
  // Feet are at FEET_PX/SRC_SIZE of the source frame = same fraction at 2× scale.
  // We want feet to sit exactly on the divider line.
  // dogRef top = lineY - (FEET_PX * SCALE)
  const feetOffsetPx = FEET_PX * SCALE; // 128px — feet from sprite top at 2×
  const containerH   = 80;              // px
  const lineY        = 70;              // px from container top
  const dogTop       = lineY - feetOffsetPx; // -58px — sprite starts above container

  // For the scroll bar dog (0.6× of DISP)
  const barScale     = 0.55;
  const barFeetPx    = Math.round(feetOffsetPx * barScale); // feet offset at bar scale

  return (
    <>
      {/* ── Fixed scroll progress bar ─────────────────────────────────────── */}
      {isScrollMode && (
        <div
          className="fixed top-0 left-0 right-0"
          style={{ height: 2, zIndex: 999 }}
        >
          {/* track */}
          <div className="absolute inset-0" style={{ background: "var(--border)" }} />
          {/* fill */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "var(--text-primary)",
              opacity: 0.45,
            }}
          />
          {/* dog riding the bar — feet on the 2px line */}
          <div
            style={{
              position: "absolute",
              left: `clamp(${Math.round(DISP * barScale * 0.5)}px, ${scrollProgress * 100}%, calc(100% - ${Math.round(DISP * barScale * 0.5)}px))`,
              top: 2, // just below the 2px bar
              transform: `translateX(-50%) translateY(-${barFeetPx}px)`,
              pointerEvents: "none",
            }}
          >
            <SaintBernard anim="walk" scale={barScale} />
          </div>
        </div>
      )}

      {/* ── Inline walking divider ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: containerH,
          overflow: "visible",
          opacity: isScrollMode ? 0 : 1,
          transition: "opacity 0.35s ease",
          pointerEvents: isScrollMode ? "none" : "auto",
        }}
      >
        {/* The divider line */}
        <div
          style={{
            position: "absolute",
            top: lineY,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--border)",
          }}
        />

        {/* Dog — left managed by RAF; top is fixed so feet land on the line */}
        <div
          ref={dogRef}
          style={{
            position: "absolute",
            top: dogTop,        // -58px: sprite top above container
            // left: NOT set here — owned entirely by the RAF loop
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <SaintBernard anim={anim} scale={1} />
        </div>
      </div>
    </>
  );
}
