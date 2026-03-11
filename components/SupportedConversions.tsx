"use client";

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
        items: ["md → docx", "md → pdf", "docx → md", "html → docx"]
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
    return (
        <div className="w-full mt-16 sm:mt-24 md:mt-32 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-12 text-center opacity-40 font-bold" style={{ color: 'var(--text-primary)' }}>
                Supported Conversions
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
                {CATEGORIES.map((cat) => (
                    <div key={cat.title} className="flex flex-col items-start">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.12em] mb-4 opacity-30" style={{ color: 'var(--text-primary)' }}>
                            {cat.title}
                        </h4>
                        <ul className="space-y-2">
                            {cat.items.map((item) => (
                                <li key={item} className="text-[11px] leading-tight font-light transition-opacity duration-200 hover:opacity-100 opacity-60" style={{ color: "var(--text-primary)" }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
