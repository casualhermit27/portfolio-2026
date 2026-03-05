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
    <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10">
      <section
        className="mx-auto w-full max-w-[1060px] overflow-hidden rounded-[24px] border"
        style={{ borderColor: "var(--border)", background: "var(--bg-sticky)" }}
      >
        <div className="px-6 py-10 sm:px-10 sm:py-14 md:px-14">
          <div className="flex flex-col items-center">
            <div
              className="mb-4 h-14 w-14 overflow-hidden rounded-[15px] border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/can 2.jpg" alt="can app logo" className="h-full w-full object-cover" />
            </div>

            <div
              className="mb-8 flex h-[110px] w-[110px] items-center justify-center rounded-[20px] border"
              style={{ borderColor: "var(--border)", background: "var(--pill-bg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/can_mascot.png" alt="can mascot" className="h-[66px] w-[66px] object-contain" />
            </div>

            <h1 className="text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
              Privacy Policy
            </h1>
            <p
              className="mt-6 max-w-3xl text-center text-[29px] font-light leading-[1.25] sm:text-[34px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Can is a privacy-first converter. Your files and personal data are yours alone.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[900px] space-y-10 sm:mt-16 sm:space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-[15px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {section.title}
                </h2>
                <p className="mt-4 text-[28px] leading-[1.45] tracking-[-0.01em] sm:text-[33px]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className="relative mx-auto mt-14 max-w-[900px] border-t pt-8 sm:mt-16 sm:pt-10"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-center text-2xl sm:text-[30px]" style={{ color: "var(--text-secondary)" }}>
              Last updated: {LAST_UPDATED}
            </p>

            <div className="pointer-events-none absolute -bottom-12 right-2 hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/can_mascot.png" alt="" className="h-[160px] w-[160px] object-contain opacity-95" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
