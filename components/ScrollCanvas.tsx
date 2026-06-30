


// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Lenis from "lenis";

// export default function RealEstateHome() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const navRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const heroImgRef = useRef<HTMLDivElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const videoFramesRef = useRef({ frame: 0 });
//   const lenisRef = useRef<Lenis | null>(null);

//   if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger, useGSAP);
//   }

//   useEffect(() => {
//     const lenis = new Lenis();
//     lenisRef.current = lenis;

//     lenis.on("scroll", () => ScrollTrigger.update());

//     gsap.ticker.add((time: number) => {
//       lenis.raf(time * 1000);
//     });
//     gsap.ticker.lagSmoothing(0);

//     return () => {
//       lenisRef.current?.destroy();
//     };
//   }, []);

//   useGSAP(
//     () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const context = canvas.getContext("2d");
//       if (!context) return;
//       contextRef.current = context;

//       const setCanvasSize = () => {
//         const pixelRatio = window.devicePixelRatio || 1;
//         canvas.width = window.innerWidth * pixelRatio;
//         canvas.height = window.innerHeight * pixelRatio;
//         canvas.style.width = window.innerWidth + "px";
//         canvas.style.height = window.innerHeight + "px";
//         context.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling on resize
//         context.scale(pixelRatio, pixelRatio);
//       };

//       setCanvasSize();

//       const frameCount = 300;
//       const currentFrame = (index: number) =>
//         `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

//       const images: HTMLImageElement[] = [];
//       let imagesToLoad = frameCount;
//       let scrollTriggerInstance: ScrollTrigger | null = null;

//       const onLoad = () => {
//         imagesToLoad--;
//         if (imagesToLoad === 0) {
//           render();
//           setupScrollTrigger();
//         }
//       };

//       for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.onload = onLoad;
//         img.onerror = onLoad; // don't let a missing frame stall setup forever
//         img.src = currentFrame(i);
//         images.push(img);
//       }

//       imagesRef.current = images;

//       const render = () => {
//         const canvasWidth = window.innerWidth;
//         const canvasHeight = window.innerHeight;

//         context.clearRect(0, 0, canvasWidth, canvasHeight);

//         const img = imagesRef.current[videoFramesRef.current.frame];
//         if (img && img.complete && img.naturalWidth > 0) {
//           const imageAspect = img.naturalWidth / img.naturalHeight;
//           const canvasAspect = canvasWidth / canvasHeight;

//           let drawWidth, drawHeight, drawX, drawY;

//           if (imageAspect > canvasAspect) {
//             drawHeight = canvasHeight;
//             drawWidth = drawHeight * imageAspect;
//             drawX = (canvasWidth - drawWidth) / 2;
//             drawY = 0;
//           } else {
//             drawWidth = canvasWidth;
//             drawHeight = drawWidth / imageAspect;
//             drawX = 0;
//             drawY = (canvasHeight - drawHeight) / 2;
//           }

//           context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
//         }
//       };

//       const setupScrollTrigger = () => {
//         scrollTriggerInstance = ScrollTrigger.create({
//           trigger: ".hero",
//           start: "top top",
//           end: () => `+=${window.innerHeight * 7}`, // function form re-evaluates on refresh
//           pin: true,
//           pinSpacing: true,
//           scrub: 1,
//           invalidateOnRefresh: true,
//           onUpdate: (self) => {
//             const progress = self.progress;

//             const animationProgress = Math.min(progress / 0.9, 1);
//             const targetFrame = Math.round(animationProgress * (frameCount - 1));
//             videoFramesRef.current.frame = targetFrame;
//             render();

//             if (progress <= 0.1) {
//               gsap.set(navRef.current, { opacity: 1 - progress / 0.1 });
//             } else {
//               gsap.set(navRef.current, { opacity: 0 });
//             }

//             if (progress <= 0.25) {
//               const zProgress = progress / 0.25;
//               const translateZ = zProgress * -500;
//               let opacity = 1;
//               if (progress >= 0.2) {
//                 opacity = 1 - Math.min((progress - 0.2) / 0.05, 1);
//               }
//               gsap.set(headerRef.current, {
//                 transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
//                 opacity,
//               });
//             } else {
//               gsap.set(headerRef.current, { opacity: 0 });
//             }

//             if (progress < 0.6) {
//               gsap.set(heroImgRef.current, {
//                 transform: "translateZ(1000px)",
//                 opacity: 0,
//               });
//             } else if (progress <= 0.9) {
//               const imgProgress = (progress - 0.6) / 0.3;
//               const translateZ = 1000 - imgProgress * 1000;
//               const opacity =
//                 progress <= 0.8 ? (progress - 0.6) / 0.2 : 1;
//               gsap.set(heroImgRef.current, {
//                 transform: `translateZ(${translateZ}px)`,
//                 opacity,
//               });
//             } else {
//               gsap.set(heroImgRef.current, {
//                 transform: "translateZ(0px)",
//                 opacity: 1,
//               });
//             }
//           },
//         });

//         // Force a refresh once layout/fonts/images have truly settled,
//         // so the spacer height matches the final page height.
//         requestAnimationFrame(() => {
//           ScrollTrigger.refresh();
//         });
//       };

//       const handleResize = () => {
//         setCanvasSize();
//         render();
//         ScrollTrigger.refresh();
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         scrollTriggerInstance?.kill();
//       };
//     },
//     { scope: containerRef }
//   );

//   return (
//   <div ref={containerRef}>


//     <section className="hero">
//       <canvas ref={canvasRef}></canvas>
//     </section>

