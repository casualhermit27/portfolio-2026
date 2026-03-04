"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SubdomainLandingProps = {
  name: string;
  description: string;
  platform: "iOS" | "macOS";
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
        <div className="relative mb-8 sm:mb-10">
          <div className="mx-auto flex w-fit items-center gap-3">
            <div
              className="h-11 w-11 overflow-hidden rounded-[12px] border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={`${name} logo`} className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-[30px] font-light leading-none tracking-[-0.02em] lowercase sm:text-[36px]">
                {name}
              </h1>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <span
              className="text-[9px] font-medium uppercase tracking-[0.1em] border rounded-full px-2.5 py-1"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
            >
              {platform}
            </span>
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
        </div>

        {platform === "iOS" ? (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex w-max items-start gap-3 px-1 mx-auto sm:gap-4 md:gap-5">
              {screens.length > 0
                ? screens.map((src, i) => (
                  <div
                    key={src}
                    className="flex-shrink-0 overflow-hidden rounded-[24px] border w-[136px] h-[294px] sm:w-[156px] sm:h-[338px] md:w-[178px] md:h-[386px] lg:w-[190px] lg:h-[412px]"
                    style={{ borderColor: "var(--border-active)", background: "var(--bg-sticky)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${name} screen ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))
                : (
                  <div
                    className="flex h-[294px] w-[136px] flex-shrink-0 items-end justify-center rounded-[24px] border pb-6 sm:h-[338px] sm:w-[156px] md:h-[386px] md:w-[178px] lg:h-[412px] lg:w-[190px]"
                    style={{ borderColor: "var(--border-active)", background: "var(--bg-sticky)" }}
                  >
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      soon
                    </span>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex w-max items-start gap-2.5 px-1 mx-auto sm:gap-3">
              {(screens.length > 0 ? screens : [logoSrc]).map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="flex-shrink-0 overflow-hidden rounded-[10px] border w-[320px] h-[200px] sm:w-[390px] sm:h-[244px] md:w-[460px] md:h-[288px]"
                  style={{ borderColor: "var(--border-active)", background: "var(--bg-sticky)" }}
                >
                  <div
                    className="flex items-center px-2.5 border-b"
                    style={{
                      height: "24px",
                      borderColor: "var(--border)",
                      background: "var(--pill-bg)",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: "#FF5F57" }} />
                      <span className="h-2 w-2 rounded-full" style={{ background: "#FEBC2E" }} />
                      <span className="h-2 w-2 rounded-full" style={{ background: "#28C840" }} />
                    </div>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${name} screen ${i + 1}`}
                    className="h-[calc(100%-24px)] w-full object-cover"
                    style={{ height: "calc(100% - 24px)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4 text-center sm:mt-10">
          <p
            className="mx-auto max-w-2xl text-[14px] leading-relaxed sm:text-[15px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          <ul className="mx-auto max-w-2xl space-y-2.5">
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
            <div className="pt-2 flex flex-col items-center">
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
        </div>
      </section>
    </main>
  );
}
