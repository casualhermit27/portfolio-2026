"use client";

import { useEffect, useState } from "react";

function HelpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.1 9a3 3 0 1 1 5.4 1.8c-.62.83-1.5 1.3-2 1.84-.34.37-.5.72-.5 1.36" />
      <circle cx="12" cy="17.25" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
      <path d="M12 17v3" />
      <path d="M9 20h6" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M11.182 8.394c-.016-1.616 1.32-2.39 1.38-2.428-.752-1.1-1.924-1.25-2.34-1.268-.996-.1-1.944.586-2.45.586-.51 0-1.29-.572-2.12-.556-1.09.016-2.096.634-2.656 1.612-1.132 1.96-.29 4.866.816 6.46.538.78 1.18 1.656 2.02 1.624.81-.032 1.116-.524 2.096-.524.98 0 1.256.524 2.116.508.874-.014 1.428-.794 1.962-1.58.619-.908.874-1.79.89-1.836-.02-.01-1.708-.654-1.714-2.598zM9.704 3.582c.448-.544.75-1.298.668-2.046-.644.026-1.424.428-1.888.972-.416.482-.78 1.252-.682 1.986.72.056 1.454-.366 1.902-.912z" />
    </svg>
  );
}

export default function JottLanding() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [keysPressed, setKeysPressed] = useState(false);

  const pressKeys = () => {
    setKeysPressed(true);
    window.setTimeout(() => setKeysPressed(false), 220);
  };

  const playDemo = () => {
    setPopoverOpen(false);
    window.setTimeout(pressKeys, 420);
    window.setTimeout(pressKeys, 820);
    window.setTimeout(() => setPopoverOpen(true), 1120);
  };

  useEffect(() => {
    playDemo();
    const interval = window.setInterval(playDemo, 6200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="jott-root">
      <main className="jott-bezel">
        <section className="jott-screen">
          <div className="jott-notch" />

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
                <span>What&apos;s on your mind?</span>
              </div>
            </div>

            <div className="jott-floating-actions">
              <button type="button" className="jott-tool-pill jott-tool-pill-text" aria-label="Text tools">
                <span>Aa</span>
              </button>
              <button type="button" className="jott-tool-pill" aria-label="Voice tools">
                <MicIcon />
              </button>
            </div>
          </div>

          <div className="jott-main">
            <div className="jott-logo">
              <span className="jott-logo-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/jott.png" alt="Jott icon" className="jott-logo-mark-image" />
              </span>
              <span>Jott</span>
            </div>

            <h1>
              Capture a <em>thought.</em>
            </h1>
            <p className="jott-lede">One keystroke. Nothing in your way.</p>

            <button type="button" className="jott-trigger" onClick={playDemo}>
              <span>Tap</span>
              <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥</span>
              <span className="jott-plus">+</span>
              <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥</span>
              <span>twice — anywhere.</span>
            </button>

            <div className="jott-ctas">
              <a href="#" className="jott-btn jott-btn-primary">
                <AppleIcon />
                Download for Mac
              </a>
              <a href="#" className="jott-btn jott-btn-secondary">
                Mac App Store
              </a>
            </div>

            <div className="jott-meta">macOS 13+ · Apple silicon &amp; Intel</div>
          </div>
        </section>
      </main>
    </div>
  );
}
