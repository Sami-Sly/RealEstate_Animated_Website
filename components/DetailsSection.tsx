// components/DetailsSection.tsx
// SERVER COMPONENT — no "use client"

export default function DetailsSection() {
  const specs = [
    { label: "Concentration", value: "Extrait de Parfum" },
    { label: "Volume",        value: "50 ml" },
    { label: "Flacon",        value: "Hand-cut crystal, 24-carat gold collar" },
    { label: "Edition",       value: "Limited — 500 numbered pieces" },
    { label: "Origin",        value: "Grasse, France" },
    { label: "Signature",     value: "Master Perfumer Jean-Luc Vernet" },
  ];

  const craft = [
    {
      step: "01",
      title: "The Crystal",
      body: "Each flacon is hand-cut by a single artisan in the Alsace workshops of Maison Riedel. The 24-facet geometry refracts light to reveal the liquid's amber depth.",
    },
    {
      step: "02",
      title: "The Collar",
      body: "Twenty-four carat gold, cast and hand-polished over three days. The collar bears an engraved edition number — no two are identical.",
    },
    {
      step: "03",
      title: "The Seal",
      body: "A hand-applied wax seal in burgundy and gold closes the flacon. Breaking it is a ceremony in itself.",
    },
  ];

  return (
    <section
      id="details"
      className="relative overflow-hidden py-16 md:py-24 lg:py-36"
      style={{ background: "#0d0a07" }}
    >
      {/* Vertical rule — visible only on large screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,168,76,0.07) 20%, rgba(201,168,76,0.07) 80%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10">

        {/* ── Header ── */}
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:mb-24 md:grid-cols-2 md:gap-20">
          <div>
            <p
              className="mb-5 text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C9A84C" }}
            >
              The Object
            </p>
            <h2
              className="m-0 text-[clamp(28px,4.5vw,58px)] font-light italic leading-[1.05]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(255,248,235,0.92)",
              }}
            >
              A vessel worthy<br />of its contents.
            </h2>
          </div>
          <p
            className="m-0 text-[13px] font-light leading-[1.85] md:text-[14px]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,248,235,0.42)",
            }}
          >
            We believe the flacon is inseparable from the fragrance it holds.
            The object you hold before the first spray should already feel like
            an heirloom. Aurum Nocturne is presented in a vessel made to
            outlast the perfume itself.
          </p>
        </div>

        {/* ── Specs table ── */}
        <div className="mb-16 md:mb-24">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className="grid items-baseline gap-4 py-4 md:grid-cols-[180px_1fr] md:gap-10 md:py-5 lg:grid-cols-[220px_1fr]"
              style={{
                borderTop:
                  i === 0
                    ? "1px solid rgba(201,168,76,0.12)"
                    : "1px solid rgba(201,168,76,0.06)",
                borderBottom:
                  i === specs.length - 1
                    ? "1px solid rgba(201,168,76,0.12)"
                    : undefined,
              }}
            >
              <span
                className="text-[9px] tracking-[0.18em] uppercase md:text-[10px]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,248,235,0.28)",
                }}
              >
                {s.label}
              </span>
              <span
                className="text-[17px] font-light italic md:text-[20px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,248,235,0.82)",
                  letterSpacing: "0.01em",
                }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Craft steps ── */}
        <p
          className="mb-10 text-[10px] tracking-[0.22em] uppercase md:mb-14"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,248,235,0.28)",
          }}
        >
          Craftsmanship
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          {craft.map((c) => (
            <div key={c.step}>
              <p
                className="mb-4 text-[11px] tracking-[0.2em] opacity-50"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#C9A84C",
                }}
              >
                {c.step}
              </p>
              <div
                className="mb-4 h-px w-7"
                style={{
                  background: "linear-gradient(90deg, #C9A84C, transparent)",
                }}
              />
              <h3
                className="mb-3 text-[22px] font-light italic leading-[1.2] md:text-[24px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,248,235,0.88)",
                }}
              >
                {c.title}
              </h3>
              <p
                className="m-0 text-[13px] font-light leading-[1.82]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,248,235,0.36)",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}