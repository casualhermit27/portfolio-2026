"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SupportedConversions from "@/components/SupportedConversions";

type SubdomainLandingProps = {
  name: string;
  tagline?: string;
  description: string;
  platform: "iOS" | "macOS";
  logoSrc: string;
  screens?: string[];
  bullets: string[];
  ctaUrl?: string;
  ctaLabel?: string;
  ctaHint?: string;
  comingSoonLabel?: string;
  latestLabel?: string;
  latestDate?: string;
  latestDateIso?: string;
  changelogTitle?: string;
  changelogSubtitle?: string;
  changelog?: { title: string; body: string }[];
  builtByName?: string;
  builtByUrl?: string;
  screenAspect?: "landscape" | "portrait";
  noCard?: boolean;
};

function renderFeatureText(text: string, highlightBg: string, highlightText: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    const isHighlight = part.startsWith("**") && part.endsWith("**");
    if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <span
        key={`${part}-${index}`}
        className="rounded-[5px] px-1 py-0.5 font-medium"
        style={{ background: highlightBg, color: highlightText }}
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

function AppStoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 800 800"
      width="20"
      height="20"
      aria-hidden
    >
      <linearGradient
        id="appstore-grad-subdomain"
        x1="400.05"
        x2="400.05"
        y1="798.772"
        y2="-1.228"
        gradientTransform="matrix(1 0 0 -1 0 798.772)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" style={{ stopColor: "#18bffb" }} />
        <stop offset="1" style={{ stopColor: "#2072f3" }} />
      </linearGradient>
      <path
        fill="url(#appstore-grad-subdomain)"
        d="M638.4 0H161.6C72.3 0 0 72.3 0 161.6v476.9C0 727.7 72.3 800 161.6 800h476.9c89.2 0 161.6-72.3 161.6-161.6V161.6C800 72.3 727.7 0 638.4 0z"
      />
      <path
        fill="#FFF"
        d="m396.6 183.8 16.2-28c10-17.5 32.3-23.4 49.8-13.4s23.4 32.3 13.4 49.8L319.9 462.4h112.9c36.6 0 57.1 43 41.2 72.8H143c-20.2 0-36.4-16.2-36.4-36.4s16.2-36.4 36.4-36.4h92.8l118.8-205.9-37.1-64.4c-10-17.5-4.1-39.6 13.4-49.8 17.5-10 39.6-4.1 49.8 13.4l15.9 28.1zM256.2 572.7l-35 60.7c-10 17.5-32.3 23.4-49.8 13.4S148 614.5 158 597l26-45c29.4-9.1 53.3-2.1 72.2 20.7zm301.4-110.1h94.7c20.2 0 36.4 16.2 36.4 36.4s-16.2 36.4-36.4 36.4h-52.6l35.5 61.6c10 17.5 4.1 39.6-13.4 49.8-17.5 10-39.6 4.1-49.8-13.4-59.8-103.7-104.7-181.3-134.5-233-30.5-52.6-8.7-105.4 12.8-123.3 23.9 41 59.6 102.9 107.3 185.5z"
      />
    </svg>
  );
}

function DotIcon() {
  return <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />;
}

