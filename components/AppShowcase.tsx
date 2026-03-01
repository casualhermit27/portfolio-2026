"use client";

import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import MacMockup from "@/components/MacMockup";
import type { App } from "@/app/page";

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

  return (
    <div>

      {/* App header */}
      <div className="mb-12">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-[16px] overflow-hidden flex-shrink-0 border border-[#E2DDD5] mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.logo}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-[52px] font-light tracking-[-0.025em] text-[#1C1C1C] leading-none">
                {app.name}
              </h1>
              {/* Platform badge */}
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#B8B1A9] border border-[#E2DDD5] rounded-full px-2.5 py-1 mt-1 self-end mb-2">
                {isMac ? "macOS" : "iOS"}
              </span>
            </div>
            <p className="text-[13px] text-[#A09A93] mt-2.5 font-light tracking-wide">
              {app.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E2DDD5] mb-10" />

      {/* Screens label */}
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8B1A9] mb-8">
        {hasScreens ? "Screens" : "Preview"}
      </p>

      {/* Mockups — stagger on mount */}
      <motion.div
        className="flex gap-5 flex-wrap pt-2"
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
