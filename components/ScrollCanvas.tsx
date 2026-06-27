
// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CONFIG
// // ─────────────────────────────────────────────────────────────────────────────
// const FIRST_FRAME = 1;
// const LAST_FRAME  = 240;
// const TOTAL_FRAMES = LAST_FRAME - FIRST_FRAME + 1;

// function frameSrc(i: number) {
//   // PERFORMANCE FIX: Change .png to .webp in your /public/frames folder
//   return `/frames/ezgif-frame-${String(FIRST_FRAME + i).padStart(3, "0")}.jpg`;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // STORY BEATS & DATA (Unchanged)
// // ─────────────────────────────────────────────────────────────────────────────
// interface Beat {
//   align: "center" | "left" | "right";
//   eyebrow?: string;
//   headline: string;
//   body?: string;
//   bullets?: string[];
//   sectionId?: string;
// }

// const BEATS: Beat[] = [
//   { align: "center", headline: "Aurum\nNocturne", body: "A fragrance born from darkness and gold.", sectionId: "story" },
//   { align: "left", eyebrow: "Composition", headline: "Crafted from\nrare essences.", body: "Each bottle contains a precise alchemy of Oud from Assam, aged Sandalwood, and cold-pressed Bergamot. Sourced across four continents, blended in Grasse.", sectionId: "ingredients" },
//   { align: "right", eyebrow: "Sillage", headline: "A presence\nthat lingers.", bullets: ["Top: Bergamot, Cardamom, Saffron.", "Heart: Rose Taif, Jasmine Sambac, Iris.", "Base: Oud, Sandalwood, Ambergris."], sectionId: "scent" },
//   { align: "left", eyebrow: "Object", headline: "A vessel as\nrare as its soul.", body: "Hand-cut crystal. 24-carat gold collar. Each flacon is individually numbered, signed by our master perfumer.", sectionId: "details-beat" },
//   { align: "center", headline: "Some things\ncannot be found.", body: "Aurum Nocturne. 50ml Extrait de Parfum.", sectionId: "acquire-beat" },
// ];

// const SPECS = [
//   { label: "Concentration", value: "Extrait", unit: "de Parfum" },
//   { label: "Volume", value: "50", unit: "ml" },
//   { label: "Longevity", value: "12–16", unit: "hrs" },
//   { label: "Sillage", value: "Intense", unit: "" },
//   { label: "Edition", value: "Limited", unit: "500 pcs" },
//   { label: "Origin", value: "Grasse", unit: "France" },
// ];

// const FEATURES = [
//   { g: "✦", t: "Master Blended", d: "Composed by Maison Givaudan's Head Perfumer with over 30 years of olfactory expertise." },
//   { g: "◈", t: "Ethically Sourced", d: "All botanical extracts are sustainably harvested and IFRA-compliant at every concentration." },
//   { g: "◇", t: "Hand-poured", d: "Each flacon is filled by hand in batches of no more than 20. Every one inspected before sealing." },
//   { g: "◉", t: "Individually Numbered", d: "500 pieces in this edition. Your number is engraved on the base by a lapidary artisan." },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // CSS (Added a CSS Vignette to replace heavy canvas drawing)
// // ─────────────────────────────────────────────────────────────────────────────
// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
//   *,*::before,*::after { box-sizing: border-box; margin:0; padding:0; }
//   :root {
//     --gold: #C9A84C; --gold-lt: #E8C97A; --gold-dim: rgba(201,168,76,0.15);
//     --bg: #0B0906; --bg2: #0d0a07;
//     --text: rgba(255,248,235,0.92); --text-dim: rgba(255,248,235,0.48); --text-muted: rgba(255,248,235,0.22);
//     --border: rgba(201,168,76,0.09);
//   }
//   html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
//   body { background: var(--bg); color: var(--text); overflow-x: hidden; }

//   .an-nav { position: fixed; top:0; left:0; right:0; z-index:9000; transition: transform .5s cubic-bezier(.16,1,.3,1), background .45s ease, border-color .45s ease; }
//   .an-nav.scrolled { background: rgba(11,9,6,.88); backdrop-filter: blur(24px) saturate(160%); -webkit-backdrop-filter: blur(24px) saturate(160%); border-bottom: 1px solid var(--border); }
//   .an-nav.hidden { transform: translateY(-100%); }
//   .an-nav-inner { max-width:1400px; margin:0 auto; padding:0 40px; height:56px; display:flex; align-items:center; justify-content:space-between; }
//   .an-logo { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:19px; letter-spacing:.05em; color:var(--gold); text-decoration:none; transition:opacity .2s; }
//   .an-logo:hover { opacity:.6; }
//   .an-links { display:flex; align-items:center; gap:38px; }
//   .an-link { font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--text-muted); text-decoration:none; transition:color .2s; }
//   .an-link:hover { color:var(--text); }
//   .an-cta { font-family:'DM Sans',sans-serif; font-weight:500; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:#0B0906; text-decoration:none; padding:9px 22px; border-radius:99px; background:linear-gradient(135deg,var(--gold),var(--gold-lt)); transition:opacity .2s,transform .2s,box-shadow .3s; white-space:nowrap; }
//   .an-cta:hover { opacity:.88; transform:scale(.97); box-shadow:0 6px 28px rgba(201,168,76,.28); }
//   @media(max-width:768px){ .an-links { display:none; } .an-nav-inner { padding:0 20px; } }

