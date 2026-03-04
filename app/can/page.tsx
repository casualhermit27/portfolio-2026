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
      tagline="Convert anything now."
      status="Coming soon"
    />
  );
}
