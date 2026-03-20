"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  {
    title: "Images",
    items: [
      "jpeg → png · heic · webp · avif · pdf",
      "png → jpeg · heic · webp · avif · pdf",
      "heic → jpeg · png · webp · avif",
      "webp → jpeg · png · heic · avif",
      "avif → jpeg · png · heic · webp",
    ],
  },
  {
    title: "Documents",
    items: [
      "pdf → txt · rtf · html · jpeg · png",
      "docx → rtf · txt · html",
      "rtf → docx · txt · html",
      "txt → docx · rtf · html",
      "html → docx · rtf · txt",
    ],
  },
  {
    title: "Data",
    items: [
      "csv → json · xlsx",
      "json → csv · xlsx · xml · yaml",
      "xlsx → csv · json",
      "xml → json · yaml",
      "yaml → json · xml",
    ],
  },
  {
    title: "Archives",
    items: [
      "zip · 7z · tar.gz · rar → extract",
      "any → zip · 7z · tar.gz",
    ],
  },
  {
    title: "PDF Tools",
    items: [
      "merge",
      "split",
      "encrypt · decrypt",
      "optimize",
      "export → jpeg · png pages",
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

function RouteItem({ item, accentColor }: { item: string; accentColor: string }) {
  const arrowIdx = item.indexOf(" → ");
  if (arrowIdx === -1) {
    return (
      <li className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {item}
      </li>
    );
  }
  const from = item.slice(0, arrowIdx);
  const to = item.slice(arrowIdx + 3);
  return (
    <li className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      <span className="font-semibold" style={{ color: accentColor }}>{from}</span>
      <span style={{ color: "var(--text-muted)" }}> → </span>
      {to}
    </li>
  );
}

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
        className="group flex items-center gap-2 px-1.5 py-0.5 rounded-[6px] text-[13px] sm:text-[14px] font-medium transition-all duration-200 border"
        style={{
          background: bg,
          color: color,
          borderColor: isOpen ? border : "transparent",
        }}
      >
        <span>View all supported routes</span>
        <motion.span
          animate={{ x: isOpen ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="text-[11px] opacity-60"
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
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-[calc(100vw-48px)] sm:w-[600px] p-6 rounded-[28px] border"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border-active)",
              boxShadow: "0 30px 60px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-active)" }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 text-left">
              {CATEGORIES.map((cat) => (
                <div key={cat.title}>
                  <h4
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-3"
                    style={{ color, opacity: 0.65 }}
                  >
                    {cat.title}
                  </h4>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <RouteItem key={item} item={item} accentColor={color} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
