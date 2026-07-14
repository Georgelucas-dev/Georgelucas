// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Verifica se é mobile para renderizar componentes diferentes
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 1.2,
  });

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (isMobile) return; // Desativa cálculos de scroll no mobile
    const calculatedIndex = Math.floor(latest * pillars.length);
    const clampedIndex = Math.max(
      0,
      Math.min(calculatedIndex, pillars.length - 1),
    );

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  // ====== RENDERIZAÇÃO MOBILE ======
  if (isMobile) {
    return (
      <section className="w-full bg-background min-h-screen">
        <MobileAccordion pillars={pillars} />
      </section>
    );
  }

  // ====== RENDERIZAÇÃO DESKTOP ======
  const itemHeight = 120;
  const yOffset = ((pillars.length - 1) / 2 - activeIndex) * itemHeight;

  return (
    <section
      ref={containerRef}
      className="relative h-[450vh] bg-background w-full"
    >
      <div className="sticky top-0 flex h-[100svh] w-full grid-cols-12 overflow-hidden px-12 lg:px-24 bg-background will-change-transform md:grid">
        <PillarDetails activePillar={pillars[activeIndex]} />
        <PillarList
          pillars={pillars}
          activeIndex={activeIndex}
          itemHeight={itemHeight}
          yOffset={yOffset}
        />
      </div>
    </section>
  );
}
