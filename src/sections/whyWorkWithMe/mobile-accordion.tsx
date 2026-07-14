// src/sections/whyWorkWithMe/mobile-accordion.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Pillar } from "../../data/pillars-data";

export function MobileAccordion({ pillars }: { pillars: Pillar[] }) {
  // Começamos com o primeiro item aberto (index 0) para o usuário entender como funciona
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col py-20 px-6 bg-background">
      {/* Título da seção (opcional, pode remover se não quiser) */}
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
        Por que trabalhar comigo
      </p>

      <div className="flex flex-col gap-2">
        {pillars.map((pillar, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={pillar.id} className="flex flex-col w-full">
              {/* O Item da Lista Clicável */}
              <button
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="py-2 text-left transition-all duration-300 w-full"
              >
                <h2
                  className={`
                    font-display font-black uppercase tracking-[-0.05em] select-none
                    transition-colors duration-300
                    ${
                      isActive
                        ? "text-[9vw] text-foreground"
                        : "text-[8vw] text-muted-foreground/30"
                    }
                  `}
                >
                  {pillar.title}
                </h2>
              </button>

              {/* O Conteúdo que expande igual sanfona */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pb-12 pt-4">
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
                        {/* Overview */}
                        <div className="flex flex-col border-t border-border/40 py-4 gap-2">
                          <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                            Overview
                          </span>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {pillar.overview}
                          </p>
                        </div>

                        {/* Garantias / Métricas */}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
