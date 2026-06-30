// components/Footer.tsx
// SERVER COMPONENT — no "use client"

export default function Footer() {
  const nav = [
    { label: "Story",       href: "#story" },
    { label: "Ingredients", href: "#ingredients" },
    { label: "Scent",       href: "#scent" },
    { label: "Details",     href: "#details" },
    { label: "Acquire",     href: "#acquire" },
  ];

  const legal = [
    { label: "Privacy", href: "#" },
    { label: "Terms",   href: "#" },
    { label: "Cookies", href: "#" },
  ];

  return (
    <footer
      className="border-t py-14  md:py-16"
      style={{
        background: "#080603",
        borderColor: "rgba(201,168,76,0.07)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">

        {/* ── Top row ── */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-start md:justify-between">

          {/* Wordmark */}
          <a
            href="#"
            className="text-[20px] font-light italic leading-none tracking-[0.06em] md:text-[22px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A84C",
              textDecoration: "none",
            }}
          >
            Aurum Nocturne
          </a>

          {/* Nav links — wrap on mobile, row on tablet+ */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4 md:gap-x-9">
            {nav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-[0.16em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,248,235,0.28)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{ height: "1px", background: "rgba(201,168,76,0.06)" }}
        />

        {/* ── Bottom row ── */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p
            className="m-0 text-[11px] tracking-[0.03em]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,248,235,0.18)",
            }}
          >
            © {new Date().getFullYear()} Aurum Nocturne. All rights reserved.
          </p>

          <div className="flex gap-6">
            {legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[10px] tracking-[0.12em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,248,235,0.18)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}