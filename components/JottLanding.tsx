"use client";

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

export default function JottLanding() {
  return (
    <div className="jott-root">
      <main className="jott-bezel">
        <section className="jott-screen">
          <div className="jott-notch" />

          <div className="jott-popover">
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
        </section>
      </main>
    </div>
  );
}
