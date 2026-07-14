import type { Pillar } from "../../data/pillars-data";
import { motion, AnimatePresence } from "motion/react";

interface PillarDetailsProps {
  activePillar: Pillar;
}

export function PillarDetails({ activePillar }: PillarDetailsProps) {
  if (!activePillar) return null;

  return (
    <div className="col-span-12 md:col-span-5 flex flex-col justify-center h-[50svh] md:h-full pr-0 md:pr-10 lg:pr-16 pt-8 md:pt-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-4 md:gap-6"
        >
          {/* Header Mobile */}
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">
            Por que trabalhar comigo / {activePillar.index}
          </p>

          {/* Imagem/Mockup */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-border/50 shadow-xl will-change-transform">
            <img
              src={activePillar.image}
              alt={activePillar.title}
              className="h-full w-full object-cover brightness-[0.85] contrast-[1.05]"
              loading="eager"
            />
          </div>

          {/* Dados em Tabela */}
          <div className="mt-2 flex flex-col font-sans text-xs md:text-sm text-foreground">
            <div className="grid grid-cols-4 border-t border-border/40 py-3">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                Overview
              </span>
              <p className="col-span-3 text-muted-foreground leading-relaxed text-[11px] md:text-sm">
                {activePillar.overview}
              </p>
            </div>

            <div className="grid grid-cols-4 border-t border-border/40 py-3 hidden md:grid">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                Skills
              </span>
              <div className="col-span-3 flex flex-wrap gap-2">
                {activePillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-foreground font-mono text-[10px] bg-muted/40 px-2.5 py-1 rounded-full border border-border/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 border-t border-b border-border/40 py-3">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                Garantia
              </span>
              <div className="col-span-3 grid grid-cols-3 gap-2 md:gap-4">
                {activePillar.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="text-[9px] md:text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-xs md:text-sm font-semibold mt-0.5">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}