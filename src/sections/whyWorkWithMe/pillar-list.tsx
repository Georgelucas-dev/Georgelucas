import type { Pillar } from "../../data/pillars-data";
import { motion } from "motion/react";

interface PillarListProps {
  pillars: Pillar[];
  activeIndex: number;
  itemHeight: number;
  yOffset: number;
}

export function PillarList({ pillars, activeIndex, itemHeight, yOffset }: PillarListProps) {
  const activePillar = pillars[activeIndex];

  return (
    <div className="col-span-12 md:col-span-7 relative flex items-center justify-center h-[35svh] md:h-full border-t md:border-t-0 md:border-l border-border/10">
      
      {/* Index Flutuante fixado à esquerda (left-4 ou left-8) */}
      <div className="absolute left-4 md:left-8 font-mono text-xs md:text-sm text-muted-foreground tracking-widest hidden sm:block">
        {activePillar?.index || "01"}
      </div>

      {/* GAP GARANTIDO: Adicionado px-4 md:px-24 para que o texto nunca invada a área do número */}
      <div 
        className="relative flex items-center justify-center w-full overflow-hidden px-4 md:px-24"
        style={{ height: itemHeight * 3 }}
      >
        <motion.div
          animate={{ y: yOffset }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 0.8,
          }}
          className="absolute flex flex-col items-center will-change-transform w-full"
        >
          {pillars.map((pillar, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={pillar.id}
                style={{ height: itemHeight }}
                className="flex items-center justify-center w-full text-center"
              >
                <h2
                  className={`
                    transition-all duration-300 font-display font-black uppercase tracking-[-0.05em] select-none
                    ${
                      isActive
                        ? "text-2xl md:text-[3.5vw] text-foreground scale-100 opacity-100"
                        : "text-xl md:text-[2vw] text-muted-foreground/15 scale-90 opacity-20"
                    }
                  `}
                >
                  {pillar.title}
                </h2>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}