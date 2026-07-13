import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "../../data/Projects";

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.article ref={ref} className="group mb-32 last:mb-0">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 aspect-video flex items-center justify-center">
        {/* Fundo */}
        <motion.img
          src={project.image}
          alt=""
          aria-hidden
          style={{ y: bgY }}
          className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      scale-110
      blur-xl
      opacity-40
    "
        />

        {/* Principal */}
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imageY }}
          className="
      relative
  z-10
  w-[94%]
  lg:w-[86%]
  rounded-2xl
  shadow-2xl
      object-cover
    "
        />
      </div>

      <div className="mt-8 flex flex-col lg:flex-row justify-between items-start gap-10">
        <div>
          <p className="text-sm uppercase tracking-[.3em] text-zinc-400">
            {project.subtitle}
          </p>

          <h2 className="text-5xl font-bold mt-2">{project.title}</h2>

          <p className="mt-6 max-w-xl text-zinc-500 leading-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto lg:text-right">
          <p className="text-zinc-400">{project.year}</p>

          <a
            href={project.href}
            className="mt-6 inline-flex items-center gap-2 text-lg"
          >
            Ver projeto →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
