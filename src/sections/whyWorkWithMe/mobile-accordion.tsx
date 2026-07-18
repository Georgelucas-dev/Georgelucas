// src/sections/whyWorkWithMe/mobile-accordion.tsx
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import type { Pillar } from "../../data/pillars-data";

export function MobileAccordion({ pillars }: { pillars: Pillar[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Guardamos o contexto do GSAP em uma ref para não perdê-lo a cada re-render
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // 1. Cria o contexto principal uma única vez quando o componente monta
    ctxRef.current = gsap.context(() => {}, containerRef);

    // Limpa a memória quando sai da tela
    return () => ctxRef.current?.revert();
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;

    // 2. Sempre que o activeIndex mudar, injetamos as novas animações no contexto
    ctxRef.current.add(() => {
      pillars.forEach((_, i) => {
        const isActive = activeIndex === i;
        const content = `.accordion-content-${i}`;
        const title = `.accordion-title-${i}`;

        // Anima a altura de 0 para "auto" e vice-versa
        gsap.to(content, {
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: "auto", // Se o usuário clicar rápido, ele sobrescreve a animação anterior sem bugar
        });

        // Transição da cor do título
        gsap.to(title, {
          color: isActive
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.35)",
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      });
    });
  }, [activeIndex, pillars]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col py-20 px-6 bg-background"
    >
      <div className="flex flex-col gap-2">
        {pillars.map((pillar, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={pillar.id}
              className="flex flex-col w-full transform-gpu"
              style={{ contain: "layout paint" }}
            >
              <button
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="py-2 text-left w-full outline-none"
              >
                <h2
                  // Aplicamos o estilo inline inicial para que o primeiro render já saia com a cor certa
                  style={{
                    color: isActive
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.35)",
                  }}
                  className={`accordion-title-${index} font-display font-black uppercase tracking-[-0.05em] select-none text-[8vw]`}
                >
                  {pillar.title}
                </h2>
              </button>

              {/* 
                Wrapper do conteúdo.
                Removidas todas as classes de transição do Tailwind e o hack do Grid.
              */}
              <div
                className={`accordion-content-${index} overflow-hidden`}
                // Estilos iniciais para o React injetar na DOM antes do GSAP agir
                style={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                }}
                aria-hidden={!isActive}
              >
                <div className="flex flex-col gap-6 pb-12 pt-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 shrink-0 transform-gpu">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col font-sans text-sm text-foreground transform-gpu">
                    <div className="flex flex-col border-t border-border/40 py-4 gap-2">
                      <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                        Overview
                      </span>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {pillar.overview}
                      </p>
                    </div>

                    <div className="flex flex-col border-t border-b border-border/40 py-4 gap-2">
                      <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                        Garantia
                      </span>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {pillar.metrics.map((metric) => (
                          <div key={metric.label} className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground">
                              {metric.label}
                            </span>
                            <span className="text-sm font-semibold mt-0.5">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
