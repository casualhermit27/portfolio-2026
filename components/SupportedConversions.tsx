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
        <div className="relative inline-block align-middle">
            <motion.button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200"
                style={{
                    borderColor: 'var(--border)',
                    background: isOpen ? 'var(--pill-bg)' : 'transparent',
                    color: 'var(--text-muted)'
                }}
                whileHover={{ borderColor: 'var(--border-active)', color: 'var(--text-secondary)' }}
            >
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">
                    Routes
                </span>
                <span className={`text-[8px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ↓
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 z-[100] w-[calc(100vw-48px)] sm:w-[480px] p-6 rounded-[24px] border shadow-2xl backdrop-blur-2xl"
                        style={{
                            backgroundColor: 'var(--bg)',
                            borderColor: 'var(--border-active)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)'
                        }}
                    >
                        {/* Decorative pointer */}
                        <div className="absolute -top-1.5 right-6 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rotate-45 border-l border-t"
                            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border-active)' }} />

                        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8">
                            {CATEGORIES.map((cat) => (
                                <div key={cat.title}>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2 opacity-30" style={{ color: 'var(--text-primary)' }}>
                                        {cat.title}
                                    </h4>
                                    <ul className="space-y-1">
                                        {cat.items.map((item) => (
                                            <li key={item} className="text-[11px] font-light opacity-60 flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
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
