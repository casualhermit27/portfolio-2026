"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SupportedConversions from "@/components/SupportedConversions";

const lightAccent = {
  buttonBg: "#DDEBFB",
  buttonBorder: "#C1D7F4",
  buttonText: "#3F5574",
  dot: "#8FB1E0",
  highlightBg: "#E4EEF8",
  highlightText: "#4A6280",
};

const darkAccent = {
  buttonBg: "#1C2B3A",
  buttonBorder: "#284055",
  buttonText: "#88B8D2",
  dot: "#7AAED0",
  highlightBg: "rgba(110, 170, 210, 0.16)",
  highlightText: "#9BBFDA",
};

function renderFeatureText(text: string, accent: typeof lightAccent) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    const isHighlight = part.startsWith("**") && part.endsWith("**");
    if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <span
        key={`${part}-${index}`}
        className="rounded-[5px] px-1 py-0.5 font-medium"
        style={{ background: accent.highlightBg, color: accent.highlightText }}
      >
        {part.slice(2, -2)}
      </span>
    );
  });
}

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

const bullets = [
  "Drop files and convert in **one clean flow**",
  "**PDF Tools** — merge, split, encrypt, decrypt, and optimize. Export pages as **JPEG or PNG**. No Acrobat needed.",
  "Drop on the **dock icon** — converts instantly in the background with a **notification when done**",
  "**Batch-ready** — drop 20 files, override formats per file, convert everything at once",
  "**Local-first processing** for speed and privacy",
  "Native macOS interactions with **keyboard-friendly controls**",
  "Ready for power users who want **speed with simplicity**",
];

export default function CanLanding() {
  const [dark, setDark] = useState(false);
  const accent = dark ? darkAccent : lightAccent;

  useEffect(() => {
    const stored = window.localStorage.getItem("subdomain-theme");
    if (stored === "dark" || stored === "light") {
      setDark(stored === "dark");
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("subdomain-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text-primary)",
      }}
    >
      <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-16 sm:px-10">

        {/* Top bar: logo + toggle */}
        <div className="flex items-center justify-between">
          <div
            className="h-14 w-14 overflow-hidden rounded-[16px]"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/can 2.jpg" alt="can logo" className="h-full w-full object-cover" />
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none"
            style={{
              borderColor: "var(--border)",
              background: "var(--pill-bg)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Hero name */}
        <div className="mt-10">
          <div className="flex items-baseline gap-4">
            <h1
              className="text-[72px] font-extralight leading-none tracking-[-0.04em] lowercase sm:text-[96px]"
              style={{ color: "var(--text-primary)" }}
            >
              can
            </h1>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.12em] border rounded-full px-2.5 py-1 mb-1"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
            >
              macOS
            </span>
          </div>

          <p
            className="mt-5 text-[22px] font-light leading-snug tracking-[-0.01em] sm:text-[26px]"
            style={{ color: "var(--text-primary)" }}
          >
            Instant file conversions<br />without heavy tools.
          </p>

          <p
            className="mt-3 text-[15px] leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            A minimal desktop utility to convert files and formats instantly.
          </p>
        </div>

        {/* Latest update pill */}
        <div className="mt-6">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]"
            style={{ boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.07)" : "inset 0 0 0 1px rgba(0,0,0,0.07)", color: "var(--text-secondary)", background: "transparent" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.dot }} />
            <span>Latest update</span>
            <span className="text-[12px] normal-case tracking-normal" style={{ color: "var(--text-primary)" }}>
              <time dateTime="2026-03-14">March 14, 2026</time>
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-7 flex flex-col items-start gap-2">
          <motion.button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-[16px] border px-6 py-3.5 text-[17px] font-semibold tracking-[-0.01em] opacity-80"
            style={{
              borderColor: accent.buttonBorder,
              background: accent.buttonBg,
              color: accent.buttonText,
            }}
          >
            Brewing now
          </motion.button>
          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            A small macOS tool, nearly ready to pour.
          </p>
        </div>

        {/* Screenshot */}
        <div className="mt-14">
          <div
            className="overflow-hidden rounded-[16px] border w-full"
            style={{ borderColor: "var(--border-active)", background: "var(--bg-sticky)" }}
          >
            <div
              className="flex items-center px-3 border-b"
              style={{ height: "28px", borderColor: "var(--border)", background: "var(--pill-bg)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dragdrop.png"
              alt="can screen"
              className="w-full object-cover"
              style={{ maxHeight: "520px" }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-14">
          <ul className="space-y-3">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-relaxed sm:text-[16px]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="mt-[9px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent.dot }} />
                <span>{renderFeatureText(item, accent)}</span>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent.dot }} />
              <SupportedConversions accent={accent} />
            </li>
          </ul>
        </div>

        {/* Built by */}
        <div className="mt-12">
          <a
            href="https://harshachaganti.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[12px] border px-3.5 py-2 focus-visible:outline-none"
            style={{ borderColor: "var(--border)", background: "var(--bg-sticky)", color: "var(--text-primary)" }}
          >
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium"
              style={{ background: "var(--pill-bg)", color: "var(--text-secondary)" }}
            >
              HC
            </span>
            <span className="text-[14px] font-medium">Harsha Chaganti</span>
          </a>
        </div>

      </section>
    </main>
  );
}
