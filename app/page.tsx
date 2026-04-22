"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AppShowcase from "@/components/AppShowcase";

export type App = {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  screens: string[];
  platform?: "ios" | "mac";
  liveUrl?: string;
};

const apps: App[] = [
  {
    id: "mochi",
    name: "mochi",
    tagline: "a mindful journaling app",
    logo: "/logos/mochi.jpg.jpeg",
    platform: "ios",
    liveUrl: "https://mochi.harshachaganti.com",
    screens: [
      "/open-log-close-screen1 (1).png",
      "/reflection-screen2 (1).png",
      "/history-screen3 (1).png",
      "/widget-screen4 (1).png",
    ],
  },
  {
    id: "can",
    name: "can",
    tagline: "convert anything now — drop to dock",
    logo: "/logos/can 2.jpg",
    platform: "mac",
    liveUrl: "https://can.harshachaganti.com",
    screens: [],
  },
  {
    id: "boba",
    name: "boba",
    tagline: "something is brewing",
    logo: "/logos/boba.jpg",
    platform: "ios",
    screens: [],
  },
  {
    id: "miso",
    name: "miso",
    tagline: "coming soon",
    logo: "/logos/miso-logo.jpg.jpeg",
    platform: "ios",
    screens: [],
  },
  {
    id: "plod",
    name: "plod",
    tagline: "step tracking & habit streaks",
    logo: "/logos/plod logo.png",
    platform: "ios",
    screens: [],
  },
];

function AppStoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 800 800" width="16" height="16">
      <linearGradient id="appstore-grad" x1="400.05" x2="400.05" y1="798.772" y2="-1.228" gradientTransform="matrix(1 0 0 -1 0 798.772)" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: "#18bffb" }} />
        <stop offset="1" style={{ stopColor: "#2072f3" }} />
      </linearGradient>
      <path fill="url(#appstore-grad)" d="M638.4 0H161.6C72.3 0 0 72.3 0 161.6v476.9C0 727.7 72.3 800 161.6 800h476.9c89.2 0 161.6-72.3 161.6-161.6V161.6C800 72.3 727.7 0 638.4 0z" />
      <path fill="#FFF" d="m396.6 183.8 16.2-28c10-17.5 32.3-23.4 49.8-13.4s23.4 32.3 13.4 49.8L319.9 462.4h112.9c36.6 0 57.1 43 41.2 72.8H143c-20.2 0-36.4-16.2-36.4-36.4s16.2-36.4 36.4-36.4h92.8l118.8-205.9-37.1-64.4c-10-17.5-4.1-39.6 13.4-49.8 17.5-10 39.6-4.1 49.8 13.4l15.9 28.1zM256.2 572.7l-35 60.7c-10 17.5-32.3 23.4-49.8 13.4S148 614.5 158 597l26-45c29.4-9.1 53.3-2.1 72.2 20.7zm301.4-110.1h94.7c20.2 0 36.4 16.2 36.4 36.4s-16.2 36.4-36.4 36.4h-52.6l35.5 61.6c10 17.5 4.1 39.6-13.4 49.8-17.5 10-39.6 4.1-49.8-13.4-59.8-103.7-104.7-181.3-134.5-233-30.5-52.6-8.7-105.4 12.8-123.3 23.9 41 59.6 102.9 107.3 185.5z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

