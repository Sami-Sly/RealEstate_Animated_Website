// components/ScentSection.tsx
// SERVER COMPONENT — no "use client"

export default function ScentSection() {
  const notes = [
    {
      layer: "Top",
      roman: "I",
      color: "#E8C97A",
      ingredients: ["Bergamot", "Cardamom", "Saffron"],
      description:
        "The opening breath — sharp citrus heat softened by warm spice. Gone within minutes, but unforgettable.",
    },
    {
      layer: "Heart",
      roman: "II",
      color: "#C9A84C",
      ingredients: ["Rose Taif", "Jasmine Sambac", "Iris"],
      description:
        "The soul of the fragrance. Florals of impossible rarity, harvested before dawn at peak bloom.",
    },
    {
      layer: "Base",
      roman: "III",
      color: "#9E7A2E",
      ingredients: ["Oud", "Sandalwood", "Ambergris"],
      description:
        "What remains hours later — a warm, resinous signature that becomes part of your skin.",
    },
  ];

  return (
    <section
      id="scent"
      className="relative overflow-hidden py-16 md:py-24 lg:py-36"
      style={{ background: "#0B0906" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-full max-w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.055) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-14 text-center md:mb-20">
          <p
            className="mb-4 text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#C9A84C" }}
          >
            Olfactive Pyramid
          </p>
          <h2
            className="m-0 text-[clamp(28px,5vw,64px)] font-light italic leading-[1.05]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255,248,235,0.92)",
            }}
          >
            Three acts.<br />One memory.
          </h2>
        </div>

        {/* ── Notes grid — 1 col mobile / 3 col desktop ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "1px",
            background: "rgba(201,168,76,0.08)",
          }}
        >
          {notes.map((note) => (
            <div
              key={note.layer}
              className="px-6 py-10 md:px-9 md:py-12 lg:px-10 lg:py-14"
              style={{ background: "#0B0906" }}
            >
              {/* Roman numeral */}
              <p
                className="mb-6 text-[11px] tracking-[0.18em] opacity-40"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: note.color,
                }}
              >
                {note.roman}
              </p>

              {/* Layer label */}
              <p
                className="mb-3 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: note.color,
                }}
              >
                {note.layer} Note
              </p>

              {/* Ingredients */}
              <div className="mb-6 flex flex-col gap-2.5">
                {note.ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2.5">
                    <span
                      className="inline-block h-px w-4 flex-shrink-0"
                      style={{
                        background: `linear-gradient(90deg, ${note.color}, transparent)`,
                      }}
                    />
                    <span
                      className="text-[clamp(16px,2vw,24px)] font-light italic"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "rgba(255,248,235,0.88)",
                      }}
                    >
                      {ing}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="mb-5 h-px w-full"
                style={{ background: "rgba(201,168,76,0.1)" }}
              />

              {/* Description */}
              <p
                className="m-0 text-[13px] font-light leading-[1.78] tracking-[0.01em]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,248,235,0.40)",
                }}
              >
                {note.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Longevity bar ── */}
        <div
          className="mt-10 flex flex-col gap-6 border px-6 py-8 md:mt-16 md:flex-row md:items-center md:gap-14 md:px-12 md:py-11"
          style={{
            background: "rgba(201,168,76,0.03)",
            borderColor: "rgba(201,168,76,0.08)",
          }}
        >
          {/* Left stat */}
          <div className="flex-shrink-0">
            <p
              className="mb-2 text-[10px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,248,235,0.3)",
              }}
            >
              Longevity
            </p>
            <p
              className="m-0 text-[38px] font-light italic leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A84C",
              }}
            >
              12h+
            </p>
          </div>

          {/* Progress bar */}
          <div
            className="relative h-0.5 w-full flex-1"
            style={{ background: "rgba(201,168,76,0.08)" }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: "82%",
                background: "linear-gradient(90deg, #9E7A2E, #C9A84C, #E8C97A)",
              }}
            />
            {/* Tick labels — hidden on mobile to prevent overflow */}
            <div className="hidden md:block">
              {["2h", "4h", "6h", "8h", "10h", "12h"].map((t, i) => (
                <span
                  key={t}
                  className="absolute top-2.5 -translate-x-1/2 text-[10px] tracking-[0.1em]"
                  style={{
                    left: `${((i + 1) / 6) * 100}%`,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,248,235,0.2)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right stat */}
          <div className="flex-shrink-0 md:text-right">
            <p
              className="mb-2 text-[10px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,248,235,0.3)",
              }}
            >
              Sillage
            </p>
            <p
              className="m-0 text-[22px] font-light italic leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(255,248,235,0.7)",
              }}
            >
              Enveloping
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}