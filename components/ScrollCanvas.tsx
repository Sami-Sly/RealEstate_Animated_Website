


// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// export default function RealEstateHome() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const navRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const heroImgRef = useRef<HTMLDivElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const videoFramesRef = useRef({ frame: 0 });

//   // Register GSAP plugins
//   if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger, useGSAP);
//   }

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
//         context.scale(pixelRatio, pixelRatio);
//       };

//       setCanvasSize();

//       const frameCount = 300;
//       const currentFrame = (index: number) =>
//         `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

//       const images: HTMLImageElement[] = [];
//       let imagesToLoad = frameCount;

//       const onLoad = () => {
//         imagesToLoad--;
//         if (!imagesToLoad) {
//           render();
//           setupScrollTrigger();
//         }
//       };

//       for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.onload = onLoad;
//         img.onerror = function () {
//           onLoad.call(this); // Fallback to continue loading even if a frame fails
//         };
//         img.src = currentFrame(i);
//         images.push(img);
//       }

//       imagesRef.current = images;

//       const render = () => {
//         const canvasWidth = window.innerWidth;
//         const canvasHeight = window.innerHeight;

//         context.clearRect(0, 0, canvasWidth, canvasHeight);

//         const img = images[videoFramesRef.current.frame];
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
//             const targetFrame = Math.round(animationProgress * (frameCount - 1));
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
//                 const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
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
//                 opacity = (progress - 0.6) / (0.8 - 0.6);
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
//         ScrollTrigger.getAll().forEach(t => t.kill()); // Cleanup ScrollTrigger on unmount
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
    
//           </div>
//         </div>

//         <div className="hero-img-container">
//           <div className="hero-img" ref={heroImgRef}>
//           </div>
//         </div>
//       </section>

//       <section className="outro">
//       </section>
//     </div>
//   );
// }




