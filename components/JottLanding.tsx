"use client";

import { useEffect, useState } from "react";

const demoLines = [
  "Plan Q3 sync with design on Tuesday.",
  "Review action items before 4 PM.",
  "Capture next steps while everyone is talking.",
];

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5zm6 0A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 13 18.5z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.3 5.24a1 1 0 0 1 1.53-.85l8.5 6.76a1 1 0 0 1 0 1.56l-8.5 6.76A1 1 0 0 1 8.3 18.6z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.1 9a3 3 0 1 1 5.4 1.8c-.62.83-1.5 1.3-2 1.84-.34.37-.5.72-.5 1.36" />
      <circle cx="12" cy="17.25" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m20.5 15-4.7-4.7a1 1 0 0 0-1.42 0L7 17.5" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 18 9.2 8.5a1 1 0 0 1 1.9 0L14 18" />
      <path d="M7.2 14h5.6" />
      <path d="M17 8.5h1.5a2 2 0 1 1 0 4H17z" />
      <path d="M17 12.5h2a2 2 0 1 1 0 4H17z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
      <path d="M12 17v3" />
      <path d="M9 20h6" />
    </svg>
  );
}

export default function JottLanding() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (!isPlaying) return;

    const currentLine = demoLines[lineIndex];
    const nextText = phase === "deleting"
      ? currentLine.slice(0, Math.max(displayText.length - 1, 0))
      : currentLine.slice(0, displayText.length + 1);

    const timeout = window.setTimeout(() => {
      if (phase === "holding") {
        setPhase("deleting");
        return;
      }

      setDisplayText(nextText);

      if (phase === "typing" && nextText === currentLine) {
        setPhase("holding");
        return;
      }

      if (phase === "deleting" && nextText.length === 0) {
        setPhase("typing");
        setLineIndex((prev) => (prev + 1) % demoLines.length);
      }
    }, phase === "holding" ? 1100 : phase === "deleting" ? 22 : 44);

    return () => window.clearTimeout(timeout);
  }, [displayText, isPlaying, lineIndex, phase]);

  return (
    <div className="jott-root">
      <main className="jott-shell">
        <section className="jott-stage">
          <div className="jott-notch">
            <div className="jott-notch-camera" />
          </div>

          <div className="jott-hero">
            <div className="jott-demo-wrap">
              <div className="jott-demo">
                <div className="jott-demo-top">
                  <button type="button" className="jott-circle-btn" aria-label="Help">
                    <HelpIcon />
                  </button>

                  <div className="jott-demo-actions">
                    <button type="button" className="jott-pill-btn">
                      <ImageIcon />
                      <span>Use image</span>
                    </button>
                  </div>
                </div>

                <div className="jott-input-panel">
                  <div className="jott-input-text">
                    {displayText || "Add a meeting note..."}
                    <span className={`jott-caret${isPlaying ? " visible" : ""}`} />
                  </div>
                </div>

                <div className="jott-tool-row">
                  <button type="button" className="jott-tool-btn jott-tool-wide" aria-label="Text formatting">
                    <TextIcon />
                  </button>
                  <button type="button" className="jott-tool-btn" aria-label="Voice note">
                    <MicIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="jott-copy">
              <div className="jott-brand">
                <span className="jott-brand-mark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/jott.png" alt="Jott icon" className="jott-brand-image" />
                </span>
                <span>Jott</span>
              </div>

              <h1>Capture notes without breaking the conversation.</h1>
              <p className="jott-lede">
                A fast, focused note surface for meetings, ideas, and follow-ups. Open it, write immediately, and get out of the way.
              </p>

              <div className="jott-copy-actions">
                <a href="#" className="jott-primary-btn">Download for Mac</a>
                <button
                  type="button"
                  className="jott-secondary-btn"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-pressed={!isPlaying}
                >
                  <span className="jott-control-icon">{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
                  <span>{isPlaying ? "Pause preview" : "Play preview"}</span>
                </button>
              </div>

              <p className="jott-meta">macOS 13+ · Apple silicon &amp; Intel · built for fast capture</p>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500&display=swap");

        .jott-root {
          --jott-bg: #aab7c5;
          --jott-bg-soft: #b9c5d1;
          --jott-stage: #9eacba;
          --jott-panel: #0d0d0f;
          --jott-panel-soft: #141417;
          --jott-line: rgba(255, 255, 255, 0.08);
          --jott-line-strong: rgba(255, 255, 255, 0.14);
          --jott-text: #f4f6f8;
          --jott-text-muted: rgba(244, 246, 248, 0.55);
          --jott-text-faint: rgba(244, 246, 248, 0.38);
          --jott-copy: #1e2a36;
          --jott-copy-soft: rgba(30, 42, 54, 0.74);
          --jott-notch: #050506;
          --jott-accent: #1a2330;
          --jott-radius: 34px;
          min-height: 100vh;
          background: linear-gradient(180deg, var(--jott-bg-soft) 0%, var(--jott-bg) 100%);
          color: var(--jott-copy);
          font-family: "IBM Plex Sans", -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .jott-shell {
          min-height: 100vh;
          padding: 18px;
          background: transparent;
        }

        .jott-stage {
          position: relative;
          min-height: calc(100vh - 36px);
          overflow: hidden;
          border-radius: 36px;
          background: linear-gradient(180deg, #b6c2ce 0%, #a2afbc 100%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .jott-notch {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 4;
          display: flex;
          height: 34px;
          width: 228px;
          transform: translateX(-50%);
          align-items: center;
          justify-content: center;
          border-radius: 0 0 22px 22px;
          background: var(--jott-notch);
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .jott-notch-camera {
          height: 9px;
          width: 68px;
          border-radius: 999px;
          background: linear-gradient(180deg, #0e1115 0%, #0a0b0d 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .jott-hero {
          display: flex;
          min-height: calc(100vh - 36px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 44px;
          padding: 112px 24px 72px;
        }

        .jott-demo-wrap {
          width: min(920px, 100%);
          display: flex;
          justify-content: center;
        }

        .jott-demo {
          width: min(920px, 100%);
        }

        .jott-demo-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding: 0 4px;
        }

        .jott-circle-btn,
        .jott-pill-btn,
        .jott-tool-btn,
        .jott-secondary-btn {
          appearance: none;
          border: 1px solid var(--jott-line);
          background: rgba(12, 12, 14, 0.92);
          color: var(--jott-text-muted);
        }

        .jott-circle-btn,
        .jott-pill-btn,
        .jott-tool-btn,
        .jott-primary-btn,
        .jott-secondary-btn {
          transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .jott-circle-btn:hover,
        .jott-pill-btn:hover,
        .jott-tool-btn:hover,
        .jott-secondary-btn:hover,
        .jott-primary-btn:hover {
          transform: translateY(-1px);
        }

        .jott-circle-btn {
          display: inline-flex;
          height: 42px;
          width: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
        }

        .jott-circle-btn svg,
        .jott-pill-btn svg {
          height: 18px;
          width: 18px;
        }

        .jott-pill-btn {
          display: inline-flex;
          height: 42px;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 500;
        }

        .jott-input-panel {
          min-height: 176px;
          border-radius: 0 0 34px 34px;
          background: rgba(14, 14, 16, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 36px 24px 28px;
        }

        .jott-input-text {
          display: flex;
          min-height: 92px;
          align-items: flex-start;
          font-size: clamp(24px, 4.1vw, 40px);
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: ${"`"}var(--jott-text-muted)${"`"};
        }

        .jott-caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          margin-left: 4px;
          opacity: 0;
          background: rgba(244, 246, 248, 0.7);
        }

        .jott-caret.visible {
          opacity: 1;
          animation: jott-blink 1s steps(1) infinite;
        }

        .jott-tool-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 18px;
        }

        .jott-tool-btn {
          display: inline-flex;
          height: 72px;
          width: 72px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
        }

        .jott-tool-btn svg {
          width: 28px;
          height: 28px;
        }

        .jott-tool-wide {
          width: 94px;
          border-radius: 999px;
        }

        .jott-copy {
          display: flex;
          width: min(740px, 100%);
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .jott-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          color: var(--jott-copy);
          font-family: "IBM Plex Serif", Georgia, serif;
          font-size: 22px;
          font-weight: 500;
        }

        .jott-brand-mark {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          overflow: hidden;
        }

        .jott-brand-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jott-copy h1 {
          margin: 0;
          max-width: 12ch;
          color: var(--jott-copy);
          font-family: "IBM Plex Serif", Georgia, serif;
          font-size: clamp(42px, 8vw, 72px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .jott-lede {
          max-width: 620px;
          margin: 18px 0 0;
          color: var(--jott-copy-soft);
          font-size: clamp(16px, 2.1vw, 21px);
          line-height: 1.58;
        }

        .jott-copy-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 28px;
        }

        .jott-primary-btn,
        .jott-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          border-radius: 999px;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        .jott-primary-btn {
          border: 1px solid rgba(22, 34, 48, 0.15);
          background: rgba(25, 36, 49, 0.96);
          color: #edf2f5;
        }

        .jott-secondary-btn {
          background: rgba(255, 255, 255, 0.38);
          border-color: rgba(22, 34, 48, 0.08);
          color: var(--jott-copy);
        }

        .jott-control-icon {
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .jott-control-icon svg {
          width: 16px;
          height: 16px;
        }

        .jott-meta {
          margin: 16px 0 0;
          color: rgba(30, 42, 54, 0.58);
          font-family: "IBM Plex Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        @keyframes jott-blink {
          50% {
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .jott-stage {
            border-radius: 28px;
          }

          .jott-hero {
            gap: 34px;
            padding: 100px 18px 56px;
          }

          .jott-input-panel {
            min-height: 154px;
            padding: 28px 18px 22px;
            border-radius: 0 0 28px 28px;
          }

          .jott-tool-btn {
            width: 66px;
            height: 66px;
          }

          .jott-tool-wide {
            width: 86px;
          }
        }

        @media (max-width: 640px) {
          .jott-shell {
            padding: 10px;
          }

          .jott-stage {
            min-height: calc(100vh - 20px);
            border-radius: 24px;
          }

          .jott-notch {
            width: 186px;
            height: 30px;
            border-radius: 0 0 18px 18px;
          }

          .jott-notch-camera {
            width: 54px;
            height: 8px;
          }

          .jott-hero {
            min-height: calc(100vh - 20px);
            justify-content: flex-start;
            gap: 28px;
            padding: 86px 14px 38px;
          }

          .jott-demo-top {
            margin-bottom: 10px;
          }

          .jott-circle-btn,
          .jott-pill-btn {
            height: 38px;
          }

          .jott-pill-btn {
            padding: 0 14px;
            font-size: 13px;
          }

          .jott-input-panel {
            min-height: 126px;
            padding: 22px 16px 18px;
            border-radius: 0 0 24px 24px;
          }

          .jott-input-text {
            min-height: 72px;
          }

          .jott-tool-row {
            margin-top: 14px;
            gap: 12px;
          }

          .jott-tool-btn {
            width: 58px;
            height: 58px;
          }

          .jott-tool-wide {
            width: 78px;
          }

          .jott-copy-actions {
            width: 100%;
            flex-direction: column;
          }

          .jott-primary-btn,
          .jott-secondary-btn {
            width: 100%;
          }

          .jott-meta {
            line-height: 1.5;
          }
        }
      `}</style>
    </div>
  );
}
