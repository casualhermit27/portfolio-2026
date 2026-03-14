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
      latestDate="March 14, 2026"
      latestDateIso="2026-03-14"
      ctaUrl="#newsletter"
      ctaLabel="Join waitlist"
      ctaHint="We will email you when the build is ready."
      newsletterTitle="Join the can waitlist"
      newsletterBody="Be first to know when the macOS build is ready."
      newsletterCtaLabel="Join waitlist"
      newsletterSuccess="Thanks. You are on the early list."
    />
  );
}
