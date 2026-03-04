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
      logoSrc="/logos/can 2.jpg"
      screens={[]}
      bullets={[
        "Drag in files and convert in one clean flow",
        "Optimized for repetitive desktop workflows on macOS",
        "Fast local processing with a distraction-free interface",
        "Launch details and release build coming soon",
      ]}
    />
  );
}