//   .an-progress { position:fixed; top:0; left:0; right:0; height:1px; z-index:9999; background:rgba(201,168,76,.1); }
//   .an-progress-fill { height:100%; width:0; background:linear-gradient(90deg,var(--gold),var(--gold-lt)); border-radius:99px; }

//   .an-track { position:relative; background:var(--bg); }
//   .an-sticky { position: sticky; top:0; width:100%; height:100vh; overflow:hidden; }
//   .an-canvas { display:block; position:absolute; inset:0; width:100%; height:100%; }
  
//   /* PERFORMANCE FIX: CSS Vignette instead of Canvas drawImage */
//   .an-fade-bottom { position:absolute; bottom:0; left:0; right:0; height:38%; background:linear-gradient(to top, #0B0906 10%, rgba(11,9,6,.5) 55%, transparent); pointer-events:none; z-index:1; }
//   .an-vignette { position:absolute; inset:0; pointer-events:none; z-index:1; background: radial-gradient(ellipse at center, transparent 40%, rgba(11,9,6,0.75) 100%); }

//   .an-beat { position:absolute; inset:0; z-index:2; display:flex; align-items:center; pointer-events:none; opacity:0; visibility:hidden; }
//   .an-beat-inner { width:100%; }
//   .an-pill { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,.07); border:1px solid rgba(201,168,76,.18); border-radius:99px; padding:5px 14px 5px 10px; }
//   .an-pill-dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--gold); flex-shrink:0; }
//   .an-hed { font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:300; line-height:1.0; letter-spacing:-.01em; color:var(--text); white-space:pre-line; }
//   .an-gold-text { background:linear-gradient(135deg, #C9A84C 0%, #F0D88A 45%, #C9A84C 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
//   .an-rule { display:block; width:30px; height:1px; background:linear-gradient(90deg, var(--gold), transparent); }
//   .an-rule.right { background:linear-gradient(90deg, transparent, var(--gold)); }
//   .an-final-cta { position:absolute; bottom:10%; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:14px; z-index:10; opacity:0; visibility:hidden; white-space:nowrap; }
//   .an-btn-gold { font-family:'DM Sans',sans-serif; font-weight:500; font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:#0B0906; text-decoration:none; padding:14px 42px; border-radius:99px; background:linear-gradient(135deg,var(--gold) 0%,var(--gold-lt) 50%,var(--gold) 100%); display:inline-block; transition:opacity .2s,transform .2s,box-shadow .3s; box-shadow:0 0 0 rgba(201,168,76,0); }
//   .an-btn-gold:hover { opacity:.88; transform:scale(.97); box-shadow:0 10px 44px rgba(201,168,76,.28); }
//   .an-btn-ghost { font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--text-dim); text-decoration:none; border-bottom:1px solid rgba(255,248,235,.12); padding-bottom:2px; transition:color .2s,border-color .2s; }
//   .an-btn-ghost:hover { color:var(--text); border-color:rgba(255,248,235,.35); }
//   .an-scroll-hint { display:flex; flex-direction:column; align-items:center; gap:10px; margin-top:40px; }
//   .an-scroll-hint span { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,248,235,.28); }
//   @keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(5px);opacity:.85} }
//   .an-scroll-svg { animation:scrollBounce 2.2s ease-in-out infinite; }

