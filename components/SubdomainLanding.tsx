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

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.36 12.64c.01 2.11 1.85 2.81 1.87 2.82-.02.05-.29 1-.95 1.99-.58.86-1.19 1.72-2.14 1.74-.93.02-1.23-.55-2.3-.55-1.07 0-1.41.53-2.28.57-.92.03-1.62-.93-2.2-1.79-1.19-1.72-2.1-4.86-.88-7 .6-1.06 1.67-1.73 2.83-1.75.88-.02 1.71.59 2.3.59.59 0 1.69-.72 2.85-.61.48.02 1.82.19 2.69 1.46-.07.04-1.6.94-1.59 2.53zM14.59 5.53c.49-.59.83-1.41.74-2.23-.71.03-1.57.47-2.08 1.06-.46.53-.86 1.38-.75 2.19.79.06 1.6-.4 2.09-1.02z" />
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
            <div className="mb-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                Screens
              </p>
            </div>
            <div className="flex w-max snap-x snap-mandatory items-start gap-3 px-1 mx-auto sm:gap-4 md:gap-5">
              {screens.length > 0
                ? screens.map((src, i) => (
                  <div
                    key={src}
                    className="snap-center flex-shrink-0 overflow-hidden rounded-[24px] border w-[150px] h-[325px] sm:w-[170px] sm:h-[368px] md:w-[200px] md:h-[433px] lg:w-[210px] lg:h-[455px]"
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
                    className="flex h-[325px] w-[150px] flex-shrink-0 items-end justify-center rounded-[24px] border pb-6 sm:h-[368px] sm:w-[170px] md:h-[433px] md:w-[200px] lg:h-[455px] lg:w-[210px]"
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
            <div className="mb-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                Preview
              </p>
            </div>
            <div className="flex w-max snap-x snap-mandatory items-start gap-2 px-1 mx-auto sm:gap-2.5">
              {(screens.length > 0 ? screens : [logoSrc]).map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="snap-center flex-shrink-0 overflow-hidden rounded-[10px] border w-[360px] h-[225px] sm:w-[460px] sm:h-[286px] md:w-[560px] md:h-[348px]"
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

        <div className="mt-9 space-y-4 text-center sm:mt-11">
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
                className="inline-flex items-center gap-2 rounded-[11px] border px-4 py-2.5 text-[15px] font-medium tracking-[-0.01em]"
                style={{
                  borderColor: "var(--border-active)",
                  background: "var(--bg)",
                  color: "var(--text-primary)",
                }}
                whileHover={{ y: -1, backgroundColor: "var(--pill-bg)" }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                {platform === "iOS" && <AppleIcon />}
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
