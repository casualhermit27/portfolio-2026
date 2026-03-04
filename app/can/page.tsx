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
      description="A minimal desktop utility to convert files and formats instantly."
      logoSrc="/logos/can 2.jpg"
      screens={[]}
      bullets={[
        "Drop files and convert in **one clean flow**",
        "Built for **repeat desktop workflows** with almost zero setup",
        "**Local-first processing** for speed and privacy",
        "Native macOS interactions with **keyboard-friendly controls**",
        "Keeps your desk workflow fast without opening **heavy tools**",
        "Built to feel lightweight while handling **practical conversions**",
        "Ready for power users who want **speed with simplicity**",
      ]}
    />
  );
}
