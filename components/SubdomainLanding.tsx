"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SupportedConversions from "@/components/SupportedConversions";

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
  builtByName?: string;
  builtByUrl?: string;
};

function renderFeatureText(text: string, highlightBg: string, highlightText: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    const isHighlight = part.startsWith("**") && part.endsWith("**");
    if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <span
        key={`${part}-${index}`}
        className="rounded-[6px] px-1.5 py-0.5"
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

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DotIcon() {
  return <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />;
}

export default function SubdomainLanding({
  name,
  description,
  platform,
  logoSrc,
  screens = [],
  bullets,
  ctaUrl,
  ctaLabel = "Download",
  ctaHint,
  builtByName = "Harsha Chaganti",
  builtByUrl = "https://harshachaganti.com",
}: SubdomainLandingProps) {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const accent = platform === "iOS"
    ? {
      buttonBg: "#F9DFEA",
      buttonBorder: "#EAC7D9",
      buttonText: "#5D4757",
      buttonHover: "#F4D3E3",
      dot: "#E3A9C5",
      highlightBg: "#F5D8E6",
      highlightText: "#5D4757",
    }
    : {
      buttonBg: "#DDEBFB",
      buttonBorder: "#C1D7F4",
      buttonText: "#3F5574",
      buttonHover: "#D1E3F8",
      dot: "#8FB1E0",
      highlightBg: "#D5E6FB",
      highlightText: "#3F5574",
    };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const onNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <section className="mx-auto w-full max-w-[1600px] px-8 py-10 sm:px-14 md:px-24 lg:px-32 xl:px-40">
        <div className="relative mb-10 sm:mb-12">
          <div className="mx-auto flex w-fit items-center gap-3">
            <div
              className="h-12 w-12 overflow-hidden rounded-[13px] border"
              style={{ borderColor: "var(--border)" }}
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
            className="absolute right-0 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border transition-opacity duration-150 hover:opacity-80"
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

        <div>
          {platform === "iOS" ? (
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <div className="mb-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                  Screens
                </p>
              </div>
              <div className="flex w-max snap-x snap-mandatory items-start gap-4 px-1 mx-auto sm:gap-5 md:gap-6">
                {screens.length > 0
                  ? screens.map((src, i) => (
                    <div
                      key={src}
                      className="snap-center flex-shrink-0 overflow-hidden rounded-[26px] border w-[176px] h-[381px] sm:w-[202px] sm:h-[437px] md:w-[228px] md:h-[494px] lg:w-[246px] lg:h-[533px]"
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
                      className="flex h-[381px] w-[176px] flex-shrink-0 items-end justify-center rounded-[26px] border pb-6 sm:h-[437px] sm:w-[202px] md:h-[494px] md:w-[228px] lg:h-[533px] lg:w-[246px]"
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
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <div className="mb-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                  Preview
                </p>
              </div>
              <div className="flex w-max snap-x snap-mandatory items-start gap-2 px-1 mx-auto sm:gap-3">
                {(screens.length > 0 ? screens : [logoSrc]).map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="snap-center flex-shrink-0 overflow-hidden rounded-[12px] border w-[470px] h-[293px] sm:w-[580px] sm:h-[361px] md:w-[700px] md:h-[436px]"
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

        <div className="mt-10 space-y-5 text-center sm:mt-12">
          <p
            className="mx-auto max-w-2xl text-[14px] leading-relaxed sm:text-[15px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
            Features
          </p>

          <ul className="mx-auto w-full max-w-3xl space-y-2.5 md:w-fit">
            {bullets.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-3 text-left text-[14px] leading-relaxed sm:text-[15px]"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border"
                  style={{ borderColor: "var(--border)", background: "var(--pill-bg)", color: accent.dot }}
                >
                  <DotIcon />
                </span>
                <span>{renderFeatureText(item, accent.highlightBg, accent.highlightText)}</span>
              </li>
            ))}
            {name === "can" && (
              <li className="grid grid-cols-[20px_minmax(0,1fr)] items-center gap-3 text-left">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-md border"
                  style={{ borderColor: "var(--border)", background: "var(--pill-bg)", color: accent.dot }}
                >
                  <DotIcon />
                </span>
                <SupportedConversions />
              </li>
            )}
          </ul>

          <div className="pt-2 flex flex-col items-center">
            {ctaUrl ? (
              <motion.a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[16px] border px-6 py-3.5 text-[17px] font-semibold tracking-[-0.01em]"
                style={{
                  borderColor: accent.buttonBorder,
                  background: accent.buttonBg,
                  color: accent.buttonText,
                }}
                whileHover={{ y: -2, scale: 1.03, backgroundColor: accent.buttonHover }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 520, damping: 24 }}
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
                Coming soon
              </motion.button>
            )}

            {ctaHint && (
              <p className="mt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
                {ctaHint}
              </p>
            )}
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
            Built by
          </p>
          <a
            href={builtByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[12px] border px-3.5 py-2"
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

        <div
          className="mx-auto mt-10 w-full max-w-xl rounded-[18px] border p-4 sm:p-5"
          style={{ borderColor: "var(--border)", background: "var(--bg-sticky)" }}
        >
          <div className="flex items-start gap-3">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--border)", background: "var(--pill-bg)", color: "var(--text-secondary)" }}
            >
              <MailIcon />
            </span>
            <div className="text-left">
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                Join the tiny newsletter
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                Occasional product updates, builds, and launch notes.
              </p>
            </div>
          </div>

          <form onSubmit={onNewsletterSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[11px] border px-3 py-2.5 text-[14px] outline-none"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg)",
                color: "var(--text-primary)",
              }}
              required
            />
            <motion.button
              type="submit"
              className="rounded-[11px] border px-4 py-2.5 text-[14px] font-medium"
              style={{
                borderColor: accent.buttonBorder,
                background: accent.buttonBg,
                color: accent.buttonText,
              }}
              whileHover={{ y: -1, scale: 1.02, backgroundColor: accent.buttonHover }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 520, damping: 24 }}
            >
              Subscribe
            </motion.button>
          </form>

          {subscribed && (
            <p className="mt-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
              Thanks. You are on the list.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
