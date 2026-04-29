"use client";

import { useEffect, useRef, useState } from "react";

// Sprite: 800×100px, 8 frames of 100×100 each
const FRAME_COUNT = 8;
const SRC_W = 100; // source frame width
const SRC_H = 100; // source frame height

// Main divider dog — 2× upscale for crisp pixel art
const FULL_W = SRC_W * 2; // 200px per frame display width
const FULL_H = SRC_H * 2; // 200px display height

// Progress bar dog — 0.7× of original
const BAR_W = Math.round(SRC_W * 0.7); // 70px
const BAR_H = Math.round(SRC_H * 0.7); // 70px

// How long it takes the dog to cross the full screen width
const WALK_DURATION = 11000; // ms

// Where the dog's feet hit inside the sprite frame (as a fraction of frame height)
// The Saint Bernard feet land around 88% down the 100px frame
const FEET_FRACTION = 0.88;

export default function DogDivider() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dogRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrollMode = scrollY > 10;

  // Walking animation — direct DOM to avoid 60fps React re-renders
  useEffect(() => {
    if (isScrollMode) {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
      startRef.current = null;
      return;
    }

    if (dogRef.current) dogRef.current.style.left = "-4%";

    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = (t - startRef.current) % WALK_DURATION;
      const progress = elapsed / WALK_DURATION;
      // Walk from off-screen left (−4%) to off-screen right (104%)
      if (dogRef.current) {
        dogRef.current.style.left = `${-4 + progress * 108}%`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
    };
  }, [isScrollMode]);

  return (
    <>
      {/* ── CSS keyframes for sprite cycling ── */}
      <style>{`
        @keyframes sb-walk-full {
          from { background-position: 0px 0px; }
          to   { background-position: -${FULL_W * FRAME_COUNT}px 0px; }
        }
        @keyframes sb-walk-bar {
          from { background-position: 0px 0px; }
          to   { background-position: -${BAR_W * FRAME_COUNT}px 0px; }
        }
      `}</style>

      {/* ── Fixed scroll progress bar (visible when scrolled) ── */}
      {isScrollMode && (
        <div
          className="fixed top-0 left-0 right-0"
          style={{ height: 2, zIndex: 999 }}
        >
          {/* track */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--border)" }}
          />
          {/* filled */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "var(--text-primary)",
              opacity: 0.45,
            }}
          />
          {/* dog riding the bar */}
          <div
            style={{
              position: "absolute",
              // clamp so dog never clips at screen edges
              left: `clamp(${BAR_W / 2}px, ${scrollProgress * 100}%, calc(100% - ${BAR_W / 2}px))`,
              top: 2,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: BAR_W,
                height: BAR_H,
                backgroundImage: "url('/saint-bernard-walk.png')",
                backgroundSize: `${BAR_W * FRAME_COUNT}px ${BAR_H}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                animation: `sb-walk-bar 0.65s steps(${FRAME_COUNT}) infinite`,
              }}
            />
          </div>
        </div>
      )}

      {/* ── Inline walking divider (visible when at top) ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 80,
          overflow: "visible",
          opacity: isScrollMode ? 0 : 1,
          transition: "opacity 0.35s ease",
          pointerEvents: isScrollMode ? "none" : "auto",
        }}
      >
        {/* The divider line — dog walks on top of it */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--border)",
          }}
        />

        {/* Dog — feet pinned to the line via transform */}
        <div
          ref={dogRef}
          style={{
            position: "absolute",
            // bottom: 14 = same as the line
            bottom: 14,
            left: "-4%",
            // shift left by 50% of sprite width to center it on the position,
            // shift down by (1 - FEET_FRACTION) of sprite height so feet sit on the line
            transform: `translateX(-50%) translateY(${(1 - FEET_FRACTION) * 100}%)`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: FULL_W,
              height: FULL_H,
              backgroundImage: "url('/saint-bernard-walk.png')",
              backgroundSize: `${FULL_W * FRAME_COUNT}px ${FULL_H}px`,
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              animation: `sb-walk-full 0.65s steps(${FRAME_COUNT}) infinite`,
            }}
          />
        </div>
      </div>
    </>
  );
}