"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  const videoFramesRef = useRef({ frame: 0 });

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
      });

      const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        context.scale(pixelRatio, pixelRatio);
      };

      setCanvasSize();

      const frameCount = 300;
      const images: HTMLImageElement[] = [];
      let imagesToLoad = frameCount;

      const render = () => {
        context.clearRect(
          0,
          0,
          canvas.width / (window.devicePixelRatio || 1),
          canvas.height / (window.devicePixelRatio || 1)
        );
        const img = images[videoFramesRef.current.frame];
        if (img?.complete) {
          context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
        }
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `/frames/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
        img.onload = () => {
          imagesToLoad--;
          if (imagesToLoad === 0) {
            render();
            ScrollTrigger.refresh();
          }
        };
        images.push(img);
      }

      const handleResize = () => {
        setCanvasSize();
        render();
      };
      window.addEventListener("resize", handleResize);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          invalidateOnRefresh: true,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.to(
        videoFramesRef.current,
        {
          frame: frameCount - 1,
          snap: "frame",
          onUpdate: render,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(text1Ref.current, { opacity: 1, duration: 0.2 }, 0);
      tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.2);

      tl.fromTo(
        text2Ref.current,
        { y: 50 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.3
      );
      tl.to(text2Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.6);

      tl.fromTo(
        text3Ref.current,
        { y: 50 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.7
      );
      tl.to(text3Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.9);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ background: "#0B0906" }}>
      <section
        className="hero"
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        ></canvas>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            maxWidth: "1400px",
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            ref={text1Ref}
            style={{ position: "absolute", top: 0, width: "100%" }}
          >
            <h1 style={{ color: "#fff" }}>A New Standard in Living</h1>
          </div>
          <div
            ref={text2Ref}
            style={{ position: "absolute", top: 0, width: "100%" }}
          >
            <h1 style={{ color: "#fff" }}>Discover Exceptional Properties</h1>
          </div>
          <div
            ref={text3Ref}
            style={{ position: "absolute", top: 0, width: "100%" }}
          >
            <h1 style={{ color: "#fff" }}>Your Next Address Awaits</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// export default function ScrollCanvas() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const text1Ref = useRef<HTMLDivElement>(null);
//   const text2Ref = useRef<HTMLDivElement>(null);
//   const text3Ref = useRef<HTMLDivElement>(null);

//   const videoFramesRef = useRef({ frame: 0 });

//   if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger, useGSAP);
//   }

//   useGSAP(
//     () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const context = canvas.getContext("2d");
//       if (!context) return;

//       // Initialize state for the text elements
//       gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
//         xPercent: -50,
//         yPercent: -50,
//         opacity: 0,
//       });

//       const setCanvasSize = () => {
//         const pixelRatio = window.devicePixelRatio || 1;
//         canvas.width = window.innerWidth * pixelRatio;
//         canvas.height = window.innerHeight * pixelRatio;
//         canvas.style.width = window.innerWidth + "px";
//         canvas.style.height = window.innerHeight + "px";
//         context.scale(pixelRatio, pixelRatio);
//       };

//       setCanvasSize();

//       const frameCount = 300;
//       const images: HTMLImageElement[] = [];
//       let imagesToLoad = frameCount;

//       const render = () => {
//         context.clearRect(
//           0,
//           0,
//           canvas.width / (window.devicePixelRatio || 1),
//           canvas.height / (window.devicePixelRatio || 1)
//         );
//         const img = images[videoFramesRef.current.frame];
//         if (img?.complete) {
//           context.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
//         }
//       };

//       // Load images
//       for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.src = `/frames/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
//         img.onload = () => {
//           imagesToLoad--;
//           if (imagesToLoad === 0) {
//             render();
//             ScrollTrigger.refresh();
//           }
//         };
//         images.push(img);
//       }

//       // Scroll Animation
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".hero",
//           start: "top top",
//           end: `+=${window.innerHeight * 5}px`,
//           pin: true,
//           pinSpacing: true,
//           scrub: 1,
//         },
//       });

//       tl.to(
//         videoFramesRef.current,
//         {
//           frame: frameCount - 1,
//           snap: "frame",
//           onUpdate: render,
//           duration: 1,
//           ease: "none",
//         },
//         0
//       );

//       // Text animations sequenced on the timeline
//       tl.to(text1Ref.current, { opacity: 1, duration: 0.2 }, 0);
//       tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.2);

//       tl.fromTo(
//         text2Ref.current,
//         { y: 50 },
//         { opacity: 1, y: 0, duration: 0.2 },
//         0.3
//       );
//       tl.to(text2Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.6);

//       tl.fromTo(
//         text3Ref.current,
//         { y: 50 },
//         { opacity: 1, y: 0, duration: 0.2 },
//         0.7
//       );
//       tl.to(text3Ref.current, { opacity: 0, y: -50, duration: 0.2 }, 0.9);
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef}>
//       <section
//         className="hero"
//         style={{ position: "relative", width: "100%", height: "100vh" }}
//       >
//         <canvas
//           ref={canvasRef}
//           style={{ position: "absolute", top: 0, left: 0 }}
//         ></canvas>

//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             width: "100%",
//             maxWidth: "1400px",
//             textAlign: "center",
//             zIndex: 10,
//             pointerEvents: "none",
//           }}
//         >
//           <div
//             ref={text1Ref}
//             style={{ position: "absolute", top: 0,  width: "100%" }}
//           >
//             <h1 style={{ color: "#fff" }}>A New Standard in Living</h1>
//           </div>
//           <div
//             ref={text2Ref}
//             style={{ position: "absolute", top: 0,  width: "100%" }}
//           >
//             <h1 style={{ color: "#fff" }}>Discover Exceptional Properties</h1>
//           </div>
//           <div
//             ref={text3Ref}
//             style={{ position: "absolute", top: 0,  width: "100%" }}
//           >
//             <h1 style={{ color: "#fff" }}>Your Next Address Awaits</h1>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }