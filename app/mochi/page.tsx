import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "mochi",
  description: "mochi by Harsha Chaganti",
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
        "Fast, low-friction logging built for daily consistency",
        "Reflection and history that reveal spending patterns over time",
        "Home screen widgets that keep your habit visible",
        "Purposefully minimal iOS experience with no visual noise",
      ]}
      ctaUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      ctaLabel="Download"
      ctaHint="Available on the App Store"
    />
  );
}
