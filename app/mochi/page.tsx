import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "mochi",
  description: "mochi by Harsha Chaganti",
  icons: {
    icon: "/favicons/mochi-rounded.png",
    shortcut: "/favicons/mochi-rounded.png",
    apple: "/favicons/mochi-rounded.png",
  },
};

export default function MochiPage() {
  return (
    <SubdomainLanding
      name="mochi"
      platform="iOS"
      tagline="Mindful spending, without the noise."
      description="A quiet, mindful way to track spending, check patterns, and reflect on habits."
      logoSrc="/logos/mochi.jpg.jpeg"
      screens={[
        "/open-log-close-screen1 (1).png",
        "/reflection-screen2 (1).png",
        "/ocr-screen3.png",
        "/history-screen3 (1).png",
        "/widget-screen4 (1).png",
      ]}
      bullets={[
        "Log expenses in **under two taps** with a calm daily flow",
        "Timeline and reflection views reveal **patterns over time**",
        "**Widget-first** reminders keep the habit visible each day",
        "Minimal interface designed for **clarity**, not noise",
        "Thoughtful weekly history makes **trends easy to notice**",
        "**Private by default** with a focused single-user experience",
        "Built to feel **light and fast** across everyday iPhone use",
      ]}
      latestDate="March 14, 2026"
      latestDateIso="2026-03-14"
      changelogTitle="Changelog"
      changelogSubtitle="New in this release"
      changelog={[
        {
          title: "Speed Dial Payment Types",
          body: "Assign specific payment methods to speed dial presets. Long press a number in Settings > Speed Dial to edit.",
        },
        {
          title: "Purple Theme",
          body: "A new purple theme is now available in Themes.",
        },
        {
          title: "Receipt Scanning",
          body: "Effortlessly add transactions by scanning receipts directly from the Keypad.",
        },
        {
          title: "Payment Method Icons",
          body: "See exactly how you paid with visual indicators in History.",
        },
      ]}
      ctaUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      ctaLabel="Download"
      ctaHint="Available on the App Store"
      noCard
    />
  );
}
