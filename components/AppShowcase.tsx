"use client";

import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import MacMockup from "@/components/MacMockup";
import type { App } from "@/app/page";
import SupportedConversions from "@/components/SupportedConversions";

const ease = [0.22, 1, 0.36, 1] as const;

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
};

export default function AppShowcase({ app }: AppShowcaseProps) {
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
              {app.id === "can" && <SupportedConversions />}
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
            style={{
              color: goToButtonPalette.text,
            }}
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
      <motion.div
        className="flex gap-3 sm:gap-4 md:gap-5 flex-wrap pt-2"
        variants={phoneContainer}
        initial="hidden"
        animate="show"
      >
        {hasScreens
          ? app.screens.map((src, i) => (
            <motion.div key={src} variants={phoneItem}>
              {isMac
                ? <MacMockup src={src} alt={`${app.name} screen ${i + 1}`} />
                : <PhoneMockup src={src} alt={`${app.name} screen ${i + 1}`} />
              }
            </motion.div>
          ))
          : Array.from({ length: emptyCount }).map((_, i) => (
            <motion.div key={i} variants={phoneItem}>
              {isMac ? <MacMockup empty /> : <PhoneMockup empty />}
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
