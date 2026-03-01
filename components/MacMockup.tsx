type MacMockupProps = {
  src?: string;
  alt?: string;
  empty?: boolean;
};

export default function MacMockup({ src, alt, empty = false }: MacMockupProps) {
  return (
    <div
      className="relative flex-shrink-0 rounded-[10px] overflow-hidden border transition-transform duration-300 ease-out hover:-translate-y-1.5"
      style={{
        width: "clamp(300px, 48vw, 680px)",
        height: "clamp(190px, 30vw, 430px)",
        borderColor: empty ? "var(--logo-border-empty)" : "#2A2A2A",
        background: empty ? "var(--logo-bg-empty)" : "#1A1A1A",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 border-b"
        style={{
          height: "28px",
          background: empty ? "var(--logo-bg-empty)" : "#2A2A2A",
          borderColor: empty ? "var(--logo-border-empty)" : "#3A3A3A",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[6px]">
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "var(--logo-border-empty)" : "#FF5F57",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "var(--logo-border-empty)" : "#FEBC2E",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "var(--logo-border-empty)" : "#28C840",
            }}
          />
        </div>
      </div>

      {/* Screen content */}
      {!empty && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || "App screen"}
          className="w-full object-cover"
          style={{ height: "calc(100% - 28px)" }}
          draggable={false}
        />
      ) : (
        <div className="flex items-end justify-center pb-7" style={{ height: "calc(100% - 28px)" }}>
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
