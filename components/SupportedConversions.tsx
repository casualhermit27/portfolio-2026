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
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="group flex items-center gap-2 text-[13px] sm:text-[14px] font-light transition-all duration-200"
                style={{ color: 'var(--text-primary)' }}
            >
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-30">
                    Conversions
                </span>
                <span className="relative py-0.5">
                    View all supported routes
                    <motion.span
                        className="absolute bottom-0 left-0 w-full h-[1px] opacity-20"
                        style={{ background: 'currentColor' }}
                        initial={{ scaleX: 0.4, opacity: 0.1 }}
                        animate={{ scaleX: isOpen ? 1 : 0.4, opacity: isOpen ? 0.3 : 0.1 }}
                    />
                </span>
                <motion.span
                    animate={{ y: isOpen ? 1 : 0, opacity: isOpen ? 0.6 : 0.2 }}
                    className="text-[10px]"
                >
                    ↓
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-[calc(100vw-48px)] sm:w-[520px] p-7 rounded-[28px] border shadow-2xl backdrop-blur-3xl"
                        style={{
                            backgroundColor: 'var(--bg)',
                            borderColor: 'var(--border-active)',
                            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)'
                        }}
                    >
                        {/* Decorative pointer */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
                            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-active)' }} />

                        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
                            {CATEGORIES.map((cat) => (
                                <div key={cat.title}>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3 opacity-30" style={{ color: 'var(--text-primary)' }}>
                                        {cat.title}
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {cat.items.map((item) => (
                                            <li key={item} className="text-[11px] font-light opacity-60 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                                <span className="w-0.5 h-0.5 rounded-full bg-current opacity-20" />
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