//   .an-section { background:var(--bg2); padding:120px 40px; border-top:1px solid var(--border); }
//   .an-section-inner { max-width:1100px; margin:0 auto; }
//   .an-section-head { text-align:center; margin-bottom:68px; display:flex; flex-direction:column; align-items:center; gap:20px; }
//   .an-spec-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:1px; background:rgba(201,168,76,.08); border-radius:14px; overflow:hidden; }
//   .an-spec-cell { padding:32px 24px; display:flex; flex-direction:column; gap:8px; background:var(--bg2); transition:background .3s,border-color .3s; }
//   .an-spec-cell:hover { background:rgba(201,168,76,.04); }
//   .an-spec-label { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--text-muted); }
//   .an-spec-value { font-family:'Cormorant Garamond',serif; font-weight:400; font-size:clamp(24px,2.8vw,36px); letter-spacing:-.01em; color:rgba(255,248,235,.88); line-height:1; }
//   .an-spec-unit { font-family:'DM Sans',sans-serif; font-size:.38em; font-weight:300; color:var(--text-muted); margin-left:5px; letter-spacing:.06em; text-transform:uppercase; }
//   .an-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin-top:32px; }
//   .an-feat-card { padding:26px 22px; border-radius:10px; background:rgba(201,168,76,.025); border:1px solid rgba(201,168,76,.07); display:flex; flex-direction:column; gap:10px; transition:background .3s,border-color .3s; }
//   .an-feat-card:hover { background:rgba(201,168,76,.05); border-color:rgba(201,168,76,.14); }
//   .an-feat-glyph { font-size:18px; background:linear-gradient(135deg,var(--gold),var(--gold-lt)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
//   .an-feat-title { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:17px; color:rgba(255,248,235,.85); }
//   .an-feat-desc { font-family:'DM Sans',sans-serif; font-weight:300; font-size:13px; line-height:1.65; color:var(--text-dim); }
//   .an-acquire { background:var(--bg); padding:150px 40px; text-align:center; position:relative; overflow:hidden; border-top:1px solid var(--border); }
//   .an-acquire-orb { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:700px; height:450px; background:radial-gradient(ellipse, rgba(201,168,76,.07) 0%, transparent 70%); pointer-events:none; }
//   .an-acquire-inner { max-width:640px; margin:0 auto; position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:0; }
//   .an-footer { background:var(--bg); border-top:1px solid rgba(201,168,76,.06); padding:36px 40px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
//   .an-footer-logo { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px; color:rgba(201,168,76,.38); }
//   .an-footer-copy { font-family:'DM Sans',sans-serif; font-size:11px; color:var(--text-muted); letter-spacing:.03em; }
//   .an-footer-links { display:flex; gap:24px; }
//   .an-footer-link { font-family:'DM Sans',sans-serif; font-size:11px; color:var(--text-muted); text-decoration:none; letter-spacing:.06em; text-transform:uppercase; transition:color .2s; }
//   .an-footer-link:hover { color:rgba(255,248,235,.55); }
//   .an-loader { position:fixed; inset:0; background:#0B0906; z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:28px; transition:opacity .6s ease; }
//   .an-loader-title { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:22px; letter-spacing:.1em; color:var(--gold); }
//   .an-loader-track { width:160px; height:1px; background:rgba(201,168,76,.1); border-radius:99px; overflow:hidden; }
//   .an-loader-fill { height:100%; background:linear-gradient(90deg,var(--gold),var(--gold-lt)); border-radius:99px; transition:width .2s ease; }
//   .an-loader-pct { font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.14em; color:rgba(201,168,76,.32); text-transform:uppercase; }
//   @media(max-width:600px) { .an-section { padding:80px 20px; } .an-acquire { padding:100px 20px; } .an-footer { padding:28px 20px; flex-direction:column; align-items:flex-start; } }
// `;

// // ─────────────────────────────────────────────────────────────────────────────
// // COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function ScrollPage() {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
//   const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
//   const frameObjRef = useRef({ f: 0 });
//   const lastDrawnRef = useRef(-1);

//   const [loadPct, setLoadPct] = useState(0);
//   const [showContent, setShowContent] = useState(false);
//   const [navScrolled, setNavScrolled] = useState(false);
//   const [navHidden, setNavHidden] = useState(false);

//   useEffect(() => {
//     const id = "an-css";
//     if (document.getElementById(id)) return;
//     const s = document.createElement("style");
//     s.id = id; s.textContent = CSS;
//     document.head.appendChild(s);
//     return () => { document.getElementById(id)?.remove(); };
//   }, []);

//   // PERFORMANCE FIX: Cap DPR at 1.5 to prevent 4K canvas lag
//   const resizeCanvas = useCallback(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const dpr = Math.min(window.devicePixelRatio || 1, 1.5); 
//     const W = window.innerWidth;
//     const H = window.innerHeight;
//     c.width = W * dpr;
//     c.height = H * dpr;
//     c.style.width = `${W}px`;
//     c.style.height = `${H}px`;
//     const ctx = c.getContext("2d", { alpha: false }); // alpha:false improves performance
//     if (ctx) ctx.scale(dpr, dpr);
//   }, []);

//   // PERFORMANCE FIX: Stripped out gradient drawing. Canvas only draws image now.
//   const drawFrame = useCallback((idx: number) => {
//     const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
//     if (i === lastDrawnRef.current) return;
    
//     const img = imagesRef.current[i];
//     if (!img || !loadedRef.current[i]) return;
    
//     const c = canvasRef.current;
//     if (!c) return;
//     const ctx = c.getContext("2d");
//     if (!ctx) return;

//     const W = c.width / (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio || 1);
//     const H = c.height / (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio || 1);

//     ctx.fillStyle = "#0B0906";
//     ctx.fillRect(0, 0, W, H);

//     const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
//     const dw = img.naturalWidth * scale;
//     const dh = img.naturalHeight * scale;
//     const dx = (W - dw) / 2;
//     const dy = (H - dh) / 2;

//     ctx.drawImage(img, dx, dy, dw, dh);
//     lastDrawnRef.current = i;
//   }, []);

//   // Preload logic
//   useEffect(() => {
//     let done = 0;
//     const markDone = () => {
//       done++;
//       setLoadPct(Math.round((done / TOTAL_FRAMES) * 100));
//       if (done === TOTAL_FRAMES) setShowContent(true);
//     };
//     const load = (i: number) => {
//       const img = new Image();
//       img.onload = () => {
//         img.decode().catch(() => {}).finally(() => {
//           loadedRef.current[i] = true;
//           imagesRef.current[i] = img;
//           markDone();
//           if (i === 0) drawFrame(0);
//         });
//       };
//       img.onerror = () => markDone();
//       img.src = frameSrc(i);
//     };
    
//     for (let i = 0; i < Math.min(30, TOTAL_FRAMES); i++) load(i);
    
//     const ric = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(() => cb(), 2000));
//     ric(() => { for (let i = 30; i < TOTAL_FRAMES; i++) load(i); });
//   }, [drawFrame]);

//   useEffect(() => {
//     resizeCanvas();
//     drawFrame(0);
//     const onResize = () => {
//       resizeCanvas();
//       lastDrawnRef.current = -1;
//       drawFrame(frameObjRef.current.f);
//       ScrollTrigger.refresh();
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, [resizeCanvas, drawFrame]);

//   useEffect(() => {
//     if (!showContent) return;

//     let prevY = 0;
//     const navTrigger = ScrollTrigger.create({
//       start: 0,
//       end: "max",
//       onUpdate: () => {
//         const y = window.scrollY;
//         setNavScrolled(y > 40);
//         setNavHidden(y > 200 && y > prevY);
//         prevY = y;
//       },
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         id: "main-scrub",
//         trigger: trackRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 0.8,
//       },
//     });

//     tl.to(frameObjRef.current, {
//       f: TOTAL_FRAMES - 1,
//       ease: "none",
//       duration: 1,
//       onUpdate: () => drawFrame(frameObjRef.current.f),
//     }, 0);

//     if (progressRef.current) {
//       tl.to(progressRef.current, { width: "100%", ease: "none", duration: 1 }, 0);
//     }

//     const CARD_ZONE = 0.78;
//     const STEP = CARD_ZONE / BEATS.length;
//     const ENTRY_DELAY = STEP * 0.06;
//     const FADE_IN = STEP * 0.36;
//     const FADE_OUT = STEP * 0.30;

//     const cards = gsap.utils.toArray<HTMLElement>(".an-beat");

//     cards.forEach((card, i) => {
//       const zoneStart = i * STEP;
//       const zoneEnd = (i + 1) * STEP;
//       const fadeInStart = zoneStart + ENTRY_DELAY;
//       const fadeOutStart = zoneEnd - FADE_OUT;

//       const a = BEATS[i].align;
//       const isMob = window.innerWidth < 768;
//       const ox = isMob ? 0 : a === "left" ? -22 : a === "right" ? 22 : 0;
//       const oy = a === "center" ? 14 : 0;

//       tl.fromTo(card, { autoAlpha: 0, x: ox, y: oy }, { autoAlpha: 1, x: 0, y: 0, ease: "power2.out", duration: FADE_IN, immediateRender: true }, fadeInStart);
//       tl.to(card, { autoAlpha: 0, x: -ox, y: -oy, ease: "power2.inOut", duration: FADE_OUT }, fadeOutStart);
//     });

//     tl.fromTo(".an-final-cta", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.06 }, 0.78);
//     tl.to(".an-final-cta", { autoAlpha: 0, y: -10, ease: "power2.in", duration: 0.04 }, 0.90);

//     return () => {
//       navTrigger.kill();
//       tl.kill();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [showContent, drawFrame]);

//   return (
//     <>
//       {!showContent && (
//         <div className="an-loader">
//           <div className="an-loader-title">Aurum Nocturne</div>
//           <div className="an-loader-track">
//             <div className="an-loader-fill" style={{ width: `${loadPct}%` }} />
//           </div>
//           <div className="an-loader-pct">{loadPct}%</div>
//         </div>
//       )}

//       <main>
//         <div id="story" ref={trackRef} className="an-track" style={{ height: "550vh" }}>
//           <div className="an-sticky">
//             <canvas ref={canvasRef} className="an-canvas" />
//             {/* PERFORMANCE FIX: Using CSS Overlays for visual effects instead of Canvas */}
//             <div className="an-vignette" />
//             <div className="an-fade-bottom" />

//             {BEATS.map((beat, i) => {
//               const isL = beat.align === "left";
//               const isR = beat.align === "right";
//               const isC = beat.align === "center";

