// src/data/pillars-data.ts

export interface Pillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
}

export const pillars: Pillar[] = [
  {
    id: "design-moderno",
    index: "01",
    title: "DESIGN MODERNO",
    subtitle: "Visual premium e estratégico",
    overview: "Design alinhado à identidade da sua marca, utilizando tendências atuais de mercado para criar uma autoridade imediata desde o primeiro contato.",
    tags: ["Branding", "Modern UI", "Layout", "Visual Identity"],
    metrics: [{ label: "Estilo", value: "Premium" }, { label: "Marca", value: "Forte" }, { label: "Reconhecimento", value: "Alto" }],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "foco-conversao",
    index: "02",
    title: "FOCO EM CONVERSÃO",
    subtitle: "Estratégia focada em resultados",
    overview: "Cada botão, seção e chamada de ação é desenhado estrategicamente para guiar o visitante pelo funil até o fechamento do negócio.",
    tags: ["Call-to-Action", "Growth", "Funnel", "Sales"],
    metrics: [{ label: "CTR", value: "Otimizado" }, { label: "Conversão", value: "Alta" }, { label: "ROI", value: "Focado" }],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "whatsapp",
    index: "03",
    title: "WHATSAPP INTEGRADO",
    subtitle: "Atendimento direto e rápido",
    overview: "Nada de formulários complexos. Integro botões de WhatsApp de forma inteligente, garantindo que o cliente fale com você em um único clique.",
    tags: ["API", "Direct Chat", "Sales Flow", "UX"],
    metrics: [{ label: "Agilidade", value: "Instantânea" }, { label: "Contato", value: "Direto" }, { label: "Conversão", value: "Direta" }],
    image: "https://images.unsplash.com/photo-1611746872915-626a57c24fbc?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "ux-ui",
    index: "04",
    title: "UX/UI PROFISSIONAL",
    subtitle: "Experiência fluida",
    overview: "Arquitetura de informação pensada para o usuário. Interface intuitiva que reduz a fricção e aumenta o tempo de permanência no site.",
    tags: ["User Research", "Interaction", "Usability", "Flow"],
    metrics: [{ label: "Fricção", value: "Mínima" }, { label: "Navegação", value: "Fluida" }, { label: "Satisfação", value: "Máxima" }],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "responsivo",
    index: "05",
    title: "100% RESPONSIVO",
    subtitle: "Adaptação multiplataforma",
    overview: "O site se comporta como um aplicativo nativo em qualquer tela. Otimização perfeita do monitor ultrawide até o smartphone mais compacto.",
    tags: ["Mobile-First", "Breakpoints", "Layout", "Adaptable"],
    metrics: [{ label: "Compatibilidade", value: "100%" }, { label: "Smartphone", value: "Perfeito" }, { label: "Desktop", value: "Impecável" }],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "performance",
    index: "06",
    title: "CARREGAMENTO RÁPIDO",
    subtitle: "Performance de Elite",
    overview: "Site leve, rápido e eficiente. Foco total em Core Web Vitals para que o carregamento não seja um obstáculo entre você e seu cliente.",
    tags: ["Lighthouse", "Assets", "Caching", "Speed"],
    metrics: [{ label: "Velocidade", value: "Máxima" }, { label: "LCP/CLS", value: "Excelente" }, { label: "Core Vitals", value: "Verde" }],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "seo",
    index: "07",
    title: "SEO OTIMIZADO",
    subtitle: "Visibilidade orgânica",
    overview: "Código semântico e estrutura técnica preparada para indexação. Seu projeto pronto para ser encontrado pelos mecanismos de busca.",
    tags: ["Google", "Schema", "Metadata", "Indexation"],
    metrics: [{ label: "SEO", value: "Pronto" }, { label: "Busca", value: "Otimizada" }, { label: "Autoridade", value: "Crescente" }],
    image: "https://images.unsplash.com/photo-1571677639564-0125a6873539?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "visual-premium",
    index: "08",
    title: "VISUAL PREMIUM",
    subtitle: "Acabamento High-End",
    overview: "Atenção obsessiva aos detalhes. O acabamento que diferencia um site comum de uma experiência de agência digital de alto nível.",
    tags: ["Detail-Oriented", "High-End", "Aesthetics", "Pixel Perfect"],
    metrics: [{ label: "Detalhes", value: "Obsessivos" }, { label: "Qualidade", value: "Elite" }, { label: "Valor", value: "Elevado" }],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
  },
];