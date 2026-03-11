"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
    {
        title: "Archive",
        items: ["zip ↔ folder", "7z ↔ folder", "rar → folder", "tar.gz ↔ folder"]
    },
    {
        title: "PDF Ops",
        items: ["split pages", "merge pdfs", "compress", "decrypt"]
    },
    {
        title: "Document",
        items: ["md → docx", "md → html", "docx → md", "html → docx"]
    },
    {
        title: "Image",
        items: ["jpg → png", "png → webp", "heic → jpg", "resize"]
    },
    {
        title: "System",
        items: ["rtf → docx", "docx → txt", "sips image ops"]
    },
    {
        title: "Data",
        items: ["csv ↔ json", "csv ↔ excel", "json ↔ excel"]
    }
];

export default function SupportedConversions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full flex flex-col items-center">
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                    borderColor: 'var(--border)',
                    background: 'var(--bg-sticky)',
                    color: 'var(--text-secondary)'
                }}
                aria-expanded={isOpen}
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                    Explore Supported Routes
                </span>
                <motion.span
                    animate={{ y: isOpen ? 1 : 0, rotate: isOpen ? 180 : 0 }}
                    className="text-[10px] opacity-40"
                >
                    ↓
                </motion.span>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
                    style={{ background: 'var(--pill-bg)' }} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute top-full mt-4 z-50 w-full max-w-4xl p-8 rounded-[32px] border shadow-2xl backdrop-blur-xl"
                        style={{
                            backgroundColor: 'var(--bg)',
                            borderColor: 'var(--border-active)',
                            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.2)'
                        }}
                    >
                        {/* Inner decorative gradient */}
                        <div className="absolute inset-0 rounded-[32px] opacity-[0.03] pointer-events-none"
                            style={{ background: 'radial-gradient(circle at top left, var(--text-primary), transparent 70%)' }} />

                        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
                            {CATEGORIES.map((cat) => (
                                <div key={cat.title} className="flex flex-col items-start translate-z-0">
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.12em] mb-4 opacity-30 px-1" style={{ color: 'var(--text-primary)' }}>
                                        {cat.title}
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {cat.items.map((item) => (
                                            <li key={item} className="text-[11px] leading-tight font-light opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap px-1" style={{ color: "var(--text-primary)" }}>
                                                {item}
                                            </li>
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
