
"use client";
 
import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
 
export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
 
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      window.__lenis = lenisRef.current.lenis;
    }
    return () => {
      window.__lenis = undefined;
    };
  }, []);
 
  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        lerp: 0.03, 
        wheelMultiplier: 1.5, 
        syncTouch: true, 
        touchMultiplier: 1.2, 
      }}
    >
      {children}
    </ReactLenis>
  );
}