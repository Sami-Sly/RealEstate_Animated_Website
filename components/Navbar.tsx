"use client";

import React from "react";

const NAV_LINKS = [
  { label: "Story",       href: "#story" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Scent",       href: "#scent" },
  { label: "Details",     href: "#details" },
  { label: "Acquire",     href: "#acquire" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = React.useState(false);
  const [visible,   setVisible]   = React.useState(true);
  const [menuOpen,  setMenuOpen]  = React.useState(false);
  const [isMobile,  setIsMobile]  = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, border-color 0.5s ease",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        background: scrolled || menuOpen ? "rgba(11,9,6,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        borderBottom: scrolled || menuOpen
          ? "1px solid rgba(201,168,76,0.08)"
          : "1px solid transparent",
      }}
    >
      {/* ── Main bar ── */}
      <nav
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "18px",
            letterSpacing: "0.06em",
            color: "#C9A84C",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Aurum Nocturne
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,248,235,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,248,235,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,248,235,0.5)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Desktop CTA */}
          {!isMobile && (
            <a
              href="#acquire"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#0B0906",
                textDecoration: "none",
                padding: "9px 22px",
                borderRadius: "99px",
                background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Acquire
            </a>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
                width: "36px",
                height: "36px",
              }}
            >
              <span style={{
                display: "block", height: "1px", background: "#C9A84C",
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }} />
              <span style={{
                display: "block", height: "1px", background: "#C9A84C",
                transition: "opacity 0.3s",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", height: "1px", background: "#C9A84C",
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }} />
            </button>
          )}
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {isMobile && (
        <div
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? "400px" : "0px",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
            borderTop: menuOpen ? "1px solid rgba(201,168,76,0.08)" : "1px solid transparent",
          }}
        >
          <div style={{ padding: "24px 24px 32px", display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLink}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,248,235,0.55)",
                  textDecoration: "none",
                  padding: "14px 0",
                  borderBottom: i < NAV_LINKS.length - 1
                    ? "1px solid rgba(201,168,76,0.06)"
                    : "none",
                  display: "block",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#acquire"
              onClick={handleLink}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#0B0906",
                textDecoration: "none",
                padding: "14px 0",
                borderRadius: "99px",
                background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
                display: "block",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Acquire
            </a>
          </div>
        </div>
      )}
    </header>
  );
}