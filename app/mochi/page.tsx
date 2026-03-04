import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "mochi",
  description: "mochi by Harsha Chaganti",
  icons: {
    icon: "/favicons/mochi-rounded.svg",
    shortcut: "/favicons/mochi-rounded.svg",
    apple: "/favicons/mochi-rounded.svg",
  },
};

export default function MochiPage() {
  return (
    <SubdomainLanding
      name="mochi"
      platform="iOS"
      description="A quiet, mindful way to track spending, check patterns, and reflect on habits."
      logoSrc="/logos/mochi.jpg.jpeg"
      screens={[
        "/open-log-close-screen1 (1).png",
        "/reflection-screen2 (1).png",
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
      ctaUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      ctaLabel="Download"
      ctaHint="Available on the App Store"
    />
  );
}
