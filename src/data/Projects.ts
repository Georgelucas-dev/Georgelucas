export interface Project {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  href: string;
}

export const projectsData: Project[] = [
  {
    title: "Template para Psicólogos",
    subtitle: "Landing page profissional",
    description:
      "Projeto desenvolvido para transmitir confiança, facilitar o contato e aumentar conversões através de uma experiência moderna.",
    year: "2026",
    tags: ["React", "Tailwind", "Motion"],
    image: "src/assets/projects/psychologist-template.webp",
    href: "#",
  },
  {
    title: "Template para Psicólogos 2",
    subtitle: "Landing page profissional",
    description:
      "Projeto desenvolvido para transmitir confiança, facilitar o contato e aumentar conversões através de uma experiência moderna.",
    year: "2026",
    tags: ["React", "Tailwind", "Motion"],
    image: "src/assets/projects/psychologist-template2.webp",
    href: "#",
  },
];
