// src/components/services/ServiceDrawer.tsx
import { motion } from "motion/react";
import type { Service } from "../../data/services-data";

interface ServiceDrawerProps {
  service: Service;
  onClose: () => void;
}

export function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  return (
    <>
      {/* BACKDROP: Desfoca e escurece o fundo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      />

      {/* PAINEL LATERAL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 h-full w-[100vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] z-[101] flex flex-col justify-between p-8 md:p-12 text-white bg-gradient-to-b ${service.drawerGradient} shadow-2xl overflow-y-auto transform-gpu`}
      >
        {/* Topo / Botão Fechar */}
        <div className="flex justify-between items-start">
          <h3 className="font-display font-bold text-4xl md:text-5xl leading-tight">
            {service.title}
          </h3>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 active:scale-95 transition duration-200"
          >
            {/* Ícone de Fechar (X) */}
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Conteúdo Central */}
        <div className="flex flex-col gap-8 my-auto py-8">
          {/* Slogans / Descrições */}
          <div className="flex flex-col gap-4">
            <p className="text-lg md:text-xl font-medium leading-relaxed">
              {service.tagline}
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans">
              {service.description}
            </p>
          </div>

          {/* Lista de sub-serviços */}
          <div className="flex flex-col gap-2 font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-4">
            {service.items.map((item, index) => (
              <span
                key={index}
                className="block hover:translate-x-2 transition-transform duration-200 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Botões de rodapé */}
        <div className="flex gap-4 w-full pt-6 border-t border-white/10">
          <button className="flex-1 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 active:scale-98 transition duration-200">
            Get in touch
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/15 hover:bg-white/25 active:scale-98 border border-white/10 rounded-2xl transition duration-200">
            <span className="font-semibold text-sm">TG</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