export default function SubdomainLanding({
  name,
  tagline,
  description,
  platform,
  logoSrc,
  screens = [],
  bullets,
  ctaUrl,
  ctaLabel = "Download",
  ctaHint,
  comingSoonLabel = "Coming soon",
  latestLabel = "Latest update",
  latestDate,
  latestDateIso,
  changelogTitle = "Changelog",
  changelogSubtitle = "New in this release",
  changelog = [],
  builtByName = "Harsha Chaganti",
  builtByUrl = "https://harshachaganti.com",
  screenAspect = "landscape",
  noCard = false,
}: SubdomainLandingProps) {
  const [dark, setDark] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || screens.length <= 1) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setActiveScreen(Math.round(progress * (screens.length - 1)));
  };

  const accent = platform === "iOS"
    ? {
      buttonBg: "#F9DFEA",
      buttonBorder: "#EAC7D9",
      buttonBorderHover: "#D4A0BC",
      buttonText: "#5D4757",
      buttonHover: "#F4D3E3",
      buttonShadow: "0 8px 28px rgba(227, 169, 197, 0.45)",
      dot: "#E3A9C5",
      highlightBg: "#F5D8E6",
      highlightText: "#5D4757",
    }
    : {
      buttonBg: "#DDEBFB",
      buttonBorder: "#C1D7F4",
      buttonBorderHover: "#90BAE8",
      buttonText: "#3F5574",
      buttonHover: "#D1E3F8",
      buttonShadow: "0 8px 28px rgba(143, 177, 224, 0.45)",
      dot: "#8FB1E0",
      highlightBg: "#D5E6FB",
      highlightText: "#3F5574",
    };

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

  const isExternalCta = !!ctaUrl && /^https?:\/\//i.test(ctaUrl);

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <section className={`mx-auto w-full max-w-2xl px-4 sm:px-6 ${noCard ? "pt-16 pb-10" : "py-8"}`}>
        <div className={noCard ? "" : "rounded-[28px] border px-8 py-10"} style={noCard ? {} : { borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <div className="w-8 flex-shrink-0" />
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 overflow-hidden rounded-[13px] border"
              style={{ borderColor: "var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={`${name} logo`} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[32px] font-light leading-none tracking-[-0.02em] lowercase sm:text-[38px]">
                {name}
              </h1>
              <span
                className="text-[9px] font-medium uppercase tracking-[0.1em] border rounded-full px-2.5 py-1"
                style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
              >
                {platform}
              </span>
            </div>
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
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

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          {tagline && (
            <p className="text-[18px] font-medium leading-tight sm:text-[20px]" style={{ color: "var(--text-primary)" }}>
              {tagline}
            </p>
          )}
          <p className="text-[14px] leading-relaxed sm:text-[15px]" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
          {latestDate && changelog.length === 0 && (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]"
              style={{ borderColor: "var(--border-active)", color: "var(--text-secondary)", background: "var(--bg)" }}
            >
              <DotIcon />
              <span>{latestLabel}</span>
              <span className="text-[12px] normal-case tracking-normal" style={{ color: "var(--text-primary)" }}>
                <time dateTime={latestDateIso ?? latestDate}>{latestDate}</time>
              </span>
            </div>
          )}
          {latestDate && changelog.length > 0 && (
            <div className="mx-auto w-full max-w-3xl">
              <button
                type="button"
                onClick={() => setChangelogOpen((open) => !open)}
                className="mx-auto flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
                style={{
                  borderColor: "var(--border-active)",
                  color: "var(--text-secondary)",
                  background: "var(--bg)",
                }}
                aria-expanded={changelogOpen}
                aria-controls="changelog-panel"
              >
                <DotIcon />
                <span>{latestLabel}</span>
                <span className="text-[12px] normal-case tracking-normal" style={{ color: "var(--text-secondary)" }}>
                  <time dateTime={latestDateIso ?? latestDate}>{latestDate}</time>
                </span>
                <span
                  className={`ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border ${
                    changelogOpen ? "rotate-180" : ""
                  }`}
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                  aria-hidden
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {changelogOpen && (
                  <motion.div
                    id="changelog-panel"
                    className="mt-4 w-full rounded-[18px] border p-4 text-left sm:p-5"
                    style={{ borderColor: "var(--border-active)", background: "var(--bg-sticky)" }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <p className="text-[12px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                      {changelogTitle}
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                      {changelogSubtitle}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {changelog.map((item) => (
                        <li key={item.title} className="flex gap-3">
                          <span
                            className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border text-[10px]"
                            style={{ borderColor: "var(--border)", background: "var(--pill-bg)", color: accent.dot }}
                          >
                            <DotIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                              {item.title}
                            </p>
                            <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                              {item.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <hr className="border-t mt-10 sm:mt-12" style={{ borderColor: "var(--border)" }} />

        <div className="mt-8 flex flex-col items-center">
          {ctaUrl ? (
            <motion.a
              href={ctaUrl}
              target={isExternalCta ? "_blank" : undefined}
              rel={isExternalCta ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-[16px] border px-6 py-3.5 text-[17px] font-semibold tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
              style={{
                borderColor: accent.buttonBorder,
                background: accent.buttonBg,
                color: accent.buttonText,
              }}
              whileHover={{ y: -3, scale: 1.03, backgroundColor: accent.buttonHover, borderColor: accent.buttonBorderHover, boxShadow: accent.buttonShadow }}
              whileTap={{ scale: 0.97, y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              {platform === "iOS" && <AppStoreIcon />}
              {ctaLabel}
            </motion.a>
          ) : (
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
              {comingSoonLabel}
            </motion.button>
          )}

          {ctaHint && (
            <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
              {ctaHint}
            </p>
          )}
        </div>

        <hr className="border-t mt-8" style={{ borderColor: "var(--border)" }} />

        <div className="mt-10">
          {platform === "iOS" ? (
            <>
            <div ref={scrollContainerRef} onScroll={handleScroll} className="overflow-x-auto scrollbar-hide pb-2 mx-auto max-w-[490px] sm:max-w-[560px] md:max-w-[630px]">
              <div className="flex w-max snap-x snap-mandatory items-start gap-4 px-4 sm:gap-5 md:gap-6">
                {screens.length > 0
                  ? screens.map((src, i) => (
                    <div
                      key={src}
                      className="snap-center flex-shrink-0 overflow-hidden rounded-[26px] border w-[148px] h-[320px] sm:w-[170px] sm:h-[368px] md:w-[192px] md:h-[415px] lg:w-[207px] lg:h-[449px]"
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
                      className="flex h-[320px] w-[148px] flex-shrink-0 items-end justify-center rounded-[26px] border pb-6 sm:h-[368px] sm:w-[170px] md:h-[415px] md:w-[192px] lg:h-[449px] lg:w-[207px]"
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
            {screens.length > 1 && (
              <div className="mt-3 flex justify-center gap-1.5">
                {screens.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-200"
                    style={{
                      width: i === activeScreen ? "16px" : "6px",
                      background: i === activeScreen ? accent.dot : "var(--border-active)",
                    }}
                  />
                ))}
              </div>
            )}
            </>
          ) : (
            <div className="overflow-x-auto scrollbar-hide pb-2" style={{ maskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)" }}>
              <div className="flex w-max snap-x snap-mandatory items-start gap-2 px-1 mx-auto sm:gap-3">
                {(screens.length > 0 ? screens : [logoSrc]).map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className={
                      screenAspect === "portrait"
                        ? "snap-center flex-shrink-0 overflow-hidden rounded-[12px] border w-[300px] h-[375px] sm:w-[360px] sm:h-[450px] md:w-[420px] md:h-[525px]"
                        : "snap-center flex-shrink-0 overflow-hidden rounded-[12px] border w-[470px] h-[293px] sm:w-[580px] sm:h-[361px] md:w-[700px] md:h-[436px]"
                    }
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
                      className="w-full object-cover"
                      style={{ height: "calc(100% - 24px)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="border-t mt-10 sm:mt-12" style={{ borderColor: "var(--border)" }} />

        <div className="mt-10 space-y-5 text-center sm:mt-12">
          <ul className="mx-auto w-full max-w-md space-y-2.5">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-left text-[14px] leading-relaxed sm:text-[15px]"
                style={{ color: "var(--text-primary)" }}
              >
                <span className="mt-[7px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent.dot }} />
                <span>{renderFeatureText(item, accent.highlightBg, accent.highlightText)}</span>
              </li>
            ))}
            {name === "can" && (
              <li className="flex items-center gap-2.5 text-left">
                <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent.dot }} />
                <SupportedConversions accent={accent} />
              </li>
            )}
          </ul>
        </div>

        <hr className="border-t mt-10" style={{ borderColor: "var(--border)" }} />

        <div className="mt-8 flex flex-col items-center gap-2">
          <a
            href={builtByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[12px] border px-3.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
            style={{ borderColor: "var(--border)", background: "var(--bg-sticky)", color: "var(--text-primary)" }}
          >
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium"
              style={{ background: "var(--pill-bg)", color: "var(--text-secondary)" }}
            >
              HC
            </span>
            <span className="text-[14px] font-medium">{builtByName}</span>
          </a>
        </div>
        </div>
      </section>
    </main>
  );
}
