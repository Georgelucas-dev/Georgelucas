
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScatterTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const text =
    "Desenvolvo interfaces modernas, rápidas e intuitivas. Transformo ideias em produtos digitais com foco em performance, experiência do usuário e atenção aos detalhes.";
  const words = text.split(" ");

  useEffect(() => {
    const words = wordsRef.current;
    const totalWords = words.length;

    words.forEach((word, index) => {
      const startRange = (index / totalWords) * 0.8;
      const endRange = Math.min(startRange + 0.2, 1);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Suavização equivalente ao spring
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress < startRange) {
            gsap.set(word, { x: "100vw", opacity: 0 });
          } else if (progress >= endRange) {
            gsap.set(word, { x: "0px", opacity: 1 });
          } else {
            const wordProgress = (progress - startRange) / (endRange - startRange);
            const xValue = 100 - wordProgress * 100;
            const opacityValue = Math.min(wordProgress * 10, 1);

            gsap.set(word, {
              x: `${xValue}vw`,
              opacity: opacityValue,
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background w-full"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden px-6 md:pl-32 lg:pl-48 md:pr-12 bg-background pb-16 md:pb-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-muted)/20%_0%,transparent_70%)]" />

        <div className="relative z-10 w-full flex flex-wrap justify-start text-left">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="inline-block mr-3 md:mr-4 lg:mr-5 mb-2 md:mb-4 font-display text-4xl md:text-5xl lg:text-[4vw] leading-[1.1] font-medium tracking-tight text-foreground will-change-transform"
              style={{ transform: "translateX(100vw)", opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}