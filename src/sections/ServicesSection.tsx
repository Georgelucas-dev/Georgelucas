import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesCards } from "../../src/data/services-cards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-bounce">
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = String(servicesCards.length).padStart(2, "0");

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP: Efeito Premium de Stacking Cards
      mm.add("(min-width: 1024px)", () => {
        const wrappers = gsap.utils.toArray<HTMLElement>(".service-wrapper");

        // 1. A tela de introdução diminui e some
        gsap.to(".intro-screen", {
          scrollTrigger: {
            trigger: wrappers[0],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          scale: 0.85,
          opacity: 0,
          y: -50,
          transformOrigin: "top center",
          ease: "none",
        });

        // 2. Lógica de Empilhamento dos Cards
        wrappers.forEach((wrapper, i) => {
          const inner = wrapper.querySelector(".service-inner");
          const nextWrapper = wrappers[i + 1];

          // NOVO: Esconde completamente quando 2 cards à frente aparecem
          const twoCardsAhead = wrappers[i + 2];
          if (twoCardsAhead) {
            gsap.to(inner, {
              scrollTrigger: {
                trigger: twoCardsAhead,
                start: "top bottom",
                end: "top 80%",
                scrub: true,
              },
              opacity: 0,
              visibility: "hidden",
              ease: "none",
            });
          }

          // Encolhe quando o próximo card sobe
          if (nextWrapper) {
            gsap.to(inner, {
              scrollTrigger: {
                trigger: nextWrapper,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
              scale: 0.92,
              opacity: 0.4,
              borderRadius: "32px",
              transformOrigin: "top center",
              ease: "none",
            });
          }

          // 3. Animações INTERNAS (Parallax)
          const header = wrapper.querySelector(".service-header");
          const mockup = wrapper.querySelector(".service-mockup");

          gsap.fromTo(
            header,
            { y: 80, opacity: 0 },
            {
              scrollTrigger: {
                trigger: wrapper,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
              y: 0,
              opacity: 1,
              ease: "power2.out",
            },
          );

          gsap.fromTo(
            mockup,
            { y: 150, opacity: 0 },
            {
              scrollTrigger: {
                trigger: wrapper,
                start: "top 90%",
                end: "top 40%",
                scrub: 1.5,
              },
              y: 0,
              opacity: 1,
              ease: "power2.out",
            },
          );
        });
      });

      // MOBILE: Animações de entrada suaves
      mm.add("(max-width: 1023px)", () => {
        const inners = gsap.utils.toArray<HTMLElement>(".service-inner");
        inners.forEach((inner) => {
          gsap.from(inner, {
            scrollTrigger: {
              trigger: inner,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background">
      {/* TELA DE ABERTURA */}
      <section className="intro-screen relative w-full min-h-[100svh] bg-background text-foreground flex flex-col justify-between px-6 md:px-12 pt-12 md:pt-16 pb-12 will-change-transform">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
            O que eu ofereço
          </span>
          <span className="font-mono text-xs md:text-sm text-muted-foreground">
            {total} serviços
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <h2 className="font-display font-medium text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tighter">
            Meus
            <br />
            Serviços
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
            Do primeiro esboço à entrega final — cada projeto combina design,
            código e performance sob medida pro que o seu negócio precisa.
          </p>

          <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs uppercase tracking-widest">
            <ArrowDownIcon />
            <span>Role para explorar</span>
          </div>
        </div>
      </section>

      {/* CARDS */}
      {servicesCards.map((service, index) => (
        <div
          key={service.id}
          className="service-wrapper relative lg:sticky lg:top-0 w-full min-h-[100svh] lg:h-[100svh]"
          style={{ zIndex: index + 1 }}
        >
          <section
            className={`service-inner w-full h-full flex flex-col justify-between overflow-hidden will-change-transform ${service.bgColor} ${service.textColor}`}
          >
            {/* Header Animado */}
            <div className="service-header flex-1 px-6 md:px-12 pb-8 lg:pb-16 pt-12 md:pt-16 flex justify-between items-start">
              <h2 className="font-display font-medium text-2xl sm:text-7xl md:text-6xl lg:text-[5rem] xl:text-[7rem] leading-[0.85] tracking-tighter whitespace-pre-line">
                {service.title}
              </h2>
              <span
                className={`font-display font-medium text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] leading-[0.85] tracking-tighter ${service.numberColor}`}
              >
                {service.id}
              </span>
            </div>

            {/* Grid Inferior */}
            <div
              className={`h-auto lg:h-[40%] border-t ${service.borderColor} grid grid-cols-1 lg:grid-cols-12 mb-20 lg:mb-28`}
            >
              <div className="col-span-1 lg:col-span-8 p-6 md:p-10 lg:p-12 flex flex-col justify-between gap-10 lg:gap-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
                  <div className="col-span-1">
                    <span className="text-sm font-medium uppercase tracking-widest opacity-90">
                      {service.label}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                      {service.text1}
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                      {service.text2}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6 lg:pt-0">
                  <button
                    className={`pb-1 border-b ${service.borderColor} hover:opacity-60 transition-opacity text-sm font-medium`}
                  >
                    {service.actionText}
                  </button>
                </div>
              </div>

              {/* Mockup Animado */}
              <div
                className={`service-mockup col-span-1 lg:col-span-4 relative border-t lg:border-t-0 lg:border-l ${service.borderColor} bg-black/5 flex items-end justify-center min-h-[25vh] lg:min-h-full overflow-hidden`}
              >
                <div className="w-[85%] h-[80%] bg-[#111] mt-8 rounded-t-xl shadow-2xl border border-white/10 flex items-center justify-center relative">
                  <span className="text-white/30 text-xs">Image / Mockup</span>
                  <div className="absolute -bottom-2 w-[110%] h-4 bg-[#222] rounded-b-xl shadow-xl"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
