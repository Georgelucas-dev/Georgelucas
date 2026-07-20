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

      // DESKTOP: Animação vindo de baixo e das laterais
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

      // MOBILE: Animação apenas subindo
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
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-ink-soft mb-6 text-center">
          {whyWorkWithMeData.badge}
        </p>
        <h2 className="font-display font-bold text-[12vw] leading-[0.8] tracking-tighter text-ink/5 uppercase whitespace-nowrap select-none text-center">
          O QUE VOCÊ
          <br />
          LEVA
        </h2>
      </div>

      {/* CARDS QUE SOBEM */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 -mt-[100svh]">
        {/* 
          A MÁGICA ACONTECE AQUI NO pt-[100svh] e pb-[100svh]:
          O 'pt' garante que a primeira rolagem mostre só o texto.
          O 'pb' garante que, após o último card, haja espaço suficiente de rolagem 
          para ele cruzar todo o monitor até sumir pelo topo antes de a seção acabar.
        */}
        <div className="pt-[100svh] pb-[100svh] flex flex-col gap-12 md:gap-32">
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={pillar.id}
                className={`pillar-card flex flex-col w-full md:w-[45%] p-8 md:p-12 bg-card/80 backdrop-blur-xl border border-border/60 rounded-none shadow-2xl will-change-transform ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs md:text-sm text-ink/50 border border-ink/20 rounded-none px-3 py-1">
                      {pillar.index}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-ink uppercase tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <h4 className="text-lg font-medium text-ink-soft mb-4 font-serif italic">
                    {pillar.subtitle}
                  </h4>

                  <p className="text-base text-ink/70 leading-relaxed mb-10">
                    {pillar.overview}
                  </p>

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
                    {pillar.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-xl md:text-2xl font-display font-bold text-ink leading-none">
                          {metric.value}
                        </span>
                        <span className="text-[10px] md:text-xs uppercase font-mono tracking-wider text-ink-soft">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
