type PhoneMockupProps = {
  src?: string;
  alt?: string;
  empty?: boolean;
};

export default function PhoneMockup({ src, alt, empty = false }: PhoneMockupProps) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-[36px] overflow-hidden border transition-transform duration-300 ease-out hover:-translate-y-1.5 ${
        empty
          ? "border-[#D8D2CA] bg-[#F2EFE9]"
          : "border-[#2A2A2A] bg-[#0A0A0A]"
      }`}
      style={{ width: "220px", height: "476px" }}
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
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#C4BDB5]">
            soon
          </span>
        </div>
      )}
    </div>
  );
}
