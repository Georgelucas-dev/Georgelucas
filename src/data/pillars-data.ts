// src/data/pillars-data.ts

export interface Pillar {
  id: string;
  index: string;
  title: string;
  paragraph: string;
}

export const pillars: Pillar[] = [
  {
    id: "design-moderno",
    index: "01",
    title: "Design moderno",
    paragraph:
      "Um visual que comunica autoridade antes mesmo da primeira palavra ser lida. Cada escolha de cor, espaço e tipografia é feita para alinhar seu site à identidade real da sua marca.",
  },
  {
    id: "foco-conversao",
    index: "02",
    title: "Foco em conversão",
    paragraph:
      "Botões, seções e chamadas de ação são posicionados com intenção, guiando o visitante até a decisão de fechar negócio. Design bonito que também vende.",
  },
  {
    id: "ux-ui",
    index: "03",
    title: "UX/UI profissional",
    paragraph:
      "Arquitetura de informação pensada para reduzir fricção e manter o usuário no fluxo certo. Navegação intuitiva do primeiro clique até o contato.",
  },
  {
    id: "responsivo",
    index: "04",
    title: "100% responsivo",
    paragraph:
      "O site se comporta como algo nativo em qualquer tela, do ultrawide ao smartphone mais compacto. Nenhuma experiência é tratada como secundária.",
  },
  {
    id: "performance",
    index: "05",
    title: "Performance de elite",
    paragraph:
      "Código leve e carregamento rápido, com atenção total aos Core Web Vitals. A velocidade nunca é um obstáculo entre você e seu cliente.",
  },
  {
    id: "seo",
    index: "06",
    title: "SEO otimizado",
    paragraph:
      "Estrutura semântica e técnica pensada para os mecanismos de busca desde a primeira linha de código. Seu projeto pronto para ser encontrado.",
  },
  {
    id: "acabamento-premium",
    index: "07",
    title: "Acabamento premium",
    paragraph:
      "Atenção obsessiva aos detalhes que separam um site comum de uma experiência de agência de alto nível. É isso que fica na memória de quem visita.",
  },
];
