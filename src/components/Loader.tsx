// components/Loader.tsx
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { preloadPillarImages } from "../utils/preload-images";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isImageLoaded = false;
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      // 1. INTRO ANIMATIONS - Staggered entrance with overlays
      const introTl = gsap.timeline();

      introTl
        // Animated overlay bars slide in
        .fromTo(
          ".overlay-bar",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power4.inOut",
            stagger: 0.08,
          },
        )
        .fromTo(
          ".loader-header",
          { opacity: 0, y: -20 },
          { opacity: 0.6, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.8",
        )
        // Circle scales in with bounce
        .fromTo(
          circleRef.current,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1.4,
            ease: "back.out(1.4)",
          },
          "-=0.6",
        )
        // Title reveals with mask effect
        .fromTo(
          ".loader-title-1",
          { y: "120%", skewY: 7, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1",
        )
        .fromTo(
          ".loader-title-2",
          { y: "120%", skewY: -7, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.2",
        )
        // Footer slides up
        .fromTo(
          ".loader-footer",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.8",
        );

      // Continuous rotation on circle
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // 2. PROGRESS COUNTER
      const progressTween = gsap.to(counter, {
        val: 99,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counter.val));
        },
        onComplete: () => {
          if (isImageLoaded) {
            triggerExitSequence();
          }
        },
      });

      // 3. PRELOAD TRIGGER
      preloadPillarImages().then(() => {
        isImageLoaded = true;
        if (!progressTween.isActive() && counter.val >= 99) {
          triggerExitSequence();
        }
      });

      // 4. EXIT SEQUENCE - The spectacular finale
      function triggerExitSequence() {
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        exitTl
          // Snap to 100%
          .to(counter, {
            val: 100,
            duration: 0.4,
            ease: "power3.out",
            onUpdate: () => setProgress(Math.floor(counter.val)),
          })
          // Circle explodes outward
          .to(
            circleRef.current,
            {
              scale: 3,
              opacity: 0,
              rotation: "+=180",
              duration: 1,
              ease: "power4.in",
            },
            "+=0.2",
          )
          // Overlay bars retract with stagger
          .to(
            ".overlay-bar",
            {
              scaleX: 0,
              transformOrigin: "right",
              duration: 0.8,
              ease: "power3.inOut",
              stagger: 0.05,
            },
            "-=0.8",
          )
          // Text explodes in different directions (parallax depth)
          .to(
            ".loader-title-1",
            {
              y: "-150%",
              x: "-20%",
              rotation: -5,
              scale: 1.2,
              opacity: 0,
              duration: 1,
              ease: "power4.in",
            },
            "-=0.6",
          )
          .to(
            ".loader-title-2",
            {
              y: "-130%",
              x: "15%",
              rotation: 3,
              scale: 0.9,
              opacity: 0,
              duration: 1,
              ease: "power4.in",
            },
            "-=1",
          )
          .to(
            ".loader-header, .loader-footer",
            {
              opacity: 0,
              y: -20,
              duration: 0.4,
            },
            "-=0.8",
          )
          // Final wipe - split reveal
          .to(
            containerRef.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            "-=0.4",
          )
          .to(
            overlayRef.current,
            {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            "-=1.2",
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <>
      {/* Main Loader Container */}
      <div
        ref={containerRef}
        style={{
          clipPath: "inset(0% 0% 0% 0%)",
          willChange: "clip-path",
        }}
        className="fixed inset-0 z-[9999] flex flex-col justify-between bg-foreground text-background px-6 md:px-12 py-8 overflow-hidden pointer-events-none"
      >
        {/* Decorative animated bars - Awwwards style */}
        <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="overlay-bar h-[1px] w-full bg-background/10"
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>

        {/* Rotating circle decoration */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] border border-background/5 rounded-full pointer-events-none"
          style={{ willChange: "transform" }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-background/30 rounded-full" />
          <div className="absolute bottom-0 right-0 w-3 h-3 translate-x-1/2 translate-y-1/2 bg-background/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="loader-header flex justify-between items-center font-mono text-xs uppercase tracking-widest opacity-0 relative z-10">
          <span>Portfólio</span>
          <span>© 2026</span>
        </div>

        {/* Center: Name with mask reveal */}
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 md:gap-1 select-none relative z-10">
          <div className="overflow-hidden py-2">
            <h1 className="loader-title-1 font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase transform-gpu">
              George
            </h1>
          </div>

          <div className="overflow-hidden py-2">
            <h1 className="loader-title-2 font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase ml-[15vw] md:ml-[10vw] text-background/90 transform-gpu">
              Lucas
            </h1>
          </div>
        </div>

        {/* Footer: Counter with refined styling */}
        <div className="loader-footer flex justify-between items-end relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest opacity-40">
            Loading Assets
          </div>
          <div className="font-display font-light text-6xl md:text-8xl tabular-nums tracking-tighter">
            {progress}
            <span className="text-3xl md:text-5xl opacity-40">%</span>
          </div>
        </div>
      </div>

      {/* Secondary overlay for split reveal effect */}
      <div
        ref={overlayRef}
        style={{
          clipPath: "inset(0% 0% 0% 0%)",
          willChange: "clip-path",
        }}
        className="fixed inset-0 z-[9998] bg-background pointer-events-none"
      />
    </>
  );
}
