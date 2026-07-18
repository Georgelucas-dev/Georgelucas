// src/sections/whyWorkWithMe/pillar-list.tsx
import { motion, MotionValue, useTransform, useSpring } from "motion/react";
import { type Pillar } from "../../data/pillars-data";

interface PillarListProps {
  pillars: Pillar[];
  y: MotionValue<number>;
  activeIndex: MotionValue<number>;
  itemHeight: number;
}

export function PillarList({
  pillars,
  y,
  activeIndex,
  itemHeight,
}: PillarListProps) {
  return (
    <div className="col-span-6 flex flex-col justify-center h-full relative">
      <motion.div style={{ y }} className="flex flex-col items-start w-full">
        {pillars.map((pillar, i) => {
          // Alvo binário: 1 quando ESTE é o item mais próximo do scroll,
          // 0 nos demais. activeIndex sempre aponta pra um item válido,
          // então sempre existe um alvo 1 — nunca "nenhum".
          const target = useTransform(activeIndex, (idx) =>
            idx === i ? 1 : 0,
          );
          const highlight = useSpring(target, {
            stiffness: 260,
            damping: 30,
          });

          const color = useTransform(
            highlight,
            [0, 1],
            ["rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 1)"],
          );

          return (
            <motion.div
              key={pillar.id}
              style={{ height: itemHeight, color }}
              className="flex items-center w-full"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                {pillar.title}
              </h2>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
