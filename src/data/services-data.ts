// src/data/services-data.ts

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  subDescription: string;
  items: string[];
  // Cores personalizadas para o card e para o painel lateral
  bgGradient: string;
  drawerGradient: string;
}

export const services: Service[] = [
  {
    id: "websites",
    title: "Criação de Sites",
    tagline:
      "Sites modernos, rápidos e profissionais para profissionais liberais e pequenos negócios",
    description:
      "Desenvolvo sites institucionais, landing pages e portfólios com design atrativo, otimizados para conversão e ranqueamento no Google.",
    subDescription: "",
    items: [
      "Sites para psicólogos, advogados e profissionais liberais",
      "Landing Pages de alta conversão",
      "Sites institucionais",
      "Portfólios profissionais",
      "Blogs e sites de conteúdo",
    ],
    bgGradient: "from-[#1E50FF] to-[#0A1C5C]",
    drawerGradient: "from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A]",
  },
  {
    id: "web-apps",
    title: "Aplicações Web",
    tagline: "Sistemas e plataformas web personalizadas com React e Node.js",
    description:
      "Desenvolvo aplicações web completas, integradas e funcionais para automatizar processos e melhorar a gestão do seu negócio.",
    subDescription: "",
    items: [
      "Sistemas de agendamento online",
      "Dashboards administrativos",
      "Plataformas de cursos ou membros",
      "E-commerces simples",
      "CRMs e ferramentas internas",
    ],
    bgGradient: "from-[#7C3AED] to-[#4C1D95]",
    drawerGradient: "from-[#6D28D9] via-[#5B21B6] to-[#4C1D95]",
  },
  {
    id: "ux-ui",
    title: "UX/UI Design",
    tagline:
      "Interfaces bonitas, intuitivas e focadas em experiência do usuário",
    description:
      "Crio designs modernos e funcionais, pensando tanto na estética quanto na usabilidade do usuário final.",
    subDescription: "",
    items: [
      "Design de interfaces (Figma)",
      "Protótipos interativos",
      "Identidade visual para sites",
      "Redesign de sites existentes",
      "Mobile First",
    ],
    bgGradient: "from-[#FF5C00] to-[#5C2100]",
    drawerGradient: "from-[#EA580C] via-[#C2410C] to-[#7C2D12]",
  },
  {
    id: "manutencao",
    title: "Manutenção e Otimização",
    tagline:
      "Cuido do seu site para que ele continue rápido, seguro e atualizado",
    description:
      "Ofereço pacotes mensais de manutenção, atualizações, melhorias e suporte contínuo para seu site.",
    subDescription: "",
    items: [
      "Atualizações e correções",
      "Melhoria de performance",
      "Otimização SEO",
      "Suporte técnico mensal",
      "Adição de novas funcionalidades",
    ],
    bgGradient: "from-[#10B981] to-[#064E3B]",
    drawerGradient: "from-[#059669] via-[#047857] to-[#065F46]",
  },
];
