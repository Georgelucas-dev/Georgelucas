// src/sections/WhyWorkWithMe.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../data/pillars-data";
import { whyWorkWithMeData } from "../data/whyWorkWithMe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".pillar-card");

      const mm = gsap.matchMedia();

      // DESKTOP: Entrada em Z-Pattern
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, index) => {
          const isLeft = index % 2 === 0;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 150,
              x: isLeft ? -50 : 50,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      // MOBILE: Entrada linear
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="diferenciais"
      className="relative w-full bg-background text-ink overflow-clip"
    >
      {/* TELA PRESA (STICKY BACKGROUND) */}
      <div className="sticky top-0 w-full h-[100svh] flex flex-col items-center justify-center pointer-events-none z-0 px-6">
        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-ink-soft mb-6 text-center">
          {whyWorkWithMeData.badge}
        </p>
        <h2 className="font-display font-bold text-[12vw] leading-[0.8] tracking-tighter text-ink/5 uppercase whitespace-nowrap select-none text-center">
          O QUE VOCÊ
          <br />
          LEVA
        </h2>
      </div>

      {/* CARDS EDITORIAIS, SEM BORDA ARREDONDADA */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 -mt-[100svh]">
        <div className="pt-[100svh] pb-[100svh] flex flex-col gap-12 md:gap-32">
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={pillar.id}
                className={`pillar-card group relative flex flex-col w-full md:w-[45%] bg-paper/40 backdrop-blur-2xl border border-ink/15 hover:border-ink/40 hover:-translate-y-1 transition-all duration-500 will-change-transform ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                {/* Marcas de canto — o único acento decorativo, acende no hover */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-ink/30 group-hover:border-clay transition-colors duration-500" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-ink/30 group-hover:border-clay transition-colors duration-500" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-ink/30 group-hover:border-clay transition-colors duration-500" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-ink/30 group-hover:border-clay transition-colors duration-500" />

                <div className="flex flex-col gap-6 md:gap-8 p-8 md:p-12">
                  {/* Número editorial */}
                  <span className="font-display text-6xl md:text-7xl font-extralight text-ink/20 group-hover:text-clay leading-none tracking-tighter transition-colors duration-500">
                    {pillar.index}
                  </span>

                  {/* Título */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ink uppercase tracking-tight leading-[0.95]">
                    {pillar.title}
                  </h3>

                  {/* Parágrafo */}
                  <p className="font-sans text-sm md:text-base text-ink-soft leading-relaxed font-light max-w-md">
                    {pillar.paragraph}
                  </p>

                  {/* Linha que se desenha no hover */}
                  <div className="h-px w-10 bg-ink/20 group-hover:w-full group-hover:bg-clay transition-all duration-700 ease-out" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
