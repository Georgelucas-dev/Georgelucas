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
                  className={cn(
                    "font-display font-black uppercase tracking-[-0.05em] select-none text-[8vw] transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground/35",
                  )}
                >
                  {pillar.title}
                </h2>
              </button>

              {/*
                Grid resolve altura no compositor.
                content-visibility: auto libera trabalho de layout/paint
                nos itens colapsados sem removê-los do DOM.

                Nota: animar grid-template-rows dispara layout a cada frame
                (não é GPU-compositável como transform/opacity). Restringimos
                a transition só às duas props que mudam, em vez de "all",
                pra reduzir o trabalho que o browser precisa observar.
              */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none",
                )}
                style={{
                  willChange: isActive ? "grid-template-rows, opacity" : "auto",
                  contentVisibility: isActive ? "visible" : "auto",
                  containIntrinsicSize: "0 400px",
                }}
                aria-hidden={!isActive}
              >
                <div className="overflow-hidden">
                  {/*
                    Entrada própria do conteúdo (fade + slide sutil),
                    desacoplada da animação do grid. Isso dá a sensação
                    de "cascata" em vez do texto só aparecer colado
                    à expansão do container.
                  */}
                  <div
                    className={cn(
                      "flex flex-col font-sans text-sm text-foreground pb-12 pt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "opacity-100 translate-y-0 delay-100"
                        : "opacity-0 -translate-y-2",
                    )}
                  >
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
