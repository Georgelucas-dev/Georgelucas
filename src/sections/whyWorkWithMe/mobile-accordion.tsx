// src/sections/whyWorkWithMe/mobile-accordion.tsx
import { useState } from "react";
import { cn } from "../../lib/utils";
import type { Pillar } from "../../data/pillars-data";

export function MobileAccordion({ pillars }: { pillars: Pillar[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col py-20 px-6 bg-background">
      <div className="flex flex-col gap-2">
        {pillars.map((pillar, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={pillar.id} className="flex flex-col w-full">
              {/* Item clicável — só cor muda, sem crescer/encolher */}
              <button
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="py-2 text-left w-full"
              >
                <h2
                  className={cn(
                    "font-display font-black uppercase tracking-[-0.05em] select-none text-[8vw] transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground/35",
                  )}
                >
                  {pillar.title}
                </h2>
              </button>

              {/* Altura via CSS puro (grid-rows trick) — sem medir "auto" via JS a cada abertura */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  {/* Conteúdo desliza de cima pra baixo, com leve atraso em relação à altura */}
                  <div
                    className={cn(
                      "flex flex-col gap-6 pb-12 pt-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "opacity-100 translate-y-0 delay-[120ms]"
                        : "opacity-0 -translate-y-3 delay-[0ms]",
                    )}
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900 border border-border/50">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="h-full w-full object-cover brightness-[0.85] contrast-[1.05]"
                        loading="lazy"
                      />
                    </div>

                    {/* Textos Detalhados */}
                    <div className="flex flex-col font-sans text-sm text-foreground">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}