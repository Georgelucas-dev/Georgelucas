"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // reveal each line by wiping it up from behind a mask
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      });

      // fade + rise the meta blocks with a stagger
      gsap.from("[data-fade]", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 55%",
        },
      });

      // draw the framing lines
      gsap.from("[data-line-x]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      // slow parallax drift on the vertical labels
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.to(el, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative min-h-screen bg-background text-foreground font-sans flex flex-col justify-center py-24"
    >
      {/* section index / eyebrow */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div
          data-fade
          className="flex items-baseline justify-between border-b border-border pb-6"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            (01) — Sobre
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Um pouco sobre mim
          </span>
        </div>
      </div>

      {/* massive display headline */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 md:pt-24">
        <div className="overflow-hidden">
          <h1
            data-reveal
            className="font-display font-semibold leading-[0.86] tracking-tight text-[clamp(3.5rem,13vw,11rem)]"
          >
            Sou George
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            data-reveal
            className="font-display font-semibold leading-[0.86] tracking-tight text-[clamp(3.5rem,13vw,11rem)] text-ink-soft"
          >
            Lucas<span className="text-clay">*</span>
          </h1>
        </div>
      </div>

      {/* content grid */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-12">
          {/* vertical drifting label */}
          <div className="hidden md:flex md:col-span-1 items-start justify-center">
            <span
              data-drift
              className="text-[0.7rem] uppercase tracking-[0.4em] text-ink-soft [writing-mode:vertical-rl]"
            >
              Engenharia · LLMs
            </span>
          </div>

          {/* bio */}
          <div data-fade className="md:col-span-6">
            <p className="text-xl md:text-2xl leading-relaxed text-ink">
              Oi! Sou George Lucas, estudante de Engenharia de Software e
              entusiasta de LLMs. Tenho uma grande paixão por tecnologia e gosto
              de explorar novas ferramentas e frameworks.
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft max-w-xl">
              Meu objetivo é criar soluções inovadoras que causem um impacto
              positivo na vida das pessoas.
            </p>

            <div
              data-line-x
              className="mt-12 h-px w-full origin-left bg-border"
            />

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <a
                href="#projects"
                data-fade
                className="group flex items-center justify-between border border-border px-6 py-5 transition-colors hover:bg-card"
              >
                <span className="text-lg">Ver Projetos</span>
                <span className="text-clay transition-transform duration-300 group-hover:translate-x-1">
                  Confira →
                </span>
              </a>
              <a
                href="#contact"
                data-fade
                className="group flex items-center justify-between border border-border px-6 py-5 transition-colors hover:bg-card"
              >
                <span className="text-lg">Converse comigo</span>
                <span className="text-clay transition-transform duration-300 group-hover:translate-x-1">
                  Enviar →
                </span>
              </a>
            </div>
          </div>

          {/* footnotes + socials */}
          <div className="md:col-span-4 md:col-start-9">
            <div data-fade className="space-y-8">
              <p className="text-base leading-relaxed text-clay">
                <span className="mr-2 align-super text-xs">*</span>
                dev focado em construir projetos reais, não apenas teoria.
              </p>
              <p className="text-base leading-relaxed text-clay">
                <span className="mr-2 align-super text-xs">**</span>
                entusiasta de LLMs, explorando o potencial de IA no
                desenvolvimento de software.
              </p>
            </div>

            <div
              data-line-x
              className="mt-12 h-px w-full origin-left bg-border"
            />

            <ul data-fade className="mt-8 flex flex-col gap-4">
              {[
                { label: "GitHub", href: "https://github.com/Georgelucas-dev" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/george-lucas/",
                },
                { label: "Email", href: "mailto:george.lucas@example.com" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-lg text-ink transition-colors hover:text-clay"
                  >
                    <span>{s.label}</span>
                    <span className="text-ink-soft transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
