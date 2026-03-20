"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ROUTES = [
  {
    category: "Images",
    rows: [
      { from: "jpeg", to: ["png", "heic", "webp", "avif", "pdf", "zip"] },
      { from: "png",  to: ["jpeg", "heic", "webp", "avif", "pdf", "zip"] },
      { from: "heic", to: ["jpeg", "png", "webp", "avif", "pdf"] },
      { from: "webp", to: ["jpeg", "png", "heic", "avif", "pdf"] },
      { from: "avif", to: ["jpeg", "png", "heic", "webp", "pdf"] },
    ],
  },
  {
    category: "Documents",
    rows: [
      { from: "pdf",  to: ["txt", "rtf", "html", "jpeg", "png"] },
      { from: "docx", to: ["rtf", "txt", "html"] },
      { from: "rtf",  to: ["docx", "txt", "html"] },
      { from: "txt",  to: ["docx", "rtf", "html"] },
      { from: "html", to: ["docx", "rtf", "txt"] },
    ],
  },
  {
    category: "Data",
    rows: [
      { from: "csv",  to: ["json", "xlsx"] },
      { from: "json", to: ["csv", "xlsx", "xml", "yaml"] },
      { from: "xlsx", to: ["csv", "json"] },
      { from: "xml",  to: ["json", "yaml"] },
      { from: "yaml", to: ["json", "xml"] },
    ],
  },
  {
    category: "Archives",
    rows: [
      { from: "zip / 7z / rar", to: ["extract", "zip", "7z", "tar.gz"] },
    ],
  },
  {
    category: "PDF Tools",
    rows: [
      { from: "pdf", to: ["merge", "split", "encrypt", "decrypt", "optimize"] },
      { from: "pages", to: ["jpeg", "png"] },
    ],
  },
];

type SupportedConversionsProps = {
  accent?: {
    highlightBg: string;
    highlightText: string;
    buttonBorder?: string;
  };
};

export default function SupportedConversions({ accent }: SupportedConversionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const bg = accent?.highlightBg || "#D5E6FB";
  const color = accent?.highlightText || "#3F5574";
  const border = accent?.buttonBorder || "#C1D7F4";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-200 border"
        style={{
          background: isOpen ? bg : "transparent",
          color: color,
          borderColor: border,
          borderStyle: "dashed",
        }}
      >
        <motion.span
          animate={{ opacity: isOpen ? 0 : [0.4, 1, 0.4] }}
          transition={isOpen ? { duration: 0.15 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        <span>View supported formats</span>
        <motion.span
          animate={isOpen ? { x: 3, opacity: 1 } : { x: [0, 3, 0], opacity: 0.5 }}
          transition={isOpen ? { type: "spring", stiffness: 400, damping: 25 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[12px]"
        >
          →
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-[calc(100vw-48px)] sm:w-[420px] rounded-[20px] border overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border-active)",
              boxShadow: "0 30px 60px -12px rgba(0,0,0,0.22)",
            }}
          >
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-active)" }}
            />

            <div className="p-5 space-y-4">
              {ROUTES.map((section) => (
                <div key={section.category}>
                  <p className="text-[9px] uppercase tracking-[0.14em] mb-2" style={{ color, opacity: 0.5 }}>
                    {section.category}
                  </p>
                  <div className="space-y-1">
                    {section.rows.map((row) => (
                      <div key={row.from} className="grid items-baseline gap-2" style={{ gridTemplateColumns: "64px 10px 1fr" }}>
                        <span className="font-mono text-[11px] font-medium" style={{ color }}>
                          {row.from}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>→</span>
                        <span className="font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>
                          {row.to.join(" · ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