//               return (
//                 <div key={i} id={beat.sectionId} className="an-beat" style={{ justifyContent: isC ? "center" : isL ? "flex-start" : "flex-end", padding: isC ? "0 24px" : "0 6vw" }}>
//                   <div className="an-beat-inner" style={{ maxWidth: isC ? "700px" : "390px", textAlign: isC ? "center" : isL ? "left" : "right" }}>
//                     {beat.eyebrow && (
//                       <div style={{ marginBottom: "14px", display: "flex", justifyContent: isC ? "center" : isL ? "flex-start" : "flex-end" }}>
//                         <span className="an-pill"><span className="an-pill-dot" />{beat.eyebrow}</span>
//                       </div>
//                     )}
//                     <h2 className="an-hed" style={{ fontSize: isC && i === 0 ? "clamp(44px, 8.5vw, 100px)" : "clamp(26px, 4vw, 54px)", marginBottom: "16px" }}>
//                       {i === 0 ? <span className="an-gold-text">{beat.headline}</span> : beat.headline}
//                     </h2>
//                     {!isC && (
//                       <div style={{ marginBottom: "16px", display: "flex", justifyContent: isR ? "flex-end" : "flex-start" }}>
//                         <span className={`an-rule${isR ? " right" : ""}`} />
//                       </div>
//                     )}
//                     {beat.body && (
//                       <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: i === 0 ? "clamp(15px, 1.8vw, 19px)" : "clamp(13px, 1.3vw, 15px)", lineHeight: 1.72, color: i === 0 ? "rgba(255,248,235,.68)" : "rgba(255,248,235,.52)", letterSpacing: ".01em" }}>
//                         {beat.body}
//                       </p>
//                     )}
//                     {beat.bullets && (
//                       <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
//                         {beat.bullets.map((b, bi) => (
//                           <li key={bi} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "clamp(12px, 1.2vw, 14px)", color: "rgba(255,248,235,.52)", display: "flex", alignItems: "center", gap: "10px", justifyContent: isR ? "flex-end" : "flex-start", flexDirection: isR ? "row-reverse" : "row", textAlign: isR ? "right" : "left", letterSpacing: ".02em" }}>
//                             <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
//                             {b}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                     {i === 0 && (
//                       <div className="an-scroll-hint">
//                         <span>Scroll to discover</span>
//                         <svg width="16" height="22" viewBox="0 0 16 22" fill="none" className="an-scroll-svg">
//                           <rect x="1" y="1" width="14" height="20" rx="7" stroke="rgba(201,168,76,.45)" strokeWidth="1.2" />
//                           <circle cx="8" cy="7" r="2" fill="rgba(201,168,76,.65)" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="an-final-cta">
//               <a href="#acquire" className="an-btn-gold">Acquire the Flacon</a>
//               <a href="#details" className="an-btn-ghost">Discover craftsmanship</a>
//             </div>
//           </div>
//         </div>

//         <section id="details" className="an-section">
//           <div className="an-section-inner">
//             <div className="an-section-head">
//               <span className="an-pill"><span className="an-pill-dot" />Technical Details</span>
//               <h2 className="an-hed" style={{ fontSize: "clamp(32px, 4.8vw, 58px)", textAlign: "center" }}>
//                 Nothing left to chance.<br />
//                 <span className="an-gold-text">Every note, considered.</span>
//               </h2>
//             </div>
//             <div className="an-spec-grid">
//               {SPECS.map((s) => (
//                 <div key={s.label} className="an-spec-cell">
//                   <div className="an-spec-label">{s.label}</div>
//                   <div className="an-spec-value">{s.value}{s.unit && <span className="an-spec-unit">{s.unit}</span>}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="an-feat-grid">
//               {FEATURES.map((f) => (
//                 <div key={f.t} className="an-feat-card">
//                   <span className="an-feat-glyph">{f.g}</span>
//                   <div className="an-feat-title">{f.t}</div>
//                   <div className="an-feat-desc">{f.d}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="acquire" className="an-acquire">
//           <div className="an-acquire-orb" />
//           <div className="an-acquire-inner">
//             <span className="an-pill" style={{ marginBottom: "28px" }}><span className="an-pill-dot" />Limited Edition — 500 Pieces</span>
//             <h2 className="an-hed an-gold-text" style={{ fontSize: "clamp(48px, 8vw, 90px)", margin: "0 0 18px" }}>Aurum Nocturne</h2>
//             <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "clamp(15px, 1.7vw, 18px)", lineHeight: 1.78, color: "var(--text-dim)", marginBottom: "48px", letterSpacing: ".015em" }}>
//               The ultimate expression of darkness and gold.<br />
//               Extrait de Parfum. 50ml. Starting from <strong style={{ color: "var(--gold)", fontWeight: 400 }}>$495</strong>.
//             </p>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
//               <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="an-btn-gold" style={{ fontSize: "13px", padding: "15px 52px" }}>Acquire Your Flacon — $495</a>
//               <a href="#details" className="an-btn-ghost">See full composition</a>
//               <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--text-muted)", letterSpacing: ".05em", marginTop: "4px" }}>
//                 Free worldwide delivery · Bespoke gift packaging · Certificate of authenticity
//               </span>
//             </div>
//           </div>
//         </section>

//         <footer className="an-footer">
//           <div className="an-footer-logo">Aurum Nocturne</div>
//           <div className="an-footer-copy">© 2025 Aurum Nocturne. All rights reserved.</div>
//           <div className="an-footer-links">
//             {["Privacy", "Legal", "Sustainability", "Contact"].map((l) => (
//               <a key={l} href="#" className="an-footer-link">{l}</a>
//             ))}
//           </div>
//         </footer>
//       </main>
//     </>
//   );
// }







"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Loader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — update FIRST_FRAME / LAST_FRAME to match your /public/frames folder
// ─────────────────────────────────────────────────────────────────────────────
const FIRST_FRAME  = 1;
const LAST_FRAME   = 240;
const TOTAL_FRAMES = LAST_FRAME - FIRST_FRAME + 1;

