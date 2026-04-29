"use client";

import type { App } from "@/app/page";

type SidebarProps = {
  apps: App[];
  activeApp: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ apps, activeApp, onSelect }: SidebarProps) {
  return (
    <aside className="w-56 flex-shrink-0 h-screen flex flex-col border-r border-[#E2DDD5] bg-[#F8F6F2] overflow-hidden">

      {/* Identity */}
      <div className="px-6 pt-10 pb-7">
        <p className="text-[13px] font-medium text-[#1C1C1C] tracking-tight leading-snug">
          Harsha Chaganti
        </p>
        <p className="text-[11px] text-[#A09A93] mt-0.5 tracking-wide">
          macOS & iOS Developer
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E2DDD5]" />

      {/* Apps nav */}
      <div className="flex-1 pt-5 overflow-y-auto">
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8B1A9] px-6 mb-1.5">
          Apps
        </p>

        <nav className="flex flex-col">
          {apps.map((app) => {
            const isActive = app.id === activeApp;
            return (
              <button
                key={app.id}
                onClick={() => onSelect(app.id)}
                className={`group w-full flex items-center gap-3 pl-5 pr-5 py-2.5 text-left border-l-[2.5px] transition-colors duration-150 ${
                  isActive
                    ? "border-l-[#A89F93] bg-[#EEEAE4] text-[#1C1C1C]"
                    : "border-l-transparent text-[#9A9590] hover:bg-[#F1EDE7] hover:text-[#1C1C1C] hover:border-l-[#D4CFC7]"
                }`}
              >
                {/* App icon */}
                <div
                  className={`w-[30px] h-[30px] rounded-[8px] overflow-hidden flex-shrink-0 border ${
                    isActive ? "border-[#D4CFC7]" : "border-[#E2DDD5]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <span className={`text-[13px] ${isActive ? "font-medium" : "font-normal"}`}>
                  {app.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E2DDD5] px-6 py-5">
        <p className="text-[10px] text-[#C0BAB0] tracking-wide">
          © 2026 Harsha Chaganti
        </p>
      </div>
    </aside>
  );
}
