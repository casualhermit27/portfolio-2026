import type { Metadata } from "next";

const LAST_UPDATED = "March 5, 2026";

const sections = [
  {
    title: "1. Data Collection",
    body: "Can does not collect, analyze, or harvest any of your personal data. We have no access to your files, conversions, or notes.",
  },
  {
    title: "2. Accounts",
    body: "No account creation, sign-up, or login is required. You can use all features of the app immediately without providing an email or phone number.",
  },
  {
    title: "3. Data Storage",
    body: "All your data is stored locally on your device. If you have iCloud enabled, your data can securely sync across your devices via Apple's CloudKit. We do not maintain external servers for your data.",
  },
  {
    title: "4. Tracking & Ads",
    body: "Can is free from advertisements, third-party trackers, and analytics software. Your usage is never monitored or profiled.",
  },
  {
    title: "5. Data Sharing",
    body: "We do not sell, rent, or share your data with third parties. Your files and workflow remain strictly on your device and your personal iCloud account.",
  },
  {
    title: "6. Third-Party Services",
    body: "Can relies exclusively on Apple system services (such as iCloud) to function. Use of these services is subject to Apple's privacy policy.",
  },
  {
    title: "7. Contact",
    body: "For support, please contact us within the app via Settings -> Feedback -> Send suggestions/feedback.",
  },
];

export const metadata: Metadata = {
  title: "can privacy policy",
  description: "Privacy policy for can by Harsha Chaganti",
  icons: {
    icon: "/favicons/can-rounded.png",
    shortcut: "/favicons/can-rounded.png",
    apple: "/favicons/can-rounded.png",
  },
};

export default function CanPrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8">
      <section
        className="w-full max-w-[640px] rounded-[14px] border px-6 py-8 sm:px-10 sm:py-10"
        style={{ borderColor: "var(--border)", background: "var(--bg-sticky)" }}
      >
        <div className="text-center">
          <div
            className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-[20px] border"
            style={{ borderColor: "var(--border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/can 2.jpg" alt="Can App Logo" className="h-full w-full object-cover" />
          </div>

          <h1 className="text-[30px] font-semibold tracking-[-0.02em]">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-[500px] text-[17px]" style={{ color: "var(--text-secondary)" }}>
            Can is a privacy-first converter. Your files and personal data are yours alone.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: "var(--text-muted)" }}
              >
                {section.title}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6]">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>
    </main>
  );
}
