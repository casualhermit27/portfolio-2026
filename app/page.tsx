"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppShowcase from "@/components/AppShowcase";

export type App = {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  screens: string[];
  platform?: "ios" | "mac";
};

const apps: App[] = [
  {
    id: "mochi",
    name: "mochi",
    tagline: "a mindful journaling app",
    logo: "/logos/mochi.jpg.jpeg",
    platform: "ios",
    screens: [
      "/open-log-close-screen1 (1).png",
      "/reflection-screen2 (1).png",
      "/history-screen3 (1).png",
      "/widget-screen4 (1).png",
    ],
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
  {
    id: "can",
    name: "can",
    tagline: "convert anything now — drop to dock",
    logo: "/logos/can 2.jpg",
    platform: "mac",
    screens: [],
  },
];

// Approx height of sticky header + nav (px)
const STICKY_HEIGHT = 116;

function AppStoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 800 800" width="16" height="16">
      <linearGradient id="appstore-grad" x1="400.05" x2="400.05" y1="798.772" y2="-1.228" gradientTransform="matrix(1 0 0 -1 0 798.772)" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: "#18bffb" }} />
        <stop offset="1" style={{ stopColor: "#2072f3" }} />
      </linearGradient>
      <path fill="url(#appstore-grad)" d="M638.4 0H161.6C72.3 0 0 72.3 0 161.6v476.9C0 727.7 72.3 800 161.6 800h476.9c89.2 0 161.6-72.3 161.6-161.6V161.6C800 72.3 727.7 0 638.4 0z"/>
      <path fill="#FFF" d="m396.6 183.8 16.2-28c10-17.5 32.3-23.4 49.8-13.4s23.4 32.3 13.4 49.8L319.9 462.4h112.9c36.6 0 57.1 43 41.2 72.8H143c-20.2 0-36.4-16.2-36.4-36.4s16.2-36.4 36.4-36.4h92.8l118.8-205.9-37.1-64.4c-10-17.5-4.1-39.6 13.4-49.8 17.5-10 39.6-4.1 49.8 13.4l15.9 28.1zM256.2 572.7l-35 60.7c-10 17.5-32.3 23.4-49.8 13.4S148 614.5 158 597l26-45c29.4-9.1 53.3-2.1 72.2 20.7zm301.4-110.1h94.7c20.2 0 36.4 16.2 36.4 36.4s-16.2 36.4-36.4 36.4h-52.6l35.5 61.6c10 17.5 4.1 39.6-13.4 49.8-17.5 10-39.6 4.1-49.8-13.4-59.8-103.7-104.7-181.3-134.5-233-30.5-52.6-8.7-105.4 12.8-123.3 23.9 41 59.6 102.9 107.3 185.5z"/>
    </svg>
  );
}

export default function Home() {
  const [activeApp, setActiveApp] = useState<string>("mochi");

  // Scroll-spy: update active tab as sections enter view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    apps.forEach((app) => {
      const el = document.getElementById(`section-${app.id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveApp(app.id);
        },
        {
          rootMargin: `-${STICKY_HEIGHT}px 0px -50% 0px`,
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll to section, offset by sticky bar height
  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - STICKY_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ── Sticky header + nav ── */}
      <div className="sticky top-0 z-50 bg-[#F8F6F2]">
        <header className="px-16 pt-8 pb-5 flex items-end justify-between border-b border-[#E2DDD5]">
          <div>
            <p className="text-[13px] font-medium text-[#1C1C1C] tracking-tight">
              Harsha Chaganti
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] text-[#A09A93] tracking-wide">
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
          <p className="text-[11px] text-[#C0BAB0] tracking-wide pb-0.5">
            © 2026
          </p>
        </header>

        {/* Nav with sliding background pill */}
        <nav className="px-16 flex items-center gap-1 border-b border-[#E2DDD5] py-2">
          {apps.map((app) => {
            const isActive = app.id === activeApp;
            return (
              <button
                key={app.id}
                onClick={() => scrollTo(app.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                  isActive ? "text-[#1C1C1C]" : "text-[#A09A93] hover:text-[#6B6560]"
                }`}
              >
                {/* Sliding pill behind active tab */}
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-[#E8E3DB] border border-[#DDD8CF]"
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0 border transition-colors z-10 ${
                    isActive ? "border-[#D4CFC7]" : "border-[#E2DDD5]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Label */}
                <span className={`relative z-10 text-[13px] ${isActive ? "font-medium" : "font-normal"}`}>
                  {app.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── All app sections ── */}
      <main className="px-16">
        {apps.map((app, i) => (
          <div key={app.id}>
            {i > 0 && <div className="border-t border-[#E2DDD5]" />}
            <section id={`section-${app.id}`} className="py-16">
              <AppShowcase app={app} />
            </section>
          </div>
        ))}
      </main>

    </div>
  );
}
