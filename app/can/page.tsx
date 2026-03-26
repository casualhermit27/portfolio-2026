import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "can",
  description: "can by Harsha Chaganti",
  icons: {
    icon: "/favicons/can-rounded.png",
    shortcut: "/favicons/can-rounded.png",
    apple: "/favicons/can-rounded.png",
  },
};

export default function CanPage() {
  return (
    <SubdomainLanding
      name="can"
      platform="macOS"
      tagline="Instant file conversions without heavy tools."
      description="A minimal desktop utility to convert files and formats instantly."
      logoSrc="/logos/can 2.jpg"
      screens={["/dragdrop.png"]}
      screenAspect="portrait"
      bullets={[
        "Drop files and convert in **one clean flow**",
        "**PDF Tools** — merge, split, encrypt, decrypt, and optimize. Export pages as **JPEG or PNG**. No Acrobat needed.",
        "Drop on the **dock icon** — converts instantly in the background with a **notification when done**",
        "**Batch-ready** — drop 20 files, override formats per file, convert everything at once",
        "**Local-first processing** for speed and privacy",
        "Native macOS interactions with **keyboard-friendly controls**",
        "Ready for power users who want **speed with simplicity**",
      ]}
      latestDate="March 14, 2026"
      latestDateIso="2026-03-14"
      comingSoonLabel="Brewing now"
      ctaHint="A small macOS tool, nearly ready to pour."
      noCard
    />
  );
}
