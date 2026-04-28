"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEMO_TEXT = "What's on your mind?";

const spring = { type: "spring" as const, stiffness: 340, damping: 28, mass: 0.8 };
const springFast = { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.6 };

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

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring } },
};

export default function JottLanding() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [keysPressed, setKeysPressed] = useState(false);
  const [typedText, setTypedText] = useState("");
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

  // Typing animation
  useEffect(() => {
    if (typeTimer.current) clearTimeout(typeTimer.current);
    if (!popoverOpen) { setTypedText(""); return; }
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

          {/* grain overlay */}
          <div className="jott-grain" aria-hidden />

          {/* popover — Framer Motion */}
          <AnimatePresence>
            {popoverOpen && (
              <motion.div
                className="jott-popover-wrap"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
              >
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
                    <span className="jott-cursor" aria-hidden />
                  </div>
                </div>
                <div className="jott-floating-actions">
                  <motion.button
                    type="button"
                    className="jott-tool-pill jott-tool-pill-text"
                    aria-label="Text tools"
                    whileHover={{ scale: 1.08, backgroundColor: "#1e1e22" }}
                    whileTap={{ scale: 0.93 }}
                    transition={springFast}
                  >
                    <span>Aa</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    className="jott-tool-pill"
                    aria-label="Voice note"
                    whileHover={{ scale: 1.08, backgroundColor: "#1e1e22" }}
                    whileTap={{ scale: 0.93 }}
                    transition={springFast}
                  >
                    <MicIcon />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* hero */}
          <motion.div
            className="jott-main"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            {/* floating logo */}
            <motion.div
              className="jott-icon"
              variants={heroItem}
              animate={{
                y: [0, -7, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/jott.png" alt="Jott icon" />
            </motion.div>

            <motion.p className="jott-label" variants={heroItem}>jott</motion.p>

            <motion.h1 variants={heroItem}>
              Capture a <em>thought.</em>
            </motion.h1>

            <motion.p className="jott-lede" variants={heroItem}>
              One keystroke. Nothing in your way.
            </motion.p>

            <motion.div className="jott-ctas" variants={heroItem}>
              <motion.button
                type="button"
                className="jott-btn jott-btn-primary"
                disabled
                whileHover={{
                  scale: 1.04,
                  y: -3,
                  boxShadow: "0 10px 32px rgba(100, 80, 200, 0.38)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
              >
                <span className="jott-brew-dot" aria-hidden />
                Brewing
              </motion.button>

              <motion.button
                type="button"
                className="jott-btn jott-btn-secondary"
                disabled
                whileHover={{ scale: 1.03, y: -2, backgroundColor: "#f7f7f7" }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                Mac App Store · soon
              </motion.button>
            </motion.div>

            <motion.div className="jott-meta" variants={heroItem}>
              macOS 13+ · Apple silicon &amp; Intel
            </motion.div>
          </motion.div>

          {/* keycap hint */}
          <AnimatePresence>
            {cueVisible && (
              <motion.button
                type="button"
                className="jott-trigger"
                onClick={playDemo}
                aria-label="See double-Option shortcut demo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥ option</span>
                <span className={`jott-keycap${keysPressed ? " press" : ""}`}>⌥ option</span>
              </motion.button>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
