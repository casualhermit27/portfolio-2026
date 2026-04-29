"use client";

import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import MacMockup from "@/components/MacMockup";
import type { App } from "@/app/page";

const ease = [0.22, 1, 0.36, 1] as const;

function BrewingAnimation() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* steam wisps */}
      <div className="relative h-7 w-10 flex justify-center">
        {[0, 0.45, 0.9].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              width: 2,
              height: 15,
              background: "#B8A0C4",
              left: `calc(50% + ${(i - 1) * 9}px)`,
              transformOrigin: "bottom center",
            }}
            animate={{ opacity: [0, 0.55, 0], y: [0, -13, -22], scaleX: [1, 1.6, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, delay, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
      </div>

      {/* cup */}
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" style={{ color: "#B8A0C4" }}>
        <path d="M4.5 6h15L17.8 15.5H6.2L4.5 6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M19.5 8.5c2.2 0 3.2 1.1 3.2 2.8s-1 2.7-3.2 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="3.5" y1="6" x2="20.5" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M2.5 16.5h19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>

      {/* label */}
      <p
        className="text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "#B8A0C4", fontWeight: 500, letterSpacing: "0.22em" }}
      >
        coming soon
      </p>
    </div>
  );
}

const phoneContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const phoneItem = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

// Ghost count per platform
const EMPTY_COUNTS: Record<string, number> = {
  ios: 3,
  mac: 2,
};

type AppShowcaseProps = {
  app: App;
  comingSoon?: boolean;
};

export default function AppShowcase({ app, comingSoon }: AppShowcaseProps) {
  const hasScreens = app.screens.length > 0;
  const platform = app.platform ?? "ios";
  const isMac = platform === "mac";
  const emptyCount = EMPTY_COUNTS[platform] ?? 3;
  const goToButtonPalette = app.id === "mochi"
    ? {
      bg: "#F7DFEA",
      border: "#E7C7D8",
      text: "#584955",
      hoverBg: "#F2D3E2",
      hoverBorder: "#DDB4CA",
    }
    : {
      bg: "#DDEBFB",
      border: "#C1D7F4",
      text: "#3F5574",
      hoverBg: "#D1E3F8",
      hoverBorder: "#AFCBF0",
    };
  const ctaVariants = {
    rest: {
      y: 0,
      scale: 1,
      backgroundColor: goToButtonPalette.bg,
      borderColor: goToButtonPalette.border,
    },
    hover: {
      y: -1.5,
      scale: 1.015,
      backgroundColor: goToButtonPalette.hoverBg,
      borderColor: goToButtonPalette.hoverBorder,
    },
    tap: {
      y: 0,
      scale: 0.985,
    },
  };
  const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 2.5 },
    tap: { x: 1 },
  };

  return (
    <div>

      {/* App header */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-5 min-w-0">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-hidden flex-shrink-0 border mt-1"
            style={{ borderColor: "var(--border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.logo}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-1 sm:pt-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1
                className="text-[32px] sm:text-[40px] md:text-[52px] font-light tracking-[-0.025em] leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                {app.name}
              </h1>
              {/* Platform badge */}
              <span
                className="text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase border rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 mt-1 self-end mb-1 sm:mb-2"
                style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
              >
                {isMac ? "macOS" : "iOS"}
              </span>
              {app.version && (
                <span
                  className="text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase border rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 mt-1 self-end mb-1 sm:mb-2"
                  style={{
                    color: goToButtonPalette.text,
                    borderColor: goToButtonPalette.border,
                    background: goToButtonPalette.bg,
                  }}
                >
                  {app.version}
                </span>
              )}
            </div>
            <p
              className="text-[12px] sm:text-[13px] mt-1.5 sm:mt-2.5 font-light tracking-wide"
              style={{ color: "var(--text-secondary)" }}
            >
              {app.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="border-t mb-6 sm:mb-8 md:mb-10"
        style={{ borderColor: "var(--border)" }}
      />

      {comingSoon ? (
        /* ── Coming-soon: silhouettes + brewing overlay ── */
        <div className="relative pt-2 select-none">
          {/* silhouette shapes — same dimensions as real mockups, solid fill, blurred */}
          <div
            className="flex gap-3 sm:gap-4 md:gap-5 flex-wrap pointer-events-none"
            style={{ filter: "blur(9px)", opacity: 0.32 }}
          >
            {Array.from({ length: emptyCount }).map((_, i) =>
              isMac ? (
                <div
                  key={i}
                  className="relative flex-shrink-0 rounded-[10px]"
                  style={{
                    width: "clamp(300px, 48vw, 680px)",
                    height: "clamp(190px, 30vw, 430px)",
                    background: "var(--border-active)",
                  }}
                />
              ) : (
                <div
                  key={i}
                  className={`relative flex-shrink-0
                    w-[150px] h-[325px] rounded-[24px]
                    sm:w-[170px] sm:h-[368px] sm:rounded-[28px]
                    md:w-[200px] md:h-[433px] md:rounded-[32px]`}
                  style={{ background: "var(--border-active)" }}
                />
              )
            )}
          </div>

          {/* brewing animation centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BrewingAnimation />
          </div>
        </div>
      ) : (
        <>
          {/* Screens label + action */}
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 md:mb-8">
            <p
              className="text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {hasScreens ? "Screens" : "Preview"}
            </p>
            {app.liveUrl && (
              <motion.a
                href={app.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 border rounded-[8px] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] font-medium leading-none"
                style={{ color: goToButtonPalette.text }}
                variants={ctaVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.5 }}
              >
                Go to
                <motion.span
                  aria-hidden
                  className="inline-block text-[11px]"
                  variants={arrowVariants}
                  transition={{ type: "spring", stiffness: 560, damping: 30, mass: 0.45 }}
                >
                  →
                </motion.span>
              </motion.a>
            )}
          </div>

          {/* Mockups — stagger on mount */}
          <div className="overflow-x-auto scrollbar-hide pb-3">
            <motion.div
              className="flex w-max snap-x snap-mandatory items-start gap-3 sm:gap-4 md:gap-5 pt-2"
              variants={phoneContainer}
              initial="hidden"
              animate="show"
            >
              {hasScreens
                ? app.screens.map((src, i) => (
                  <motion.div key={src} variants={phoneItem} className="snap-center flex-shrink-0">
                    {isMac
                      ? <MacMockup src={src} alt={`${app.name} screen ${i + 1}`} />
                      : <PhoneMockup src={src} alt={`${app.name} screen ${i + 1}`} />
                    }
                  </motion.div>
                ))
                : Array.from({ length: emptyCount }).map((_, i) => (
                  <motion.div key={i} variants={phoneItem} className="snap-center flex-shrink-0">
                    {isMac ? <MacMockup empty /> : <PhoneMockup empty />}
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