//     <section className="outro">
    
//     </section>
//   </div>
// );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

export default function RealEstateHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const videoFramesRef = useRef({ frame: 0 });
  const lenisRef = useRef<Lenis | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;
      contextRef.current = context;

      const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(pixelRatio, pixelRatio);
      };

      setCanvasSize();

      const frameCount = 300;
      const currentFrame = (index: number) =>
        `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

      const images: HTMLImageElement[] = [];
      let imagesToLoad = frameCount;
      let scrollTriggerInstance: ScrollTrigger | null = null;

      const onLoad = () => {
        imagesToLoad--;
        const loadedCount = frameCount - imagesToLoad;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (imagesToLoad === 0) {
          render();
          setupScrollTrigger();
          setIsLoaded(true);
        }
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = onLoad;
        img.onerror = onLoad;
        img.src = currentFrame(i);
        images.push(img);
      }

      imagesRef.current = images;

      // This is the key mobile fix. "cover" fit centered vertically zooms
      // in hard on tall narrow screens and crops the top of the building —
      // exactly what your screenshot shows. Anchoring near the top instead
      // of centering keeps the roofline and logo area visible on mobile.
      const render = () => {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const isMobile = canvasWidth < 640;

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        const img = imagesRef.current[videoFramesRef.current.frame];
        if (img && img.complete && img.naturalWidth > 0) {
          const imageAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth, drawHeight, drawX, drawY;

          if (imageAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imageAspect;
            drawX = (canvasWidth - drawWidth) / 2;
            drawY = 0;
          } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imageAspect;
            drawX = 0;
            // Center on desktop/tablet, but bias toward the top 28% on
            // mobile so the crop matches the framing in your reference shot
            // instead of cropping into the middle of the building.
            drawY = isMobile
              ? -(drawHeight - canvasHeight) * 0.28
              : (canvasHeight - drawHeight) / 2;
          }

          context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
      };

      const setupScrollTrigger = () => {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: () => `+=${window.innerHeight * 7}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            const animationProgress = Math.min(progress / 0.9, 1);
            const targetFrame = Math.round(animationProgress * (frameCount - 1));
            videoFramesRef.current.frame = targetFrame;
            render();

            // Nav fade
            gsap.set(navRef.current, {
              opacity: progress <= 0.06 ? 1 - progress / 0.06 : 0,
            });

            // Main header — visible 0 to 0.18
            gsap.set(headerRef.current, {
              opacity: progress <= 0.16 ? 1 - Math.max(progress - 0.1, 0) / 0.06 : 0,
              transform: `translate(-50%, -50%) translateY(${progress * -60}px)`,
            });

            // Scroll-triggered text block 1 — appears 0.22 to 0.4
            const t1 = textWindow(progress, 0.22, 0.3, 0.34, 0.4);
            gsap.set(text1Ref.current, {
              opacity: t1,
              transform: `translate(-50%, -50%) translateY(${(1 - t1) * 30}px)`,
            });

            // Scroll-triggered text block 2 — appears 0.45 to 0.62
            const t2 = textWindow(progress, 0.45, 0.52, 0.56, 0.62);
            gsap.set(text2Ref.current, {
              opacity: t2,
              transform: `translate(-50%, -50%) translateY(${(1 - t2) * 30}px)`,
            });

            // Scroll-triggered text block 3 — appears 0.68 to 0.85
            const t3 = textWindow(progress, 0.68, 0.75, 0.8, 0.85);
            gsap.set(text3Ref.current, {
              opacity: t3,
              transform: `translate(-50%, -50%) translateY(${(1 - t3) * 30}px)`,
            });
          },
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      // Fade-in-hold-fade-out helper for a progress window
      const textWindow = (
        p: number,
        inStart: number,
        inEnd: number,
        outStart: number,
        outEnd: number
      ) => {
        if (p < inStart || p > outEnd) return 0;
        if (p < inEnd) return (p - inStart) / (inEnd - inStart);
        if (p < outStart) return 1;
        return 1 - (p - outStart) / (outEnd - outStart);
      };

      const handleResize = () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        scrollTriggerInstance?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {!isLoaded && (
        <div className="loader">
          <div className="loader-text">Aurum Nocturne</div>
          <div className="loader-bar">
            <div
              className="loader-fill"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="loader-percent">{loadProgress}%</div>
        </div>
      )}

      <nav ref={navRef} className="nav">
        <div className="logo">Aurum Nocturne</div>
        <div className="nav-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section className="hero">
        <canvas ref={canvasRef}></canvas>

        <div className="header" ref={headerRef}>
          <h1>A residence carved from light and water.</h1>
          <p>Scroll to explore</p>
        </div>

        <div className="scroll-text" ref={text1Ref}>
          <span className="scroll-text-eyebrow">01 — Architecture</span>
          <h2>Curves that follow the horizon, glass that follows the sun.</h2>
        </div>

        <div className="scroll-text" ref={text2Ref}>
          <span className="scroll-text-eyebrow">02 — Interior</span>
          <h2>Every room opens onto water, light, and silence.</h2>
        </div>

        <div className="scroll-text" ref={text3Ref}>
          <span className="scroll-text-eyebrow">03 — Location</span>
          <h2>A private shoreline, minutes from the city.</h2>
        </div>
      </section>

      {/* <section className="outro">
        <h2>Find the home that finds you.</h2>
        <p>
          Private viewings, curated listings, and a team that knows luxury
          real estate inside out.
        </p>
        <a href="#" className="outro-btn">
          Schedule a viewing
        </a>
      </section> */}
    </div>
  );
}