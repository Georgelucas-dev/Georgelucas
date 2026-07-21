// src/config/vibes.ts

export type VibeConfig = {
  label: string;
  background: string;
  foreground: string;
  surface: string;
  soft: string;
  clay: string;
  sage: string;
};

export const VIBES: Record<string, VibeConfig> = {
  Dark: {
    label: "Dark",
    // Neutro, o padrão do site
    background: "oklch(0.1 0 0)",
    foreground: "oklch(0.96 0.01 260)",
    surface: "oklch(0.15 0.01 260)",
    soft: "oklch(0.7 0.01 260)",
    clay: "oklch(0.72 0.16 68)", // dourado quente
    sage: "oklch(0.62 0.09 195)", // teal frio
  },
  "Lo-Fi": {
    label: "Lo-Fi",
    // Pastel / bege estilo papel antigo, tons dessaturados
    background: "oklch(0.95 0.015 85)",
    foreground: "oklch(0.28 0.03 40)",
    surface: "oklch(0.9 0.02 85)",
    soft: "oklch(0.52 0.03 45)",
    clay: "oklch(0.62 0.13 25)", // terracota empoeirado
    sage: "oklch(0.55 0.06 130)", // verde-oliva
  },
  Dracula: {
    label: "Dracula",
    // Paleta fiel ao tema Dracula original: grafite, rosa e verde
    background: "oklch(0.24 0.02 285)",
    foreground: "oklch(0.96 0.01 90)",
    surface: "oklch(0.32 0.02 280)",
    soft: "oklch(0.6 0.06 265)",
    clay: "oklch(0.75 0.19 350)", // rosa
    sage: "oklch(0.85 0.22 145)", // verde
  },
  Editorial: {
    label: "Editorial",
    // Baseado na sua ideia: Fundo creme vintage com destaques em Vermelho Puro (#ff0001) e Azul Royal.
    background: "oklch(0.94 0.02 75)", // Creme
    foreground: "oklch(0.2 0.02 40)", // Carvão / Quase Preto para leitura agradável
    surface: "oklch(0.98 0.01 75)", // Branco papel para os cards
    soft: "oklch(0.6 0.02 40)", // Cinza quente
    clay: "oklch(0.6 0.25 29)", // Vermelho Vivo (Ponto focal extremo)
    sage: "oklch(0.4 0.1 260)", // Azul Royal profundo (Contraste complementar)
  },
  Brutalist: {
    label: "Brutalist",
    // Estilo tipográfico radical: Fundo Amarelo Vibrante, texto Preto Absoluto e Azul Elétrico.
    background: "oklch(0.88 0.2 90)", // Amarelo Vibrante
    foreground: "oklch(0.1 0 0)", // Preto Puro
    surface: "oklch(0.95 0.1 90)", // Amarelo pastel/branco
    soft: "oklch(0.4 0 0)", // Grafite
    clay: "oklch(0.5 0.25 260)", // Azul Elétrico
    sage: "oklch(0.6 0.25 29)", // Vermelho Alarme
  },
  Midnight: {
    label: "Midnight",
    // Vibe noturna moderna (Não é só preto). Fundo roxo-abissal com texto gelo e Verde Ácido.
    background: "oklch(0.12 0.04 300)", // Roxo quase preto
    foreground: "oklch(0.95 0.02 300)", // Branco rosado
    surface: "oklch(0.18 0.04 300)", // Roxo escuro
    soft: "oklch(0.6 0.05 300)", // Roxo acinzentado
    clay: "oklch(0.85 0.2 110)", // Verde Ácido / Neon (Explosão de contraste)
    sage: "oklch(0.65 0.25 340)", // Magenta Quente
  },
  Zen: {
    label: "Zen",
    // Paleta orgânica terrosa de alto luxo: Fundo Verde Esmeralda escuro, texto Areia, detalhes em Terracota e Lilás.
    background: "oklch(0.28 0.06 140)", // Verde Floresta/Esmeralda Profundo
    foreground: "oklch(0.9 0.03 80)", // Areia / Aveia
    surface: "oklch(0.35 0.06 140)", // Verde um pouco mais claro
    soft: "oklch(0.7 0.03 140)", // Verde acinzentado claro
    clay: "oklch(0.65 0.2 45)", // Terracota / Laranja Queimado
    sage: "oklch(0.8 0.1 320)", // Lilás suave (Contraste inesperado com verde)
  },
  Nord: {
    label: "Nord",
    // Paleta fria, técnica e limpa. Fundo Slate (Azul acinzentado), branco gelo e toques de Ciano.
    background: "oklch(0.25 0.03 260)", // Slate / Azul Gelo Escuro
    foreground: "oklch(0.9 0.02 240)", // Branco Neve
    surface: "oklch(0.3 0.03 260)", // Slate intermediário
    soft: "oklch(0.6 0.03 260)", // Cinza azulado
    clay: "oklch(0.8 0.1 200)", // Ciano Claro (Ice)
    sage: "oklch(0.75 0.1 130)", // Verde Aurora
  },
};

export const VIBE_NAMES = Object.keys(VIBES);
