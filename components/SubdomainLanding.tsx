"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import MacMockup from "@/components/MacMockup";

type SubdomainLandingProps = {
  name: string;
  description: string;
  platform: "iOS" | "macOS";
  status: string;
  logoSrc: string;
  screens?: string[];
  bullets: string[];
  ctaUrl?: string;
  ctaLabel?: string;
  ctaHint?: string;
};

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function SubdomainLanding({
  name,
  description,
  platform,
  status,
  logoSrc,
  screens = [],
  bullets,
  ctaUrl,
  ctaLabel = "View on App Store",
  ctaHint,
}: SubdomainLandingProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-12">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 overflow-hidden rounded-[12px] border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={`${name} logo`} className="h-full w-full object-cover" />
            </div>
            <div>
              <p
                className="text-[10px] font-medium uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                {platform}
              </p>
              <h1 className="text-[30px] font-semibold leading-none tracking-[-0.02em] lowercase sm:text-[36px]">
                {name}
              </h1>
            </div>
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-opacity duration-150 hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              background: "var(--pill-bg)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle theme"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div
          className="rounded-[20px] border p-5 sm:p-7"
          style={{ borderColor: "var(--border)", background: "var(--bg-sticky)" }}
        >
          {platform === "iOS" ? (
            <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-5 md:gap-6">
              {screens.length > 0
                ? screens.map((src, i) => (
                  <PhoneMockup key={src} src={src} alt={`${name} screen ${i + 1}`} />
                ))
                : <PhoneMockup empty />}
            </div>
          ) : (
            <div className="flex justify-center">
              {screens[0]
                ? <MacMockup src={screens[0]} alt={`${name} preview`} />
                : <MacMockup empty />}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4 sm:mt-10">
          <p
            className="max-w-2xl text-[14px] leading-relaxed sm:text-[15px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          <ul className="max-w-3xl space-y-2.5">
            {bullets.map((item) => (
              <li
                key={item}
                className="text-[14px] leading-relaxed sm:text-[15px]"
                style={{ color: "var(--text-primary)" }}
              >
                <span style={{ color: "var(--text-muted)" }}>- </span>
                {item}
              </li>
            ))}
          </ul>

          {ctaUrl ? (
            <div className="pt-2">
              <motion.a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[11px] border px-4 py-2.5 text-[15px] font-medium tracking-[-0.01em]"
                style={{
                  borderColor: "var(--border-active)",
                  background: "var(--bg)",
                  color: "var(--text-primary)",
                }}
                whileHover={{ y: -1, backgroundColor: "var(--pill-bg)" }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                {ctaLabel}
              </motion.a>
              {ctaHint && (
                <p className="mt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {ctaHint}
                </p>
              )}
            </div>
          ) : (
            <p className="pt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
              Link coming soon
            </p>
          )}

          <p className="pt-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-faint)" }}>
            {status}
          </p>
        </div>
      </section>
    </main>
  );
}
