"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_TEXT = "What's on your mind?";

function HelpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.1 9a3 3 0 1 1 5.4 1.8c-.62.83-1.5 1.3-2 1.84-.34.37-.5.72-.5 1.36" />
      <circle cx="12" cy="17.25" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
      <path d="M12 17v3" />
      <path d="M9 20h6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function JottLanding() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [keysPressed, setKeysPressed] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Keycap visibility — independent cycling timer
  const [cueVisible, setCueVisible] = useState(false);
  const cueTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleCue = (showFirst: boolean, delay: number) => {
    cueTimer.current = setTimeout(() => {
      if (showFirst) {
        setCueVisible(true);
        scheduleCue(false, 2800);
      } else {
        setCueVisible(false);
        scheduleCue(true, 5200);
      }
    }, delay);
  };

  useEffect(() => {
    scheduleCue(true, 900);
    return () => { if (cueTimer.current) clearTimeout(cueTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typing animation — runs when popover opens
  useEffect(() => {
    if (typeTimer.current) clearTimeout(typeTimer.current);
    if (!popoverOpen) {
      setTypedText("");
      return;
    }
    setTypedText("");
    let i = 0;
    const type = () => {
      i++;
      setTypedText(DEMO_TEXT.slice(0, i));
      if (i < DEMO_TEXT.length) {
        typeTimer.current = setTimeout(type, 38 + Math.random() * 28);
      }
    };
    typeTimer.current = setTimeout(type, 260);
    return () => { if (typeTimer.current) clearTimeout(typeTimer.current); };
  }, [popoverOpen]);

  const pressKeys = () => {
    setKeysPressed(true);
    setTimeout(() => setKeysPressed(false), 200);
  };

  const playDemo = () => {
    setCueVisible(false);
    setPopoverOpen(false);
    setTimeout(pressKeys, 380);
    setTimeout(pressKeys, 760);
    setTimeout(() => setPopoverOpen(true), 1040);
  };

  useEffect(() => {
    playDemo();
    const interval = setInterval(playDemo, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="jott-root">
      <main className="jott-bezel">
        <section className="jott-screen">
          <div className="jott-notch" />

          {/* popover panel */}
          <div className={`jott-popover${popoverOpen ? " open" : ""}`}>
            <div className="jott-popover-shell">
              <div className="jott-popover-top">
                <button type="button" className="jott-help-btn" aria-label="Help">
                  <HelpIcon />
                </button>
                <span className="jott-top-mark" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/jott.png" alt="" className="jott-top-mark-image" />
                </span>
              </div>
              <div className="jott-popover-input">
                <span>
                  {typedText || <span className="jott-placeholder">What&apos;s on your mind?</span>}
                </span>
                {popoverOpen && <span className="jott-cursor" aria-hidden />}
              </div>
            </div>
            <div className="jott-floating-actions">
              <button type="button" className="jott-tool-pill jott-tool-pill-text" aria-label="Text tools">
                <span>Aa</span>
              </button>
              <button type="button" className="jott-tool-pill" aria-label="Voice note">
                <MicIcon />
              </button>
            </div>
          </div>

          {/* hero */}
          <div className="jott-main">
            <div className="jott-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/jott.png" alt="Jott icon" />
            </div>
            <p className="jott-label">jott</p>

            <h1>Capture a <em>thought.</em></h1>
            <p className="jott-lede">One keystroke. Nothing in your way.</p>

            <div className="jott-ctas">
              <button type="button" className="jott-btn jott-btn-primary" disabled>
                <span className="jott-brew-dot" aria-hidden />
                Brewing
              </button>
              <button type="button" className="jott-btn jott-btn-secondary" disabled>
                Mac App Store · soon
              </button>
            </div>

            <div className="jott-meta">macOS 13+ · Apple silicon &amp; Intel</div>
          </div>

          {/* keycap hint — fixed bottom center, auto cycles in/out */}
          <button
            type="button"
            className={`jott-trigger${cueVisible ? " visible" : ""}`}
            onClick={playDemo}
            aria-label="See double-Option shortcut demo"
          >
            <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥ option</span>
            <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥ option</span>
          </button>
        </section>
      </main>
    </div>
  );
}
