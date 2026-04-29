"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Treat positions as fractions of the line width (0–1)
const TREAT_POSITIONS = [0.13, 0.27, 0.44, 0.59, 0.74, 0.87];
const WALK_DURATION = 9000; // ms for one full left→right crossing

export default function DogDivider() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for direct DOM manipulation (avoids 60fps React re-renders)
  const dogRef = useRef<HTMLDivElement>(null);
  const treatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  // Track scroll position + progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrollMode = scrollY > 10;

  // Walking animation: runs only when not scrolled
  useEffect(() => {
    if (isScrollMode) {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
      startRef.current = null;
      lastProgressRef.current = 0;
      return;
    }

    // Reset all treats to visible when returning to idle
    for (const el of treatRefs.current) {
      if (!el) continue;
      el.dataset.eaten = "0";
      el.style.opacity = "1";
      el.style.transform = "translate(-50%, -50%) scale(1)";
    }

    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = (t - startRef.current) % WALK_DURATION;
      const progress = elapsed / WALK_DURATION;

      // Move dog directly via DOM
      if (dogRef.current) {
        dogRef.current.style.left = `${progress * 100}%`;
      }

      // Detect loop reset (progress jumped back to ~0)
      const looped = progress < lastProgressRef.current - 0.5;
      if (looped) {
        for (const el of treatRefs.current) {
          if (!el) continue;
          el.dataset.eaten = "0";
          el.style.opacity = "1";
          el.style.transform = "translate(-50%, -50%) scale(1)";
        }
      }

      // Eat treats as dog passes them
      for (let i = 0; i < TREAT_POSITIONS.length; i++) {
        const el = treatRefs.current[i];
        if (!el || el.dataset.eaten === "1") continue;
        if (TREAT_POSITIONS[i] < progress - 0.005) {
          el.dataset.eaten = "1";
          el.style.opacity = "0";
          el.style.transform = "translate(-50%, -50%) scale(0)";
        }
      }

      lastProgressRef.current = progress;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
    };
  }, [isScrollMode]);

  return (
    <>
      {/* ── Fixed scroll progress bar (visible when scrolled) ── */}
      {isScrollMode && (
        <div
          className="fixed top-0 left-0 right-0"
          style={{ height: 2, zIndex: 999 }}
        >
          {/* Track */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--border)" }}
          />
          {/* Filled portion */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "var(--text-primary)",
              opacity: 0.45,
            }}
          />
          {/* Dog as scroll indicator */}
          <div
            style={{
              position: "absolute",
              left: `${scrollProgress * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 14,
              lineHeight: 1,
              pointerEvents: "none",
              // Flip to face right
              display: "inline-block",
            }}
          >
            <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>🐕</span>
          </div>
        </div>
      )}

      {/* ── Inline walking divider (visible when at top) ── */}
      <div
        className="relative w-full"
        style={{
          height: 56,
          opacity: isScrollMode ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: isScrollMode ? "none" : "auto",
        }}
      >
        {/* The line */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
          style={{ height: 1, background: "var(--border)" }}
        />

        {/* Treats (small bones) */}
        {TREAT_POSITIONS.map((pos, i) => (
          <div
            key={pos}
            ref={(el) => { treatRefs.current[i] = el; }}
            style={{
              position: "absolute",
              left: `${pos * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              transition: "opacity 0.12s ease, transform 0.12s ease",
              fontSize: 10,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            🦴
          </div>
        ))}

        {/* Dog — positioned via direct DOM, bobbing via Framer Motion */}
        <div
          ref={dogRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "0%",
            transform: "translate(-50%, -62%)",
            pointerEvents: "none",
          }}
        >
          {/* Flip wrapper so dog faces right */}
          <div style={{ transform: "scaleX(-1)" }}>
            <motion.span
              style={{ fontSize: 20, lineHeight: 1, display: "inline-block" }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.38, repeat: Infinity, ease: "easeInOut" }}
            >
              🐕
            </motion.span>
          </div>
        </div>
      </div>
    </>
  );
}
