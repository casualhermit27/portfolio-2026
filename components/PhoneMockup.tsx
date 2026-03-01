type PhoneMockupProps = {
  src?: string;
  alt?: string;
  empty?: boolean;
};

export default function PhoneMockup({ src, alt, empty = false }: PhoneMockupProps) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden border transition-transform duration-300 ease-out hover:-translate-y-1.5
        w-[150px] h-[325px] rounded-[24px]
        sm:w-[170px] sm:h-[368px] sm:rounded-[28px]
        md:w-[200px] md:h-[433px] md:rounded-[32px]
        lg:w-[230px] lg:h-[498px] lg:rounded-[36px]
        xl:w-[260px] xl:h-[563px] xl:rounded-[40px]`}
      style={{
        borderColor: empty ? "var(--logo-border-empty)" : "#2A2A2A",
        background: empty ? "var(--logo-bg-empty)" : "#0A0A0A",
      }}
    >
      {/* Screen content */}
      {!empty && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || "App screen"}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-end pb-9">
          <span
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            soon
          </span>
        </div>
      )}
    </div>
  );
}
