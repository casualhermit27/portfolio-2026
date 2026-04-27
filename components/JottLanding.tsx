"use client";

import { useEffect, useState } from "react";

const captures = [
  "Ship the landing page",
  "Call Sam at 4pm",
  "Reread the MiniLM paper",
];

type KeyStates = {
  first: boolean;
  second: boolean;
};

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

function ClipboardIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="3.5" width="6" height="4" rx="1.4" />
      <path d="M9 5.5H7a2 2 0 0 0-2 2V18a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V7.5a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5zm6 0A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 13 18.5z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.3 5.24a1 1 0 0 1 1.53-.85l8.5 6.76a1 1 0 0 1 0 1.56l-8.5 6.76A1 1 0 0 1 8.3 18.6z" />
    </svg>
  );
}

export default function JottLanding() {
  const [dropOpen, setDropOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [barText, setBarText] = useState("Capture a thought...");
  const [showCaret, setShowCaret] = useState(false);
  const [paused, setPaused] = useState(false);
  const [keyStates, setKeyStates] = useState<KeyStates>({ first: false, second: false });

  useEffect(() => {
    let cancelled = false;

    if (paused) {
      return () => {
        cancelled = true;
      };
    }

    const sleep = async (ms: number) => {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });
      return !cancelled;
    };

    const setText = (value: string) => {
      if (!cancelled) setBarText(value);
    };

    const typeText = async (value: string, speed = 55) => {
      if (cancelled) return false;
      setTyping(true);
      setText("");
      setShowCaret(true);
      let current = "";
      for (const char of value) {
        if (!(await sleep(speed + Math.random() * 25))) return false;
        current += char;
        setText(current);
      }
      return true;
    };

    const eraseText = async (initial: string) => {
      let current = initial;
      while (current.length) {
        if (!(await sleep(16))) return false;
        current = current.slice(0, -1);
        setText(current);
      }
      return true;
    };

    const pressKey = async (key: keyof KeyStates) => {
      setKeyStates((prev) => ({ ...prev, [key]: true }));
      if (!(await sleep(110))) return false;
      setKeyStates((prev) => ({ ...prev, [key]: false }));
      return true;
    };

    const doubleTap = async () => {
      if (!(await pressKey("first"))) return false;
      if (!(await sleep(120))) return false;
      return pressKey("second");
    };

    const resetBar = () => {
      setTyping(false);
      setText("Capture a thought...");
      setShowCaret(false);
    };

    const run = async () => {
      if (!(await sleep(900))) return;
      while (!cancelled) {
        if (!(await doubleTap())) return;
        if (!(await sleep(150))) return;
        setDropOpen(true);
        if (!(await sleep(700))) return;

        for (const capture of captures) {
          if (!(await typeText(capture))) return;
          if (!(await sleep(900))) return;
          if (!(await eraseText(capture))) return;
          if (!(await sleep(280))) return;
        }

        setTyping(false);
        setText("Capture a thought...");
        setShowCaret(false);
        if (!(await sleep(900))) return;

        setDropOpen(false);
        if (!(await sleep(500))) return;
        resetBar();
        if (!(await sleep(1600))) return;
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [paused]);

  return (
    <div className="jott-root">
      <main className="jott-bezel">
        <section className="jott-screen">
          <div className="jott-notch" />

          <div className="jott-drop-stage">
            <div className={`jott-drop${dropOpen ? " open" : ""}`}>
              <div className="jott-bar-shell">
                <div className="jott-bar-top">
                  <button type="button" className="jott-help-btn" aria-label="Help">
                    <HelpIcon />
                  </button>
                  <div className="jott-top-chips">
                    <span className="jott-status-chip">
                      saved
                    </span>
                    <span className="jott-status-chip">
                      <ClipboardIcon />
                      use clipboard
                    </span>
                  </div>
                </div>
                <div className={`jott-bar-input${typing ? " typing" : ""}`}>
                  <span className="jott-mode-badge">Notes</span>
                  <span className="jott-bar-text-wrap">
                    <span>{barText}</span>
                    <span className="jott-caret" style={{ display: showCaret ? "inline-block" : "none" }} />
                  </span>
                  <button type="button" className="jott-inline-mic" aria-label="Voice tools">
                    <MicIcon />
                  </button>
                </div>
                <div className="jott-dropdown">
                  <div className="jott-dropdown-grid">
                    <article className="jott-search-tile">
                      <div className="jott-search-tile-top">
                        <span className="jott-search-tile-icon">◫</span>
                        <span className="jott-search-tile-time">today</span>
                      </div>
                      <h3>Ship the landing page</h3>
                    </article>
                    <article className="jott-search-tile">
                      <div className="jott-search-tile-top">
                        <span className="jott-search-tile-icon">◫</span>
                        <span className="jott-search-tile-time">4d ago</span>
                      </div>
                      <h3>MiniLM embeddings + cosine similarity</h3>
                    </article>
                  </div>
                </div>
              </div>
              <div className="jott-tools-row">
                <button type="button" className="jott-tool-pill jott-tool-pill-text" aria-label="Text tools">
                  <span>Aa</span>
                </button>
                <button
                  type="button"
                  className="jott-preview-control"
                  onClick={() => setPaused((prev) => !prev)}
                  aria-pressed={paused}
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                  {paused ? "Play preview" : "Stop preview"}
                </button>
              </div>
            </div>
          </div>

          <div className="jott-main">
            <div className="jott-logo jott-r jott-r1">
              <span className="jott-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/jott.png" alt="Jott icon" className="jott-mark-image" />
              </span>
              <span>Jott</span>
            </div>
            <h1 className="jott-r jott-r2">
              Capture a <em>thought.</em>
            </h1>
            <p className="jott-lede jott-r jott-r3">One keystroke. Nothing in your way.</p>

            <div className="jott-trigger jott-r jott-r4">
              <span>Tap</span>
              <span className={`jott-keycap${keyStates.first ? " press" : ""}`}>⌥</span>
              <span className="jott-plus">+</span>
              <span className={`jott-keycap${keyStates.second ? " press" : ""}`}>⌥</span>
              <span>twice — anywhere.</span>
            </div>

            <div className="jott-ctas jott-r jott-r5">
              <a href="#" className="jott-btn jott-btn-primary">
                <AppleIcon />
                Download for Mac
              </a>
              <a href="#" className="jott-btn jott-btn-secondary">
                Mac App Store
              </a>
            </div>
            <div className="jott-meta jott-r jott-r6">macOS 13+ · Apple silicon &amp; Intel</div>
          </div>
        </section>
      </main>
    </div>
  );
}
