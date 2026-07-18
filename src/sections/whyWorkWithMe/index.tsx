// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_QUERY = "(max-width: 767px)";
const ITEM_HEIGHT = 120;

// Quanto MENOR, mais sensível: um scroll pequeno já avança bastante na lista.
const SCROLL_DISTANCE_PER_ITEM = 20; // era 40 — cortado quase pela metade

// Quanto MENOR, mais rápida a troca de detalhes (menos tempo "borrado" na
// transição, mais tempo com o item parado e legível entre uma troca e outra).
const CROSSFADE_EDGE = 0.12; // era 0.3

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalItems = pillars.length;

      const initialY = ((totalItems - 1) / 2) * ITEM_HEIGHT;
      const finalY = initialY - (totalItems - 1) * ITEM_HEIGHT;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalItems * SCROLL_DISTANCE_PER_ITEM}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      tl.to(
        ".pillar-list-track",
        {
          y: finalY,
          ease: "none",
          duration: totalItems,
        },
        0,
      );

      for (let i = 0; i < totalItems - 1; i++) {
        const boundary = i + 0.5;
        const start = boundary - CROSSFADE_EDGE;
        const duration = CROSSFADE_EDGE * 2;

        const outImg = `.pillar-img-${i}`;
        const outText = `.pillar-text-${i}`;
        const outTitle = `.pillar-title-${i}`;
        const outIdx = `.pillar-idx-${i}`;

        const inImg = `.pillar-img-${i + 1}`;
        const inText = `.pillar-text-${i + 1}`;
        const inTitle = `.pillar-title-${i + 1}`;
        const inIdx = `.pillar-idx-${i + 1}`;

        tl.to(outImg, { opacity: 0, duration, ease: "power1.inOut" }, start)
          .to(
            outText,
            { opacity: 0, y: -15, duration, ease: "power1.inOut" },
            start,
          )
          .to(
            outTitle,
            {
              color: "rgba(255, 255, 255, 0.35)",
              duration,
              ease: "power1.inOut",
            },
            start,
          )
          .to(
            outIdx,
            { opacity: 0, y: 5, duration, ease: "power1.inOut" },
            start,
          );

        tl.fromTo(
          inImg,
          { opacity: 0 },
          { opacity: 1, duration, ease: "power1.inOut" },
          start,
        )
          .fromTo(
            inText,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration, ease: "power1.inOut" },
            start,
          )
          .to(
            inTitle,
            {
              color: "rgba(255, 255, 255, 1)",
              duration,
              ease: "power1.inOut",
            },
            start,
          )
          .fromTo(
            inIdx,
            { opacity: 0, y: -5 },
            { opacity: 1, y: 0, duration, ease: "power1.inOut" },
            start,
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      <div className="px-6 lg:px-16 xl:px-30 pt-16 md:pt-24 bg-background">
        <h2 className="font-display text-5xl md:text-5xl font-bold tracking-tight text-foreground">
          Por que trabalhar comigo
        </h2>
      </div>

      {isMobile ? (
        <section className="w-full bg-background min-h-screen">
          <MobileAccordion pillars={pillars} />
        </section>
      ) : (
        <div className="w-full overflow-x-clip bg-background">
          <section ref={containerRef} className="relative w-full h-svh">
            <div
              className="sticky top-0 flex h-full w-full overflow-hidden px-6 lg:px-16 xl:px-30 bg-background md:grid md:grid-cols-12"
              style={{
                contain: "layout paint",
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              <PillarDetails pillars={pillars} />
              <PillarList pillars={pillars} itemHeight={ITEM_HEIGHT} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
