type SubdomainLandingProps = {
  name: string;
  tagline: string;
  platform: "iOS" | "macOS";
  status: string;
};

export default function SubdomainLanding({
  name,
  tagline,
  platform,
  status,
}: SubdomainLandingProps) {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-8 sm:px-16 md:px-24 lg:px-32">
        <div className="w-full max-w-xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9A9A9A]">
            {platform}
          </p>
          <h1 className="mt-3 text-[56px] leading-none font-light tracking-[-0.04em] lowercase sm:text-[72px]">
            {name}
          </h1>
          <p className="mt-5 text-[13px] font-light tracking-[0.02em] text-[#6E6E6E] sm:text-[14px]">
            {tagline}
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.14em] text-[#B0B0B0]">
            {status}
          </p>
        </div>
      </section>
    </main>
  );
}
