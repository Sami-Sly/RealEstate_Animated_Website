"use client";

import { useEffect, useRef } from "react";

interface LoaderProps {
  progress: number; // 0–100
}

export default function Loader({ progress }: LoaderProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  // Subtle ambient pulse on the orb
  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.018;
      const scale = 1 + Math.sin(t) * 0.06;
      const opacity = 0.18 + Math.sin(t * 1.3) * 0.06;
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(opacity);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0B0906",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        overflow: "hidden",
      }}
    >
      {/* Ambient orb */}
      <div
        ref={orbRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.04) 55%, transparent 80%)",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />

      {/* Top rule */}
      <div
        style={{
          width: 1,
          height: 48,
          background:
            "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3))",
          marginBottom: 32,
        }}
      />

      {/* Brand name */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(28px, 5vw, 42px)",
          letterSpacing: "0.16em",
          background:
            "linear-gradient(135deg, #C9A84C 0%, #F0D88A 45%, #C9A84C 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Aurum Nocturne
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,248,235,0.28)",
          marginBottom: 52,
          textAlign: "center",
        }}
      >
        Extrait de Parfum · Grasse, France
      </div>

      {/* Progress track */}
      <div
        style={{
          width: 180,
          height: 1,
          background: "rgba(201,168,76,0.1)",
          borderRadius: 99,
          overflow: "hidden",
          marginBottom: 16,
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #C9A84C, #F0D88A)",
            borderRadius: 99,
            transition: "width 0.25s ease",
            boxShadow: "0 0 8px rgba(201,168,76,0.5)",
          }}
        />
      </div>

      {/* Percentage */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(201,168,76,0.35)",
          minWidth: 40,
          textAlign: "center",
        }}
      >
        {progress < 100 ? `${progress}%` : "Enter"}
      </div>

      {/* Bottom rule */}
      <div
        style={{
          width: 1,
          height: 48,
          background:
            "linear-gradient(to top, transparent, rgba(201,168,76,0.3))",
          marginTop: 32,
        }}
      />

      {/* Corner marks — pure luxury detail */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 20,
            height: 20,
            borderTop: i < 2 ? "1px solid rgba(201,168,76,0.18)" : undefined,
            borderBottom: i >= 2 ? "1px solid rgba(201,168,76,0.18)" : undefined,
            borderLeft: i % 2 === 0 ? "1px solid rgba(201,168,76,0.18)" : undefined,
            borderRight: i % 2 === 1 ? "1px solid rgba(201,168,76,0.18)" : undefined,
          }}
        />
      ))}
    </div>
  );
}