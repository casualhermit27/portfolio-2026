"use client";

import { useEffect, useMemo, useState } from "react";

const corpus = [
  { title: "MiniLM (sentence embeddings) + cosine similarity", meta: "note · 4d ago" },
  { title: "Ship the landing page", meta: "note · 2d ago" },
  { title: "Reread the MiniLM paper this weekend", meta: "note · 1d ago" },
  { title: "Logging schema for capture events", meta: "note · 6d ago" },
  { title: "Call Sam at 4pm — staffing", meta: "note · today" },
  { title: "Ready to cook — risotto recipe", meta: "note · 1w ago" },
];

const captures = [
  "Ship the landing page",
  "Call Sam at 4pm",
  "Reread the MiniLM paper",
];

type KeyStates = {
  first: boolean;
  second: boolean;
};

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5l3 3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      className="jott-result-icon"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 2h5l3 3v9H4z" />
      <path d="M9 2v3h3" />
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

function highlightParts(title: string, query: string) {
  if (!query) return [{ text: title, highlighted: false }];
  const index = title.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return [{ text: title, highlighted: false }];

  return [
    { text: title.slice(0, index), highlighted: false },
    { text: title.slice(index, index + query.length), highlighted: true },
    { text: title.slice(index + query.length), highlighted: false },
  ].filter((part) => part.text);
}

