"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AppShowcase from "@/components/AppShowcase";
import DogDivider from "@/components/DogDivider";

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
    id: "jott",
    name: "jott",
    tagline: "capture a thought, anywhere",
    logo: "/logos/jott.png",
    platform: "mac",
    liveUrl: "https://jott.harshachaganti.com",
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
        <header className="backdrop-blur-xl">
          {/* app tab strip + dark mode toggle */}
          <nav
            className="px-5 sm:px-8 md:px-12 lg:px-16 flex items-center gap-6 sm:gap-8 border-b"
            aria-label="App navigation"
            style={{ borderColor: "var(--border)" }}
          >
            {apps.map((app) => {
              const isActive = app.id === activeApp;
              return (
                <button
                  key={app.id}
                  onClick={() => scrollTo(app.id)}
                  className="relative flex items-center gap-2 py-3 transition-colors duration-200 whitespace-nowrap"
                  style={{
                    color: isActive ? "var(--text-primary)" : "var(--text-faint)",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.logo}
                    alt=""
                    aria-hidden
                    className="object-cover flex-shrink-0 transition-opacity duration-200"
                    style={{
                      width: 20, height: 20, borderRadius: 5,
                      opacity: isActive ? 1 : 0.35,
                    }}
                  />
                  <span className="text-[12px] tracking-wide">{app.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                      style={{ background: "var(--text-primary)", opacity: 0.45 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Dark mode toggle + copyright pushed to the right */}
            <div className="ml-auto flex items-center gap-3 py-3">
              <p className="text-[11px] tracking-wide" style={{ color: "var(--text-faint)" }}>
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
          </nav>
        </header>
      </div>

      {/* ── Hero: centered name ── */}
      <motion.div
        className="flex flex-col items-center justify-center px-5 text-center"
        style={{ paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-light tracking-tight"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Harsha Chaganti
        </h1>
        <motion.div
          className="flex items-center gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <p
            className="text-[13px] tracking-wide"
            style={{ color: "var(--text-secondary)" }}
          >
            iOS Developer
          </p>
          <a
            href="https://apps.apple.com/developer/harsha-chaganti"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-90 transition-opacity duration-200"
            title="App Store"
          >
            <AppStoreIcon />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Dog divider ── */}
      <DogDivider />

      {/* ── All app sections ── */}
      <main className="px-5 sm:px-8 md:px-12 lg:px-16 pb-14">
        {apps.map((app, i) => {
          const comingSoon = i > 1; // everything after "can"
          return (
            <div key={app.id}>
              {i > 0 && (
                <div
                  className="border-t"
                  style={{ borderColor: "var(--section-divider)" }}
                />
              )}
              <section id={`section-${app.id}`} className="py-10 sm:py-12 md:py-16">
                <AppShowcase app={app} comingSoon={comingSoon} />
              </section>
            </div>
          );
        })}
      </main>


    </div>
  );
}