// PERFORMANCE: jpg is used. For even better perf, convert to .webp and change extension here.
function frameSrc(i: number) {
  return `/frames/ezgif-frame-${String(FIRST_FRAME + i).padStart(3, "0")}.jpg`;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY BEATS
// ─────────────────────────────────────────────────────────────────────────────
interface Beat {
  align: "center" | "left" | "right";
  eyebrow?: string;
  headline: string;
  body?: string;
  bullets?: string[];
  sectionId?: string;
}

const BEATS: Beat[] = [
  {
    align: "center",
    headline: "Aurum\nNocturne",
    body: "A fragrance born from darkness and gold.",
    sectionId: "story",
  },
  {
    align: "left",
    eyebrow: "Composition",
    headline: "Crafted from\nrare essences.",
    body: "Each bottle contains a precise alchemy of Oud from Assam, aged Sandalwood, and cold-pressed Bergamot. Sourced across four continents, blended in Grasse.",
    sectionId: "ingredients",
  },
  {
    align: "right",
    eyebrow: "Sillage",
    headline: "A presence\nthat lingers.",
    bullets: [
      "Top: Bergamot, Cardamom, Saffron.",
      "Heart: Rose Taif, Jasmine Sambac, Iris.",
      "Base: Oud, Sandalwood, Ambergris.",
    ],
    sectionId: "scent",
  },
  {
    align: "left",
    eyebrow: "Object",
    headline: "A vessel as\nrare as its soul.",
    body: "Hand-cut crystal. 24-carat gold collar. Each flacon is individually numbered, signed by our master perfumer.",
    sectionId: "details-beat",
  },
  {
    align: "center",
    headline: "Some things\ncannot be found.",
    body: "Aurum Nocturne. 50ml Extrait de Parfum.",
    sectionId: "acquire-beat",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS — injected once, prefixed to avoid leaking into host page
// ─────────────────────────────────────────────────────────────────────────────
const SCOPED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  :root {
    --gold:      #C9A84C;
    --gold-lt:   #E8C97A;
    --gold-dim:  rgba(201,168,76,0.15);
    --bg:        #0B0906;
    --bg2:       #0d0a07;
    --text:      rgba(255,248,235,0.92);
    --text-dim:  rgba(255,248,235,0.48);
    --text-muted:rgba(255,248,235,0.22);
    --border:    rgba(201,168,76,0.09);
  }

  /* ── scroll canvas section ── */
  .sc-track  { position: relative; }
  /* top: 0 keeps it sticky; padding-top pushes content below the 56px navbar */
.sc-sticky {
  position: sticky;
  top: 56px;                    /* ← was: 0  */
  height: calc(100vh - 56px);  /* ← was: 100vh  */
  width: 100%;
  overflow: hidden;
}
  /* canvas fills the space below the navbar padding */
  .sc-canvas { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }

  /* CSS vignette — replaces heavy canvas gradient drawing */
  .sc-fade-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 38%;
    background: linear-gradient(to top, #0B0906 10%, rgba(11,9,6,.5) 55%, transparent);
    pointer-events: none; z-index: 1;
  }
  .sc-vignette {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(11,9,6,0.75) 100%);
  }

  /* ── beat cards ── */
  .sc-beat {
    position: absolute; inset: 0; z-index: 2;
    display: flex; align-items: center;
    pointer-events: none; opacity: 0; visibility: hidden;
  }
  .sc-beat-inner { width: 100%; }

  .sc-pill {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 10px;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--gold);
    background: rgba(201,168,76,.07);
    border: 1px solid rgba(201,168,76,.18);
    border-radius: 99px; padding: 5px 14px 5px 10px;
  }
  .sc-pill-dot {
    display: inline-block; width: 5px; height: 5px;
    border-radius: 50%; background: var(--gold); flex-shrink: 0;
  }

  .sc-hed {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-weight: 300;
    line-height: 1.0; letter-spacing: -.01em;
    color: var(--text); white-space: pre-line;
  }
  .sc-gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #F0D88A 45%, #C9A84C 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .sc-rule       { display: block; width: 30px; height: 1px; background: linear-gradient(90deg, var(--gold), transparent); }
  .sc-rule.right { background: linear-gradient(90deg, transparent, var(--gold)); }

  /* ── final CTA overlay ── */
  .sc-final-cta {
    position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    z-index: 10; opacity: 0; visibility: hidden; white-space: nowrap;
  }
  .sc-btn-gold {
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 12px;
    letter-spacing: .1em; text-transform: uppercase;
    color: #0B0906; text-decoration: none;
    padding: 14px 42px; border-radius: 99px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 50%, var(--gold) 100%);
    display: inline-block;
    transition: opacity .2s, transform .2s, box-shadow .3s;
    box-shadow: 0 0 0 rgba(201,168,76,0);
  }
  .sc-btn-gold:hover { opacity:.88; transform:scale(.97); box-shadow:0 10px 44px rgba(201,168,76,.28); }

  .sc-btn-ghost {
    font-family: 'DM Sans', sans-serif; font-size: 11px;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--text-dim); text-decoration: none;
    border-bottom: 1px solid rgba(255,248,235,.12); padding-bottom: 2px;
    transition: color .2s, border-color .2s;
  }
  .sc-btn-ghost:hover { color: var(--text); border-color: rgba(255,248,235,.35); }

  /* ── scroll hint ── */
  .sc-scroll-hint { display:flex; flex-direction:column; align-items:center; gap:10px; margin-top:40px; }
  .sc-scroll-hint span { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,248,235,.28); }
  @keyframes sc-bounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(5px);opacity:.85} }
  .sc-scroll-svg { animation: sc-bounce 2.2s ease-in-out infinite; }

  @media (max-width: 768px) {
    .sc-final-cta { bottom: 6%; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollCanvas() {
  const trackRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef    = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const frameObjRef  = useRef({ f: 0 });
  const lastDrawnRef = useRef(-1);
  const dprRef       = useRef(1); // cached DPR

  const [loadPct, setLoadPct]       = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isVisible, setIsVisible]   = useState(false); // fade-in after load

  // ── Inject scoped CSS once ──────────────────────────────────────────────
  useEffect(() => {
    const id = "sc-css";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = SCOPED_CSS;
    document.head.appendChild(s);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
    // ── Canvas resize — cap DPR at 1.5 to prevent 4K lag on retina ─────────
  const NAV_H = 56; // must match your Navbar height in px
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    dprRef.current = dpr;
    const W = window.innerWidth;
    const H = window.innerHeight - NAV_H; // subtract navbar so frame is never clipped
    c.width  = W * dpr;
    c.height = H * dpr;
    c.style.width  = `${W}px`;
    c.style.height = `${H}px`;
    const ctx = c.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }, []);

  // ── Draw a single frame — cover-fit, fill background ───────────────────
  const drawFrame = useCallback((idx: number) => {
    const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
    if (i === lastDrawnRef.current) return;

    const img = imagesRef.current[i];
    if (!img || !loadedRef.current[i]) return;

    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const W = c.width  / dpr;
    const H = c.height / dpr;
    ctx.fillStyle = "#0B0906";
    ctx.fillRect(0, 0, W, H);

    // cover-fit
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth  * scale;
    const dh = img.naturalHeight * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnRef.current = i;
  }, []);

  // ── Frame preloading — critical frames first, rest on idle ─────────────
  useEffect(() => {
    let loaded = 0;

    const onFrameDone = (i: number) => {
      loaded++;
      // update pct — clamp to 99 until truly done
      setLoadPct(loaded >= TOTAL_FRAMES ? 100 : Math.min(99, Math.round((loaded / TOTAL_FRAMES) * 100)));
      if (i === 0) drawFrame(0); // draw first frame as soon as it's ready
      if (loaded === TOTAL_FRAMES) {
        setShowContent(true);
        // slight delay so the loader can show 100% before fading
        setTimeout(() => setIsVisible(true), 350);
      }
    };

    const loadFrame = (i: number) => {
      const img = new Image();
      img.decoding = "async"; // non-blocking decode hint
      img.onload = () => {
        img.decode()
          .catch(() => {})
          .finally(() => {
            loadedRef.current[i] = true;
            imagesRef.current[i] = img;
            onFrameDone(i);
          });
      };
      img.onerror = () => onFrameDone(i); // count errors so we don't stall
      img.src = frameSrc(i);
    };

    // First 30 frames loaded immediately (visible during scroll start)
    for (let i = 0; i < Math.min(30, TOTAL_FRAMES); i++) loadFrame(i);

    // Rest loaded during browser idle time
    const ric = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 1500));
    ric(() => {
      for (let i = 30; i < TOTAL_FRAMES; i++) loadFrame(i);
    });
  }, [drawFrame]);

  // ── Canvas resize + initial draw ────────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    drawFrame(0);

    const onResize = () => {
      resizeCanvas();
      lastDrawnRef.current = -1;
      drawFrame(frameObjRef.current.f);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resizeCanvas, drawFrame]);

  // ── GSAP scroll timeline ─────────────────────────────────────────────────
  useEffect(() => {
    if (!showContent) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "sc-scrub",
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // 0.8 = smooth but responsive
      },
    });

    // Frame scrubbing
    tl.to(
      frameObjRef.current,
      {
        f: TOTAL_FRAMES - 1,
        ease: "none",
        duration: 1,
        onUpdate: () => drawFrame(frameObjRef.current.f),
      },
      0,
    );

    // Beat card timing
    const CARD_ZONE   = 0.78;
    const STEP        = CARD_ZONE / BEATS.length;
    const ENTRY_DELAY = STEP * 0.06;
    const FADE_IN     = STEP * 0.36;
    const FADE_OUT    = STEP * 0.30;

    const cards = gsap.utils.toArray<HTMLElement>(".sc-beat");

    cards.forEach((card, i) => {
      const zoneStart    = i * STEP;
      const zoneEnd      = (i + 1) * STEP;
      const fadeInStart  = zoneStart + ENTRY_DELAY;
      const fadeOutStart = zoneEnd - FADE_OUT;

      const a    = BEATS[i].align;
      const mob  = window.innerWidth < 768;
      const ox   = mob ? 0 : a === "left" ? -22 : a === "right" ? 22 : 0;
      const oy   = a === "center" ? 14 : 0;

      tl.fromTo(
        card,
        { autoAlpha: 0, x: ox, y: oy },
        { autoAlpha: 1, x: 0, y: 0, ease: "power2.out", duration: FADE_IN, immediateRender: true },
        fadeInStart,
      );
      tl.to(
        card,
        { autoAlpha: 0, x: -ox, y: -oy, ease: "power2.inOut", duration: FADE_OUT },
        fadeOutStart,
      );
    });

    // Final CTA
    tl.fromTo(".sc-final-cta", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.06 }, 0.78);
    tl.to(".sc-final-cta", { autoAlpha: 0, y: -10, ease: "power2.in", duration: 0.04 }, 0.90);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [showContent, drawFrame]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Loader — shown until all frames ready */}
      {!showContent && <Loader progress={loadPct} />}

      {/* Scroll animation section */}
      <div
        id="story"
        ref={trackRef}
        className="sc-track"
        style={{
          height: "550vh",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <div className="sc-sticky">
          <canvas ref={canvasRef} className="sc-canvas" />

          {/* CSS overlays — vignette + bottom fade (no canvas cost) */}
          <div className="sc-vignette" />
          <div className="sc-fade-bottom" />

          {/* Beat cards */}
          {BEATS.map((beat, i) => {
            const isL = beat.align === "left";
            const isR = beat.align === "right";
            const isC = beat.align === "center";

            return (
              <div
                key={i}
                id={beat.sectionId}
                className="sc-beat"
                style={{
                  justifyContent: isC ? "center" : isL ? "flex-start" : "flex-end",
                  padding: isC ? "0 24px" : "0 6vw",
                }}
              >
                <div
                  className="sc-beat-inner"
                  style={{
                    maxWidth: isC ? "700px" : "390px",
                    textAlign: isC ? "center" : isL ? "left" : "right",
                  }}
                >
                  {beat.eyebrow && (
                    <div
                      style={{
                        marginBottom: 14,
                        display: "flex",
                        justifyContent: isC ? "center" : isL ? "flex-start" : "flex-end",
                      }}
                    >
                      <span className="sc-pill">
                        <span className="sc-pill-dot" />
                        {beat.eyebrow}
                      </span>
                    </div>
                  )}

                  <h2
                    className="sc-hed"
                    style={{
                      fontSize:
                        isC && i === 0
                          ? "clamp(44px, 8.5vw, 100px)"
                          : "clamp(26px, 4vw, 54px)",
                      marginBottom: 16,
                    }}
                  >
                    {i === 0 ? (
                      <span className="sc-gold-text">{beat.headline}</span>
                    ) : (
                      beat.headline
                    )}
                  </h2>

                  {!isC && (
                    <div
                      style={{
                        marginBottom: 16,
                        display: "flex",
                        justifyContent: isR ? "flex-end" : "flex-start",
                      }}
                    >
                      <span className={`sc-rule${isR ? " right" : ""}`} />
                    </div>
                  )}

                  {beat.body && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize:
                          i === 0
                            ? "clamp(15px, 1.8vw, 19px)"
                            : "clamp(13px, 1.3vw, 15px)",
                        lineHeight: 1.72,
                        color:
                          i === 0
                            ? "rgba(255,248,235,.68)"
                            : "rgba(255,248,235,.52)",
                        letterSpacing: ".01em",
                      }}
                    >
                      {beat.body}
                    </p>
                  )}

                  {beat.bullets && (
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {beat.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(12px, 1.2vw, 14px)",
                            color: "rgba(255,248,235,.52)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            justifyContent: isR ? "flex-end" : "flex-start",
                            flexDirection: isR ? "row-reverse" : "row",
                            textAlign: isR ? "right" : "left",
                            letterSpacing: ".02em",
                          }}
                        >
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "var(--gold)",
                              flexShrink: 0,
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Scroll hint on first beat only */}
                  {i === 0 && (
                    <div className="sc-scroll-hint">
                      <span>Scroll to discover</span>
                      <svg
                        width="16"
                        height="22"
                        viewBox="0 0 16 22"
                        fill="none"
                        className="sc-scroll-svg"
                      >
                        <rect
                          x="1" y="1" width="14" height="20" rx="7"
                          stroke="rgba(201,168,76,.45)" strokeWidth="1.2"
                        />
                        <circle cx="8" cy="7" r="2" fill="rgba(201,168,76,.65)" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Final CTA overlay */}
          <div className="sc-final-cta">
            <a href="#acquire" className="sc-btn-gold">Acquire the Flacon</a>
            <a href="#details" className="sc-btn-ghost">Discover craftsmanship</a>
          </div>
        </div>
      </div>
    </>
  );
}