export default function JottLanding() {
  const [dropOpen, setDropOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [barText, setBarText] = useState("What's on your mind?");
  const [showCaret, setShowCaret] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [keyStates, setKeyStates] = useState<KeyStates>({ first: false, second: false });

  const results = useMemo(() => {
    if (!searchMode) return [];
    return corpus.filter((note) => note.title.toLowerCase().includes(barText.toLowerCase())).slice(0, 4);
  }, [barText, searchMode]);

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

    const typeSearchQuery = async (query: string) => {
      setText("");
      let current = "";
      for (const char of query) {
        if (!(await sleep(70 + Math.random() * 25))) return false;
        current += char;
        setText(current);
      }
      return true;
    };

    const resetBar = () => {
      setTyping(false);
      setSearchMode(false);
      setResultsOpen(false);
      setText("What's on your mind?");
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
        setText("What's on your mind?");
        setShowCaret(false);
        if (!(await sleep(500))) return;

        if (!(await typeText("/search", 70))) return;
        if (!(await sleep(380))) return;
        setSearchMode(true);
        setText("");
        if (!(await sleep(220))) return;
        if (!(await typeSearchQuery("minilm"))) return;
        setResultsOpen(true);
        if (!(await sleep(1700))) return;

        let current = "minilm";
        while (current.length) {
          if (!(await sleep(28))) return;
          current = current.slice(0, -1);
          setText(current);
        }

        if (!(await sleep(200))) return;
        if (!(await typeSearchQuery("sam"))) return;
        if (!(await sleep(1500))) return;

        setShowCaret(false);
        setResultsOpen(false);
        if (!(await sleep(400))) return;
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
                <div className={`jott-bar-input${typing ? " typing" : ""}${searchMode ? " search-mode" : ""}`}>
                  <span className="jott-mode-badge">
                    <SearchIcon />
                    Search
                  </span>
                  <span className="jott-bar-text-wrap">
                    <span>{barText}</span>
                    <span className="jott-caret" style={{ display: showCaret ? "inline-block" : "none" }} />
                  </span>
                </div>

                <div className="jott-hint">
                  <span className="jott-slash">
                    type <code>/search</code> to find a note
                  </span>
                  <span>↵ save</span>
                </div>

                <div className={`jott-results${resultsOpen ? " open" : ""}`}>
                  {results.length ? (
                    results.map((result, index) => (
                      <div className={`jott-result${index === 0 ? " active" : ""}`} key={result.title}>
                        <FileIcon />
                        <div className="jott-result-body">
                          <div className="jott-result-title">
                            {highlightParts(result.title, barText).map((part, indexPart) =>
                              part.highlighted ? <mark key={`${result.title}-${indexPart}`}>{part.text}</mark> : <span key={`${result.title}-${indexPart}`}>{part.text}</span>
                            )}
                          </div>
                          <div className="jott-result-meta">{result.meta}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="jott-result-empty">No notes match &quot;{barText}&quot;</div>
                  )}
                </div>
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
              <button
                type="button"
                className="jott-btn jott-btn-tertiary"
                onClick={() => setPaused((prev) => !prev)}
                aria-pressed={paused}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
                {paused ? "Play Preview" : "Pause Preview"}
              </button>
            </div>
            <div className="jott-meta jott-r jott-r6">macOS 13+ · Apple silicon &amp; Intel</div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500&display=swap");

        .jott-root {
          --canvas: #fffdf9;
          --ink: #121212;
          --ink-mute: #65615c;
          --ink-faint: #8e877f;
          --ink-fainter: #b1aaa3;
          --hairline: rgba(17, 17, 17, 0.09);
          --accent: #8e79d8;
          --accent-ink: #231f32;
          --accent-soft: rgba(142, 121, 216, 0.14);
          --accent-ring: rgba(142, 121, 216, 0.34);
          --sans: "IBM Plex Sans", -apple-system, sans-serif;
          --serif: "IBM Plex Serif", Georgia, serif;
          --mono: "IBM Plex Mono", ui-monospace, monospace;
          background: #fffdf9;
          color: var(--ink);
          font-family: var(--sans);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .jott-bezel {
          min-height: 100vh;
          background: #fffdf9;
          padding: 14px 14px 18px;
        }

        .jott-screen {
          position: relative;
          min-height: calc(100vh - 32px);
          overflow: hidden;
          border-radius: 22px;
          background: var(--canvas);
          border: 2px solid #111;
          box-shadow: none;
        }

        .jott-notch {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 40;
          height: 30px;
          width: 220px;
          transform: translateX(-50%);
          border-radius: 0 0 18px 18px;
          background: #080808;
        }

        .jott-notch::after {
          content: "";
          position: absolute;
          top: 11px;
          right: 30px;
          height: 7px;
          width: 7px;
          border-radius: 999px;
          background: #141418;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        .jott-drop-stage {
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 35;
          width: 520px;
          transform: translateX(-50%);
        }

        .jott-drop {
          pointer-events: auto;
          transform: translateY(-100%);
          transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .jott-drop.open {
          transform: translateY(0);
        }

        .jott-bar-shell {
          border-radius: 0 0 24px 24px;
          background: #080808;
          padding: 30px 12px 12px;
          box-shadow: none;
        }

        .jott-bar-input {
          position: relative;
          display: flex;
          min-height: 54px;
          align-items: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          padding: 16px 20px;
          text-align: left;
          font-size: 17px;
          color: var(--ink-faint);
          transition: background 300ms ease, box-shadow 300ms ease;
        }

        .jott-bar-input.typing {
          color: #f4f1ec;
        }

        .jott-bar-input.search-mode {
          background: rgba(180, 150, 255, 0.08);
          box-shadow: inset 0 0 0 1px var(--accent-ring);
        }

        .jott-mode-badge {
          position: absolute;
          left: 14px;
          top: 50%;
          display: none;
          height: 24px;
          transform: translateY(-50%);
          align-items: center;
          gap: 6px;
          border-radius: 6px;
          background: var(--accent-soft);
          padding: 0 10px;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.4px;
        }

        .jott-bar-input.search-mode .jott-mode-badge {
          display: inline-flex;
        }

        .jott-bar-input.search-mode .jott-bar-text-wrap {
          padding-left: 70px;
        }

        .jott-bar-text-wrap {
          display: flex;
          flex: 1;
          align-items: center;
          transition: padding-left 200ms ease;
        }

        .jott-caret {
          margin-left: 2px;
          display: inline-block;
          height: 18px;
          width: 1.5px;
          animation: jott-blink 1s steps(1) infinite;
          background: var(--accent);
          vertical-align: middle;
        }

        .jott-results {
          margin-top: 8px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 500ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 300ms ease, margin-top 300ms ease;
        }

        .jott-results.open {
          max-height: 320px;
          opacity: 1;
        }

        .jott-result {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-radius: 10px;
          padding: 10px 16px;
          text-align: left;
          transition: background 200ms ease;
        }

        .jott-result + .jott-result {
          margin-top: 2px;
        }

        .jott-result.active {
          background: rgba(255, 255, 255, 0.04);
        }

        .jott-result-icon {
          margin-top: 2px;
          height: 18px;
          width: 18px;
          flex-shrink: 0;
          color: oklch(0.78 0.12 145);
        }

        .jott-result-body {
          min-width: 0;
          flex: 1;
        }

        .jott-result-title {
          margin-bottom: 2px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.35;
          color: #f4f1ec;
        }

        .jott-result-title mark {
          border-radius: 3px;
          background: var(--accent-soft);
          padding: 0 2px;
          color: var(--accent);
        }

        .jott-result-meta,
        .jott-hint {
          font-family: var(--mono);
          letter-spacing: 0.4px;
        }

        .jott-result-meta {
          font-size: 10.5px;
          color: var(--ink-fainter);
        }

        .jott-result-empty {
          padding: 14px 16px;
          font-size: 13px;
          color: var(--ink-faint);
        }

        .jott-hint {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px 4px;
          font-size: 10.5px;
          color: var(--ink-fainter);
          transition: opacity 300ms ease;
        }

        .jott-bar-input.search-mode ~ .jott-hint {
          opacity: 0.4;
        }

        .jott-slash {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .jott-slash code {
          border: 1px solid var(--hairline);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 6px;
          color: var(--ink-mute);
          font-family: var(--mono);
          font-size: 10.5px;
        }

        .jott-main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 140px 32px 80px;
          text-align: center;
        }

        .jott-logo {
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--serif);
          font-size: 17px;
          font-weight: 500;
        }

        .jott-mark {
          display: flex;
          height: 22px;
          width: 22px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 6px;
          background: var(--accent);
          color: var(--accent-ink);
        }

        .jott-mark-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .jott-main h1 {
          margin: 0 0 20px;
          max-width: 780px;
          font-family: var(--serif);
          font-size: 64px;
          font-weight: 500;
          line-height: 1.04;
          letter-spacing: -1.2px;
        }

        .jott-main h1 em {
          color: var(--accent);
          font-style: italic;
        }

        .jott-lede {
          margin: 0 0 28px;
          max-width: 420px;
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink-mute);
        }

        .jott-trigger {
          margin-bottom: 32px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ink-mute);
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.3px;
        }

        .jott-keycap {
          display: inline-flex;
          min-width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(18, 18, 18, 0.09);
          border-bottom-width: 2px;
          border-radius: 6px;
          background: #fbf7f1;
          padding: 0 8px;
          color: var(--ink);
          font-family: var(--sans);
          font-size: 12px;
          font-weight: 500;
          transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
        }

        .jott-keycap.press {
          transform: translateY(2px);
          border-color: var(--accent-ring);
          border-bottom-width: 1px;
          background: #f1ebff;
          color: var(--accent);
        }

        .jott-plus {
          color: var(--ink-fainter);
        }

        .jott-ctas {
          margin-bottom: 14px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .jott-btn {
          display: inline-flex;
          height: 44px;
          align-items: center;
          gap: 10px;
          border-radius: 10px;
          padding: 0 18px;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          transition: transform 140ms ease, border-color 140ms ease;
          appearance: none;
          cursor: pointer;
        }

        .jott-btn-primary {
          border: 1px solid #dccff5;
          background: #efe7ff;
          color: #352d48;
        }

        .jott-btn-primary:hover {
          transform: translateY(-1px);
          border-color: #cbb8f2;
          background: #e8defd;
        }

        .jott-btn-secondary {
          border: 1px solid #e7ddd3;
          background: #fff8f1;
          color: #514a43;
        }

        .jott-btn-secondary:hover {
          border-color: #dacdbf;
          background: #fdf3e7;
        }

        .jott-btn-tertiary {
          border: 1px solid #ddd6ce;
          background: #f7f3ee;
          color: #4e4740;
        }

        .jott-btn-tertiary:hover {
          border-color: #ccc3ba;
          background: #f2ede7;
          transform: translateY(-1px);
        }

        .jott-meta {
          margin-top: 14px;
          color: var(--ink-fainter);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .jott-r {
          opacity: 0;
          transform: translateY(8px);
          animation: jott-reveal 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .jott-r1 {
          animation-delay: 0ms;
        }

        .jott-r2 {
          animation-delay: 80ms;
        }

        .jott-r3 {
          animation-delay: 160ms;
        }

        .jott-r4 {
          animation-delay: 240ms;
        }

        .jott-r5 {
          animation-delay: 320ms;
        }

        .jott-r6 {
          animation-delay: 400ms;
        }

        @keyframes jott-blink {
          50% {
            opacity: 0;
          }
        }

        @keyframes jott-reveal {
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 680px) {
          .jott-drop-stage {
            width: 92%;
          }

          .jott-main h1 {
            font-size: 44px;
            letter-spacing: -0.8px;
          }
        }
      `}</style>
    </div>
  );
}
