type SubdomainLandingProps = {
  name: string;
  description: string;
  platform: "iOS" | "macOS";
  status: string;
  logoSrc: string;
  storeUrl?: string;
  storeLabel?: string;
};

export default function SubdomainLanding({
  name,
  description,
  platform,
  status,
  logoSrc,
  storeUrl,
  storeLabel = "View on App Store",
}: SubdomainLandingProps) {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-8 sm:px-16 md:px-24 lg:px-32">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto h-16 w-16 overflow-hidden rounded-[18px] border border-[#ECECEC]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={`${name} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9A9A9A]">
            {platform}
          </p>
          <h1 className="mt-3 text-[56px] leading-none font-light tracking-[-0.04em] lowercase sm:text-[72px]">
            {name}
          </h1>
          <p className="mt-5 text-[13px] font-light tracking-[0.02em] text-[#6E6E6E] sm:text-[14px]">
            {description}
          </p>
          {storeUrl ? (
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center text-[11px] font-medium tracking-[0.04em] text-[#5F5F5F] underline decoration-[#BEBEBE] underline-offset-4 transition-colors duration-150 hover:text-[#2F2F2F]"
            >
              {storeLabel}
            </a>
          ) : (
            <p className="mt-6 text-[11px] tracking-[0.04em] text-[#A8A8A8]">
              Store link coming soon
            </p>
          )}
          <p className="mt-8 text-[10px] uppercase tracking-[0.14em] text-[#B0B0B0]">
            {status}
          </p>
        </div>
      </section>
    </main>
  );
}
