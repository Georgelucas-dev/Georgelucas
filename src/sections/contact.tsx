// sections/contact.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        circleRef.current,
        {
          // Aumentamos a escala drásticamente porque a bolinha inicial agora é bem pequena
          scale: 35,
          ease: "power2.inOut",
        },
        0,
      );

      tl.fromTo(
        titleRef.current,
        { x: "100%" },
        {
          x: 0,
          ease: "power2.out",
        },
        0,
      );

      tl.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0.3,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-x-clip bg-background">
      <section
        id="contact"
        ref={containerRef}
        className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center"
      >
        {/* 
          A BOLINHA INICIAL
          Reduzida de 60vw para 10vw (e a margem negativa para metade do tamanho: 5vw)
        */}
        <div
          ref={circleRef}
          className="absolute top-full left-1/2 w-[10vw] h-[10vw] -mt-[5vw] -ml-[5vw] rounded-full bg-foreground will-change-transform"
        />

        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-24 pb-12 text-background">
          <div className="flex-1 flex items-center">
            <h2
              ref={titleRef}
              className="font-display font-bold text-[14vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap will-change-transform"
            >
              Contact
            </h2>
          </div>

          <div
            ref={linksRef}
            className="flex flex-col gap-1 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold will-change-transform"
          >
            <a
              href="https://wa.me/55SEUNUMEROAQUI"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              WhatsApp
            </a>
            <a
              href="mailto:seuemail@gmail.com"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              Gmail
            </a>
            <a
              href="https://github.com/seugithub"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/seulinkedin"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
