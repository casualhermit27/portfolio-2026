"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CAPABILITIES = [
    {
        category: "Archive / Compression",
        items: ["zip ↔ folder", "7z ↔ folder", "rar → folder", "tar.gz ↔ folder"]
    },
    {
        category: "PDF (qpdf)",
        items: ["split pages", "merge PDFs", "compress PDF", "decrypt PDF"]
    },
    {
        category: "Document (pandoc)",
        items: ["markdown → docx", "markdown → pdf", "docx → markdown", "html → docx"]
    },
    {
        category: "Image (vips)",
        items: ["jpg → png", "png → webp", "heic → jpg", "resize image"]
    },
    {
        category: "System (macOS)",
        items: ["rtf → docx", "docx → txt", "sips image ops"]
    },
    {
        category: "Data (Implemented)",
        items: ["CSV ↔ JSON", "CSV ↔ Excel", "JSON ↔ Excel"]
    }
];

export default function CapabilitiesHover() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <motion.span
                className="cursor-help text-[11px] font-medium uppercase tracking-[0.1em] border rounded-full px-2.5 py-1 transition-colors duration-200"
                style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    background: isOpen ? "var(--pill-bg)" : "transparent"
                }}
                animate={{ scale: isOpen ? 1.05 : 1 }}
            >
                Supported Routes
            </motion.span>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.98 }}
                            className="absolute z-[100] left-1/2 -translate-x-1/2 top-full mt-3 w-[calc(100vw-40px)] sm:w-[440px] p-5 sm:p-7 rounded-[24px] border shadow-2xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--bg)",
                                borderColor: "var(--border-active)",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
                            }}
                        >
                            {/* Subtle gradient background */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ background: "linear-gradient(135deg, var(--text-primary), transparent)" }}
                            />

                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                                {CAPABILITIES.map((cat) => (
                                    <div key={cat.category}>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-2 opacity-40">
                                            {cat.category}
                                        </p>
                                        <ul className="space-y-1">
                                            {cat.items.map((item) => (
                                                <li key={item} className="text-[12px] font-light leading-tight flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                                                    <span className="w-1 h-1 rounded-full opacity-20" style={{ background: "currentColor" }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
