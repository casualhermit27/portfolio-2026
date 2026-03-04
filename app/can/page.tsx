import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "can",
  description: "can by Harsha Chaganti",
};

export default function CanPage() {
  return (
    <SubdomainLanding
      name="can"
      platform="macOS"
      description="A minimal desktop utility to convert files and formats instantly."
      status="Coming soon"
      logoSrc="/logos/can 2.jpg"
      heroImageSrc="/logos/can 2.jpg"
      bullets={[
        "Drag, drop, and convert with zero friction",
        "Fast local processing with a minimal interface",
        "Designed for repeat workflows on macOS",
        "Public release details coming soon",
      ]}
    />
  );
}
