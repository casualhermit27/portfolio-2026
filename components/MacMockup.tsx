type MacMockupProps = {
  src?: string;
  alt?: string;
  empty?: boolean;
};

export default function MacMockup({ src, alt, empty = false }: MacMockupProps) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-[10px] overflow-hidden border transition-transform duration-300 ease-out hover:-translate-y-1.5 ${
        empty
          ? "border-[#D8D2CA] bg-[#F2EFE9]"
          : "border-[#2A2A2A] bg-[#1A1A1A]"
      }`}
      style={{ width: "380px", height: "240px" }}
    >
      {/* Title bar */}
      <div
        className={`flex items-center px-3 border-b ${
          empty
            ? "bg-[#EAE6E0] border-[#D8D2CA]"
            : "bg-[#2A2A2A] border-[#3A3A3A]"
        }`}
        style={{ height: "28px" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[6px]">
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "#D8D2CA" : "#FF5F57",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "#D8D2CA" : "#FEBC2E",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: empty ? "#D8D2CA" : "#28C840",
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
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#C4BDB5]">
            soon
          </span>
        </div>
      )}
    </div>
  );
}
