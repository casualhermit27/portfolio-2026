type SubdomainLandingProps = {
  name: string;
  description: string;
  platform: "iOS" | "macOS";
  status: string;
  logoSrc: string;
  heroImageSrc: string;
  galleryImages?: string[];
  bullets: string[];
  ctaUrl?: string;
  ctaLabel?: string;
  ctaHint?: string;
};

export default function SubdomainLanding({
  name,
  description,
  platform,
  status,
  logoSrc,
  heroImageSrc,
  galleryImages = [],
  bullets,
  ctaUrl,
  ctaLabel = "View on App Store",
  ctaHint,
}: SubdomainLandingProps) {
  return (
    <main className="min-h-screen bg-[#060606] text-[#ECECEC]">
      <section className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="w-full">
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <div className="h-12 w-12 overflow-hidden rounded-[13px] border border-[#2A2A2A] bg-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={`${name} logo`} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9B9B9B]">
                {platform}
              </p>
              <h1 className="text-[30px] font-semibold leading-none tracking-[-0.02em] lowercase text-[#F3F3F3] sm:text-[36px]">
                {name}
              </h1>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-[#1D1D1D] bg-gradient-to-b from-[#141A24] to-[#0B1018] p-4 sm:p-6">
            <div className="absolute -right-14 -top-10 h-48 w-48 rounded-full bg-[#8FB8FF1F] blur-3xl" />
            <div className="absolute -left-16 -bottom-10 h-56 w-56 rounded-full bg-[#A6D8FF1A] blur-3xl" />
            <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[16px] border border-[#2A2A2A] bg-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageSrc}
                alt={`${name} hero`}
                className="h-[260px] w-full object-cover sm:h-[360px]"
              />
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {galleryImages.map((imageSrc) => (
                <div
                  key={imageSrc}
                  className="overflow-hidden rounded-[12px] border border-[#202020] bg-[#0F0F0F]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={`${name} preview`}
                    className="h-[90px] w-full object-cover sm:h-[120px]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 max-w-2xl space-y-4 sm:mt-10">
            <p className="text-[14px] leading-relaxed text-[#CDCDCD]">
              {description}
            </p>
            <ul className="space-y-2">
              {bullets.map((item) => (
                <li key={item} className="text-[15px] leading-relaxed text-[#C5C5C5]">
                  <span className="mr-2 text-[#8D8D8D]">-</span>
                  {item}
                </li>
              ))}
            </ul>

            {ctaUrl ? (
              <div className="pt-2">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[12px] border border-[#E8E8E8] bg-[#F0F0F0] px-5 py-3 text-[20px] font-semibold leading-none tracking-[-0.01em] text-[#121212] transition-transform duration-150 hover:scale-[1.01] active:scale-[0.985]"
                >
                  {ctaLabel}
                </a>
                {ctaHint && (
                  <p className="mt-3 text-[13px] text-[#8E8E8E]">
                    {ctaHint}
                  </p>
                )}
              </div>
            ) : (
              <p className="pt-2 text-[13px] text-[#8E8E8E]">Link coming soon</p>
            )}

            <p className="pt-2 text-[11px] uppercase tracking-[0.14em] text-[#8A8A8A]">
              {status}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
