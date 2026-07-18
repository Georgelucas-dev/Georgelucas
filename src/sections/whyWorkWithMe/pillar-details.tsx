// src/sections/whyWorkWithMe/pillar-details.tsx
import { motion, MotionValue, useTransform, useSpring } from "motion/react";
import { type Pillar } from "../../data/pillars-data";

interface PillarDetailsProps {
  pillars: Pillar[];
  activeIndex: MotionValue<number>;
}

export function PillarDetails({
  pillars,
  activeIndex,
}: PillarDetailsProps) {
  return (
    <div className="col-span-6 relative h-full flex items-center justify-center">
      <div className="relative w-full h-[420px]">
        {pillars.map((pillar, i) => {
          const target = useTransform(activeIndex, (idx) =>
            idx === i ? 1 : 0,
          );
          const highlight = useSpring(target, {
            stiffness: 220,
            damping: 26,
          });

          const y = useTransform(highlight, [0, 1], [16, 0]);
          const blur = useTransform(
            highlight,
            [0, 1],
            ["blur(6px)", "blur(0px)"],
          );
          const pointerEvents = useTransform(highlight, (val) =>
            val > 0.5 ? "auto" : "none",
          );

          return (
            <motion.div
              key={pillar.id}
              style={{
                opacity: highlight,
                y,
                filter: blur,
                pointerEvents,
                willChange: "transform, opacity, filter",
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <dl className="w-full">
                <div className="grid grid-cols-[140px_1fr] gap-x-8 py-5 border-b border-border">
                  <dt className="text-sm text-muted-foreground">Overview</dt>
                  <dd className="text-base text-foreground leading-relaxed">
                    {pillar.overview}
                  </dd>
                </div>

                {pillar.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-[140px_1fr] gap-x-8 py-5 border-b border-border last:border-b-0"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {metric.label}
                    </dt>
                    <dd className="text-base text-foreground">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}