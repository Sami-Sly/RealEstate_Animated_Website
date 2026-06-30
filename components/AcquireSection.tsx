// components/AcquireSection.tsx
// SERVER COMPONENT — no "use client"

import Link from "next/dist/client/link";

export default function AcquireSection() {
  const guarantees = [
    { label: "Edition",    detail: "500 numbered pieces" },
    { label: "Delivery",   detail: "White-glove courier, 3–5 days" },
    { label: "Packaging",  detail: "Lacquered box, silk interior" },
    { label: "Returns",    detail: "14 days, unopened" },
  ];

  return (
    <section
      id="acquire"
      className="relative overflow-hidden py-20 md:py-32 lg:py-44"
      style={{ background: "#0B0906" }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 md:h-[600px] md:w-[1000px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center mb-20 md:px-10">

        {/* Eyebrow */}
        <p
          className="mb-6 text-[10px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#C9A84C" }}
        >
          Acquisition
        </p>

        {/* Headline */}
        <h2
          className="mb-7 text-[clamp(36px,6vw,80px)] font-light italic leading-[1.0]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(255,248,235,0.92)",
            letterSpacing: "-0.01em",
          }}
        >
          Some things<br />cannot be found.
        </h2>

        {/* Body */}
        <p
          className="mx-auto mb-12 max-w-md text-[13px] font-light leading-[1.82] md:mb-16 md:text-[15px]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,248,235,0.42)",
          }}
        >
          Aurum Nocturne is produced in a single annual run of 500 numbered
          flacons. Once allocated, no further edition will be produced until
          the following year.
        </p>

        {/* Price */}
        <div className="mb-7 flex items-baseline justify-center gap-3">
          <span
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,248,235,0.28)",
            }}
          >
            From
          </span>
          <span
            className="text-[42px] font-light italic leading-none md:text-[52px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background:
                "linear-gradient(135deg, #C9A84C 0%, #F0D88A 45%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            €1,200
          </span>
        </div>

        {/* CTAs */}
        <div className="mb-30 flex flex-col items-center gap-5 md:mb-25">
          <Link
            href="#"
            className="inline-block rounded-full px-10 py-4 text-[12px] font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:opacity-90 hover:scale-[0.97] md:px-14 md:py-5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#0B0906",
              background:
                "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
              textDecoration: "none",
            }}
          >
            Reserve Your Flacon
          </Link>
      
        </div>

 
      </div>
    </section>
  );
}