// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring } from "motion/react";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

const MOBILE_QUERY = "(max-width: 767px)";
const VH_PER_ITEM = 35;
const ITEM_HEIGHT = 120;

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Contínuo — usado só pra posicionar (scroll) a lista suavemente.
  const fractionalIndex = useTransform(scrollYProgress, (v) => {
    const raw = v * pillars.length;
    return Math.max(0, Math.min(raw, pillars.length - 1));
  });

  // Discreto — sempre um índice inteiro válido (0..length-1).
  // Por estar clampado, NUNCA existe um estado "nada selecionado":
  // sempre há exatamente um item ativo, o que era o pedido.
  const activeIndex = useTransform(fractionalIndex, (v) => Math.round(v));

  const rawY = useTransform(
    fractionalIndex,
    (i) => ((pillars.length - 1) / 2 - i) * ITEM_HEIGHT,
  );

  const smoothY = useSpring(rawY, {
    stiffness: 90,
    damping: 22,
    mass: 0.7,
  });

  return (
    <>
      <div className="px-6 lg:px-16 xl:px-30 pt-16 md:pt-24 pb-8 md:pb-12 bg-background">
        <h2 className="font-display text-5xl md:text-5xl font-bold tracking-tight text-foreground">
          Por que trabalhar comigo
        </h2>
      </div>

      {isMobile ? (
        <section className="w-full bg-background min-h-screen">
          <MobileAccordion pillars={pillars} />
        </section>
      ) : (
        <section
          ref={containerRef}
          className="relative bg-background w-full"
          style={{ height: `${pillars.length * VH_PER_ITEM}vh` }}
        >
          <div
            className="sticky top-0 flex h-svh w-full overflow-hidden px-6 lg:px-16 xl:px-30 bg-background md:grid md:grid-cols-12 md:gap-x-12 lg:gap-x-20 xl:gap-x-24"
            style={{
              contain: "layout paint",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <PillarDetails pillars={pillars} activeIndex={activeIndex} />
            <PillarList
              pillars={pillars}
              activeIndex={activeIndex}
              itemHeight={ITEM_HEIGHT}
              y={smoothY}
            />
          </div>
        </section>
      )}
    </>
  );
}
