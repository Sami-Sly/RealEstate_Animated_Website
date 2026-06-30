


"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

export default function RealEstateHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const videoFramesRef = useRef({ frame: 0 });
  const lenisRef = useRef<Lenis | null>(null);

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
        context.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling on resize
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
        if (imagesToLoad === 0) {
          render();
          setupScrollTrigger();
        }
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = onLoad;
        img.onerror = onLoad; // don't let a missing frame stall setup forever
        img.src = currentFrame(i);
        images.push(img);
      }

      imagesRef.current = images;

      // const render = () => {
      //   const canvasWidth = window.innerWidth;
      //   const canvasHeight = window.innerHeight;

      //   context.clearRect(0, 0, canvasWidth, canvasHeight);

      //   const img = imagesRef.current[videoFramesRef.current.frame];
      //   if (img && img.complete && img.naturalWidth > 0) {
      //     const imageAspect = img.naturalWidth / img.naturalHeight;
      //     const canvasAspect = canvasWidth / canvasHeight;

      //     let drawWidth, drawHeight, drawX, drawY;

      //     if (imageAspect > canvasAspect) {
      //       drawHeight = canvasHeight;
      //       drawWidth = drawHeight * imageAspect;
      //       drawX = (canvasWidth - drawWidth) / 2;
      //       drawY = 0;
      //     } else {
      //       drawWidth = canvasWidth;
      //       drawHeight = drawWidth / imageAspect;
      //       drawX = 0;
      //       drawY = (canvasHeight - drawHeight) / 2;
      //     }

      //     context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      //   }
      // };

      const getFitMode = () => {
  const w = window.innerWidth;
  if (w < 640) return "contain";   // mobile: show the whole frame, no cropping
  if (w < 1024) return "cover";    // tablet: fill, slight crop is fine
  return "cover";                  // desktop: fill
};

const render = () => {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  const img = imagesRef.current[videoFramesRef.current.frame];
  if (img && img.complete && img.naturalWidth > 0) {
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;
    const fit = getFitMode();

    let drawWidth, drawHeight, drawX, drawY;

    // "contain" fits the whole image inside the canvas (may letterbox)
    // "cover" fills the canvas (may crop) — this flips which axis drives sizing
    const shouldMatchHeight =
      fit === "cover" ? imageAspect > canvasAspect : imageAspect < canvasAspect;

    if (shouldMatchHeight) {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageAspect;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageAspect;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    }

    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }
};
      const setupScrollTrigger = () => {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: () => `+=${window.innerHeight * 7}`, // function form re-evaluates on refresh
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

            if (progress <= 0.1) {
              gsap.set(navRef.current, { opacity: 1 - progress / 0.1 });
            } else {
              gsap.set(navRef.current, { opacity: 0 });
            }

            if (progress <= 0.25) {
              const zProgress = progress / 0.25;
              const translateZ = zProgress * -500;
              let opacity = 1;
              if (progress >= 0.2) {
                opacity = 1 - Math.min((progress - 0.2) / 0.05, 1);
              }
              gsap.set(headerRef.current, {
                transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
                opacity,
              });
            } else {
              gsap.set(headerRef.current, { opacity: 0 });
            }

            if (progress < 0.6) {
              gsap.set(heroImgRef.current, {
                transform: "translateZ(1000px)",
                opacity: 0,
              });
            } else if (progress <= 0.9) {
              const imgProgress = (progress - 0.6) / 0.3;
              const translateZ = 1000 - imgProgress * 1000;
              const opacity =
                progress <= 0.8 ? (progress - 0.6) / 0.2 : 1;
              gsap.set(heroImgRef.current, {
                transform: `translateZ(${translateZ}px)`,
                opacity,
              });
            } else {
              gsap.set(heroImgRef.current, {
                transform: "translateZ(0px)",
                opacity: 1,
              });
            }
          },
        });

        // Force a refresh once layout/fonts/images have truly settled,
        // so the spacer height matches the final page height.
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
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


    <section className="hero">
      <canvas ref={canvasRef}></canvas>
    </section>

    <section className="outro">
    
    </section>
  </div>
);
}



// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Lenis from "lenis";

// export default function RealEstateHome() {
//   // 1. Added strict TypeScript types to all refs
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const navRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const heroImgRef = useRef<HTMLDivElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const videoFramesRef = useRef({ frame: 0 });
//   const lenisRef = useRef<Lenis | null>(null);

//   // Register GSAP plugins safely
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
//       if (lenisRef.current) {
//         lenisRef.current.destroy();
//       }
//     };
//   }, []);

//   useGSAP(
//     () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return; // TS safety check
      
//       const context = canvas.getContext("2d");
//       if (!context) return; // TS safety check
//       contextRef.current = context;

//       const setCanvasSize = () => {
//         const pixelRatio = window.devicePixelRatio || 1;
//         canvas.width = window.innerWidth * pixelRatio;
//         canvas.height = window.innerHeight * pixelRatio;
//         canvas.style.width = window.innerWidth + "px";
//         canvas.style.height = window.innerHeight + "px";
//         context.scale(pixelRatio, pixelRatio);
//       };

//       setCanvasSize();

//       // 2. Updated to 300 frames
//       const frameCount = 300;
      
//       // 3. Updated path to match ezgif-frame-001.jpg
//       const currentFrame = (index: number) =>
//         `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

//       const images: HTMLImageElement[] = [];
//       let imagesToLoad = frameCount;

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
//         img.onerror = () => {
//           onLoad();
//         };
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
//         ScrollTrigger.create({
//           trigger: ".hero",
//           start: "top top",
//           end: `+=${window.innerHeight * 7}px`,
//           pin: true,
//           pinSpacing: true,
//           scrub: 1,
//           onUpdate: (self) => {
//             const progress = self.progress;

//             const animationProgress = Math.min(progress / 0.9, 1);
//             const targetFrame = Math.round(
//               animationProgress * (frameCount - 1)
//             );
//             videoFramesRef.current.frame = targetFrame;
//             render();

//             if (progress <= 0.1) {
//               const navProgress = progress / 0.1;
//               const opacity = 1 - navProgress;
//               gsap.set(navRef.current, { opacity });
//             } else {
//               gsap.set(navRef.current, { opacity: 0 });
//             }

//             if (progress <= 0.25) {
//               const zProgress = progress / 0.25;
//               const translateZ = zProgress * -500;

//               let opacity = 1;
//               if (progress >= 0.2) {
//                 const fadeProgress = Math.min(
//                   (progress - 0.2) / (0.25 - 0.2),
//                   1
//                 );
//                 opacity = 1 - fadeProgress;
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
//             } else if (progress >= 0.6 && progress <= 0.9) {
//               const imgProgress = (progress - 0.6) / (0.9 - 0.6);
//               const translateZ = 1000 - imgProgress * 1000;

//               let opacity = 0;
//               if (progress <= 0.8) {
//                 const opacityProgress = (progress - 0.6) / (0.8 - 0.6);
//                 opacity = opacityProgress;
//               } else {
//                 opacity = 1;
//               }

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
//       };

//       const handleResize = () => {
//         setCanvasSize();
//         render();
//         ScrollTrigger.refresh();
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef}>
//       <nav ref={navRef}>
       
     
  
//       </nav>

//       <section className="hero">
//         <canvas ref={canvasRef}></canvas>

//         <div className="hero-content">
//           <div className="header" ref={headerRef}>
//             {/* Real Estate Copy */}
//             <h1>Experience unparalleled luxury living. Discover properties that define elegance.</h1>
//             <p>Featured In</p>
      
//           </div>
//         </div>

//       </section>

     
//     </div>
//   );
// }