// components/Loader.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHero } from "@/context/HeroContext";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { setHeroVisivel } = useHero();

  useEffect(() => {
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      // ── 1. PROGRESSO E APARIÇÃO DOS ELEMENTOS ──
      const mainTl = gsap.timeline();

      // Linha de progresso (barra fina superior)
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left" });

      // Nome começa menor e ligeiramente abaixo, sobe com bounce
      gsap.set(nameWrapperRef.current, {
        scale: 0.6,
        y: 40,
        opacity: 0,
      });

      // Subtítulo começa invisível e baixo
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });

      // Animação da barra e do contador
      gsap.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "power3.inOut",
        onUpdate: () => {
          const current = Math.round(counter.val);
          if (progressTextRef.current)
            progressTextRef.current.innerText = `${current}%`;
        },
      });

      // A barra acompanha o progresso
      gsap.to(progressLineRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: "power3.inOut",
      });

      // O nome aparece com um stagger de letras, efeito "magnetic"
      mainTl
        .fromTo(
          ".loader-name-char",
          { y: 30, opacity: 0, rotationZ: -4 },
          {
            y: 0,
            opacity: 1,
            rotationZ: 0,
            duration: 0.7,
            stagger: {
              each: 0.04,
              from: "center",
            },
            ease: "back.out(2)",
          },
          0.3, // começa cedo, quase junto com a barra
        )
        .fromTo(
          nameWrapperRef.current,
          {
            scale: 0.6,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1,0.5)",
          },
          "<0.1",
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );

      // ── 2. SEQUÊNCIA DE SAÍDA (merge com o Hero) ──
      function triggerExit() {
        // Avisa o contexto que o hero pode começar a ficar visível
        setHeroVisivel(true);

        const exitTl = gsap.timeline({ onComplete });

        // Linha de progresso se retrai rapidamente
        exitTl.to(progressLineRef.current, {
          scaleX: 0,
          duration: 0.25,
          ease: "power2.in",
        });

        // Subtítulo some suavemente
        exitTl.to(
          subtitleRef.current,
          { opacity: 0, y: -10, duration: 0.3 },
          "<",
        );

        // O nome "George" desce até a posição que terá no Hero
        // (ajuste os valores conforme seu viewport, aqui usei vh relativo)
        exitTl.to(
          nameWrapperRef.current,
          {
            y: "80vh", // move para a parte inferior
            scale: 1.8, // aumenta um pouco para igualar o tamanho do hero
            duration: 0.8,
            ease: "power4.inOut",
          },
          ">0.1",
        );

        // Fundo transita de bg-foreground para bg-background (como o hero)
        exitTl.to(
          containerRef.current,
          {
            backgroundColor: "var(--color-background)", // bg-background do seu tema
            duration: 0.6,
            ease: "none",
          },
          "<0.2",
        );

        // Aos poucos o nome some para revelar o verdadeiro elemento do Hero
        // (o hero já terá o seu próprio "George" posicionado, que deve aparecer com opacidade)
        exitTl.to(
          nameWrapperRef.current,
          { opacity: 0, duration: 0.4, ease: "power2.in" },
          ">0.2",
        );

        // Remove completamente o overlay
        exitTl.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });
      }

      // Dispara a saída assim que o contador atinge 100%
      gsap.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.delayedCall(0.4, triggerExit);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, setHeroVisivel]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground text-background overflow-hidden pointer-events-none"
    >
      {/* Linha de progresso no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-background/20">
        <div
          ref={progressLineRef}
          className="h-full bg-background origin-left"
        />
      </div>

      {/* Contador de porcentagem (posicionado na esquerda inferior) */}
      <span
        ref={progressTextRef}
        className="absolute bottom-6 left-6 font-mono text-xs tracking-[0.2em] text-background/60"
      >
        0%
      </span>

      {/* Nome e subtítulo centrais */}
      <div ref={nameWrapperRef} className="flex flex-col items-center">
        <h1 className="flex font-display font-black text-[15vw] leading-none tracking-tighter text-sage uppercase will-change-transform">
          {"George".split("").map((char, i) => (
            <span
              key={i}
              className="loader-name-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-2 text-xs sm:text-sm uppercase tracking-[0.35em] text-background/70 font-light"
        >
          Design & Código
        </p>
      </div>
    </div>
  );
}
