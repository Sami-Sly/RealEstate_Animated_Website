// 'use client';

// import { useEffect, useRef, useState, type CSSProperties } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { donuts } from '@/lib/donuts';
// import styles from '../Donutsshow.module.css';

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const SLIDE_COUNT = donuts.length;
// // How much scroll distance (in viewport heights) it takes to move through
// // every slide. Bigger number = slower, more "cinematic" scroll.
// const SCROLL_DISTANCE_VH = 220;

// export default function DonutShowcase() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const descRef = useRef<HTMLParagraphElement>(null);
//   const progressFillRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<ScrollTrigger | null>(null);
//   const activeIndexRef = useRef(0);
//   const reducedMotionRef = useRef(false);

//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     reducedMotionRef.current = window.matchMedia(
//       '(prefers-reduced-motion: reduce)'
//     ).matches;

//     // Initial visual state — only opacity/scale/transform so the browser
//     // can run it on the compositor, no layout thrash.
//     imageRefs.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
//     });

//     // Respect reduced motion: no pinned scroll-hijacking, slides only
//     // change on click.
//     if (reducedMotionRef.current) return;

//     const st = ScrollTrigger.create({
//       trigger: section,
//       start: 'top top',
//       end: `+=${SCROLL_DISTANCE_VH}%`,
//       pin: true,
//       anticipatePin: 1,
//       scrub: 0.4,
//       onUpdate: (self) => {
//         const next = Math.round(self.progress * (SLIDE_COUNT - 1));
//         if (next !== activeIndexRef.current) {
//           transitionTo(next);
//         }
//         if (progressFillRef.current) {
//           gsap.set(progressFillRef.current, { scaleX: self.progress });
//         }
//       },
//     });

//     triggerRef.current = st;

//     return () => {
//       st.kill();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /** Crossfades image + copy to the given slide index without touching scroll. */
//   function transitionTo(index: number) {
//     const prev = activeIndexRef.current;
//     if (index === prev) return;
//     activeIndexRef.current = index;
//     setActiveIndex(index);

//     const outEl = imageRefs.current[prev];
//     const inEl = imageRefs.current[index];

//     if (outEl) {
//       gsap.to(outEl, { opacity: 0, scale: 1.04, duration: 0.5, ease: 'power2.out' });
//     }
//     if (inEl) {
//       gsap.fromTo(
//         inEl,
//         { opacity: 0, scale: 1.04 },
//         { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
//       );
//     }

//     if (titleRef.current && descRef.current) {
//       gsap
//         .timeline()
//         .to([titleRef.current, descRef.current], {
//           y: -10,
//           opacity: 0,
//           duration: 0.2,
//           ease: 'power1.in',
//         })
//         .fromTo(
//           [titleRef.current, descRef.current],
//           { y: 10, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', stagger: 0.05 }
//         );
//     }
//   }

//   /** Thumbnail click — moves scroll position so the pinned scrub stays in sync. */
//   function handleThumbClick(index: number) {
//     if (reducedMotionRef.current || !triggerRef.current) {
//       transitionTo(index);
//       return;
//     }
//     const st = triggerRef.current;
//     const progress = index / (SLIDE_COUNT - 1);
//     const target = st.start + (st.end - st.start) * progress;
//     gsap.to(window, { duration: 0.9, ease: 'power2.inOut', scrollTo: target });
//   }

//   const active = donuts[activeIndex];

//   return (
//     <section ref={sectionRef} className={styles.section}>
//       <div
//         className={styles.frame}
//         style={{ '--accent': active.accent } as CSSProperties}
//       >
//         <nav className={styles.navbar}>
//           <span className={styles.logo}>🍩 Donut</span>
//           <ul className={styles.navLinks}>
//             <li>Home</li>
//             <li>Menu</li>
//             <li>Our Story</li>
//             <li>Reviews</li>
//           </ul>
//           <button className={styles.contactBtn}>Contact</button>
//         </nav>

//         <div className={styles.progressTrack}>
//           <div ref={progressFillRef} className={styles.progressFill} />
//         </div>

//         <div className={styles.content}>
//           <div className={styles.copy}>
//             <h2 ref={titleRef} className={styles.title}>
//               {active.title}
//             </h2>
//             <p ref={descRef} className={styles.desc}>
//               {active.description}
//             </p>

//             <div className={styles.ctaRow}>
//               <button className={styles.orderBtn}>Order Now</button>
//               <button className={styles.menuBtn}>View Menu</button>
//             </div>

//             <div className={styles.thumbs} role="tablist" aria-label="Donut flavors">
//               {donuts.map((d, i) => (
//                 <button
//                   key={d.id}
//                   type="button"
//                   role="tab"
//                   aria-selected={i === activeIndex}
//                   aria-label={`Show ${d.title}`}
//                   className={`${styles.thumb} ${
//                     i === activeIndex ? styles.thumbActive : ''
//                   }`}
//                   onClick={() => handleThumbClick(i)}
//                 >
//                   <Image
//                     src={d.thumbImage}
//                     alt={`Thumbnail of ${d.title}`}
//                     width={48}
//                     height={48}
//                     loading="lazy"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className={styles.imageStage}>
//             {donuts.map((d, i) => (
//               <div
//                 key={d.id}
//                 ref={(el) => {
//                   imageRefs.current[i] = el;
//                 }}
//                 className={styles.donutImage}
//                 aria-hidden={i !== activeIndex}
//               >
//                 <Image
//                   src={d.image}
//                   alt={d.title}
//                   fill
//                   sizes="(max-width: 768px) 80vw, 40vw"
//                   priority={i === 0}
//                   loading={i === 0 ? 'eager' : 'lazy'}
//                   style={{ objectFit: 'contain' }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }