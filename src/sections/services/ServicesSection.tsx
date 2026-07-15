// src/components/services/ServicesSection.tsx
import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { services, type Service } from "../../data/services-data";
import { ServiceDrawer } from "./ServiceDrawer";

export function ServicesSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Mágica Awwwards: Calcula a distância exata do título até a borda da tela
  // para alinhar o carrossel perfeitamente à esquerda, deixando-o livre à direita.
  useEffect(() => {
    const updateOffset = () => {
      if (titleRef.current) {
        setLeftOffset(titleRef.current.getBoundingClientRect().left);
      }
    };

    updateOffset();
    // Timeout rápido para garantir precisão após o carregamento das fontes
    setTimeout(updateOffset, 100);

    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.4;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-background py-24 md:py-32 overflow-hidden flex flex-col justify-center gap-12">
      {/* TOPO: Grade centralizada */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 grid grid-cols-12">
        <div className="hidden lg:col-span-1 lg:flex flex-col justify-start">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 origin-left rotate-90 translate-y-24 whitespace-nowrap">
            Types of activities
          </span>
        </div>
        <div className="col-span-12 lg:col-span-11">
          <h2
            ref={titleRef}
            className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter"
          >
            What we do
          </h2>
        </div>
      </div>

      {/* CARROSSEL: Largura total (Bleed na Direita) com padding dinâmico na Esquerda */}
      <div className="w-full">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 pr-6 md:pr-16"
          style={{
            // Aplica o alinhamento exato à esquerda ou um fallback seguro
            paddingLeft: leftOffset !== null ? `${leftOffset}px` : "1.5rem",
            scrollPaddingLeft:
              leftOffset !== null ? `${leftOffset}px` : "1.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              /* TRUQUE ANTI-TREMOR: Força aceleração de hardware e bloqueia repintura de subpixels */
              style={{
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                WebkitFontSmoothing: "antialiased",
              }}
              /* BORDAS RETAS (rounded-none) e transição fluida na curva cubic-bezier */
              className={`snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[32vw] xl:w-[28vw] aspect-[4/5] rounded-none p-8 md:p-10 bg-gradient-to-br ${service.bgGradient} flex flex-col justify-between cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] shadow-xl will-change-transform origin-center`}
            >
              {/* Indicador superior */}
              <div className="flex justify-end opacity-40 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                <svg
                  className="w-6 h-6 rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              {/* Título do Card - Removido o hover scale no texto para evitar o tremor */}
              <h3 className="font-display font-bold text-3xl md:text-4xl text-center mb-10 text-white">
                {service.title}
              </h3>

              {/* Grafismo decorativo */}
              <div className="w-full h-1/3 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-4/5 h-[1px] bg-white/20 relative">
                  <div className="absolute top-[-4px] right-[20%] w-2 h-2 rounded-full bg-white shadow-lg group-hover:right-[10%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RODAPÉ: Alinhado no mesmo Grid do Título */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 grid grid-cols-12 pt-8 border-t border-zinc-900">
        {/* Espaçador lg */}
        <div className="hidden lg:block lg:col-span-1"></div>

        <div className="col-span-12 lg:col-span-11 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Setas de Controle */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center hover:bg-zinc-900 active:scale-95 transition-all duration-200"
            >
              <svg
                className="w-6 h-6 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center hover:bg-zinc-900 active:scale-95 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Texto Conceitual (Alinhado à direita no desktop) */}
          <div className="flex flex-col gap-4 text-zinc-500 font-sans text-sm md:text-base md:max-w-xl md:text-right">
            <p className="text-zinc-300 font-medium leading-relaxed">
              Meu foco é entregar sites e aplicações que não só ficam bonitos,
              mas realmente geram resultados para quem contrata.
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Com conhecimento sólido em React, Node.js e design de interfaces,
              crio experiências modernas, rápidas e fáceis de usar.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDrawer
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