export default function Home() {
  const [activeApp, setActiveApp] = useState<string>("mochi");
  const [dark, setDark] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(88);
  const isScrollingRef = useRef(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Apply / remove dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const measureHeader = () => {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 88);
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);

  // Scroll-spy: position-based, works for short sections too
  useEffect(() => {
    const onScroll = () => {
      if (isScrollingRef.current) return;
      const lastAppId = apps[apps.length - 1].id;

      // If near bottom, activate last section.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;

      if (atBottom) {
        setActiveApp((prev) => (prev === lastAppId ? prev : lastAppId));
        return;
      }

      // Short final sections may never reach the marker line, so switch once
      // the final section header is clearly within the viewport.
      const lastSection = document.getElementById(`section-${lastAppId}`);
      if (lastSection) {
        const lastTop = lastSection.getBoundingClientRect().top;
        if (lastTop <= window.innerHeight * 0.65) {
          setActiveApp((prev) => (prev === lastAppId ? prev : lastAppId));
          return;
        }
      }

      const scrollY = window.scrollY + headerHeight + window.innerHeight * 0.25;
      let current = apps[0].id;

      for (const app of apps) {
        const el = document.getElementById(`section-${app.id}`);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = app.id;
        }
      }

      setActiveApp((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight]);

  // Smooth scroll to section, offset by sticky header height
  const scrollTo = (id: string) => {
    isScrollingRef.current = true;
    setActiveApp(id);
    const el = document.getElementById(`section-${id}`);
    if (!el) {
      isScrollingRef.current = false;
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: "smooth" });

    // Re-enable scroll-spy once smooth scroll settles
    const unlock = () => { isScrollingRef.current = false; };
    window.addEventListener("scrollend", unlock, { once: true });
    // Fallback for browsers without scrollend
    setTimeout(() => { isScrollingRef.current = false; }, 800);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-250"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >

      {/* ── Sticky header ── */}
      <div
        ref={headerRef}
        className="sticky top-0 z-50 transition-colors duration-250"
        style={{ background: "var(--bg-sticky)" }}
      >
        <header
          className="px-5 sm:px-8 md:px-12 lg:px-16 pt-5 sm:pt-7 pb-4 flex items-end justify-between border-b backdrop-blur-xl"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p
              className="text-[13px] font-medium tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Harsha Chaganti
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p
                className="text-[11px] tracking-wide"
                style={{ color: "var(--text-secondary)" }}
              >
                iOS Developer
              </p>
              <a
                href="https://apps.apple.com/developer/harsha-chaganti"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity duration-200"
                title="App Store"
              >
                <AppStoreIcon />
              </a>
            </div>
          </div>

          {/* Right side: copyright + dark mode toggle */}
          <div className="flex items-center gap-3 pb-0.5">
            <p
              className="text-[11px] tracking-wide"
              style={{ color: "var(--text-faint)" }}
            >
              © 2026
            </p>
            <button
              onClick={() => setDark((d) => !d)}
              className="flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                background: "var(--pill-bg)",
                color: "var(--text-secondary)",
              }}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle dark mode"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>
      </div>

      {/* ── All app sections ── */}
      <main className="px-5 sm:px-8 md:px-12 lg:px-16 pb-14">
        {apps.map((app, i) => (
          <div key={app.id}>
            {i > 0 && (
              <div
                className="border-t"
                style={{ borderColor: "var(--section-divider)" }}
              />
            )}
            <section id={`section-${app.id}`} className="py-10 sm:py-12 md:py-16">
              <AppShowcase app={app} />
            </section>
          </div>
        ))}
      </main>

      {/* ── Wheel nav (right center) ── */}
      <div
        className="fixed right-5 sm:right-7 top-1/2 z-50 pointer-events-none"
        style={{ transform: "translateY(-50%)" }}
      >
        <nav
          className="pointer-events-auto flex flex-col items-center"
          aria-label="App navigation"
          style={{ gap: 4 }}
        >
          {apps.map((app, i) => {
            const activeIdx = apps.findIndex((a) => a.id === activeApp);
            const dist = Math.abs(i - activeIdx);
            const isActive = dist === 0;

            // height, icon size, opacity, border-radius — all spring-animated
            const segH    = [104, 56, 36][Math.min(dist, 2)];
            const iconSz  = [42,  22, 13][Math.min(dist, 2)];
            const op      = [1,  0.55, 0.25][Math.min(dist, 2)];
            const radius  = [18,  14,  10][Math.min(dist, 2)];

            const lightColors = ["#C3ABFF","#FFB87A","#74D9A2","#70C6FA","#FF97B3"];
            const darkColors  = ["#3C2A72","#723210","#0E5432","#103262","#72102E"];
            const segColor = dark ? darkColors[i] : lightColors[i];

            const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.75 };

            return (
              <motion.button
                key={app.id}
                onClick={() => scrollTo(app.id)}
                aria-label={`Go to ${app.name}`}
                className="relative flex items-center justify-center overflow-hidden group"
                animate={{ height: segH, opacity: op, borderRadius: radius }}
                whileHover={{ opacity: Math.max(op, 0.72), scale: isActive ? 1 : 1.04 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
                style={{ width: 58, background: segColor, flexShrink: 0 }}
              >
                {/* shimmer on active */}
                {isActive && (
                  <motion.div
                    layoutId="wheel-shimmer"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
                    }}
                    transition={spring}
                  />
                )}

                {/* icon wrapper — animates size */}
                <motion.div
                  className="relative z-10 overflow-hidden flex-shrink-0"
                  animate={{ width: iconSz, height: iconSz, borderRadius: Math.round(iconSz * 0.24) }}
                  transition={spring}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={app.logo} alt={app.name} className="w-full h-full object-cover" />
                </motion.div>

                {/* app name label — left side on hover (active only) */}
                {isActive && (
                  <span
                    className="absolute right-[calc(100%+10px)] whitespace-nowrap text-[11px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-120 pointer-events-none select-none"
                    style={{
                      color: "var(--text-primary)",
                      background: "var(--dock-bg)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 8,
                      padding: "4px 10px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {app.name}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

    </div>
  );
}
