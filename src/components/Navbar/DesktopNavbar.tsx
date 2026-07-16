// src/components/DesktopNavbar.tsx
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, House, User, FolderGit2, Mail } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "motion/react";

function DesktopNavbar() {
  const links = [
    { label: "Início", href: "#home", icon: House },
    { label: "Sobre", href: "#about", icon: User },
    { label: "Projetos", href: "#projects", icon: FolderGit2 },
    { label: "Contato", href: "#contact", icon: Mail },
  ];

  const { heroVisivel } = useHero();
  const expandida = heroVisivel;
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as any;
    if (!doc.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    doc.startViewTransition(() => {
      toggleTheme();
    });
  };

  return (
    <motion.nav
      animate={{
        width: expandida ? 190 : 72,
        left: expandida ? 32 : 16,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-0 h-screen flex z-[9999] items-center overflow-hidden"
    >
      <ul className="flex flex-col gap-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              {/* Adicionado w-fit e removido o gap-4 físico */}
              <a 
                href={link.href} 
                className="flex items-center w-fit text-ink-soft hover:text-ink transition-colors duration-200 font-mono text-xs uppercase tracking-widest"
              >
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                
                {/* O width agora zera junto com o espaçamento, removendo o alvo invisível de clique */}
                <motion.span
                  initial={false}
                  animate={{
                    opacity: expandida ? 1 : 0,
                    width: expandida ? "auto" : 0,
                    marginLeft: expandida ? 16 : 0, // Substitui o gap-4 do pai
                    x: expandida ? 0 : -10,
                  }}
                  transition={{ duration: 0.25 }}
                  className="whitespace-nowrap overflow-hidden block"
                >
                  {link.label}
                </motion.span>
              </a>
            </li>
          );
        })}

        <li>
          {/* Mesma lógica aplicada ao botão de tema */}
          <button 
            onClick={handleThemeChange} 
            className="flex items-center w-fit cursor-pointer text-ink-soft hover:text-ink transition-colors duration-200 font-mono text-xs uppercase tracking-widest"
          >
            <div className="shrink-0 w-5 h-5 flex items-center justify-center">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            
            <motion.span
              initial={false}
              animate={{
                opacity: expandida ? 1 : 0,
                width: expandida ? "auto" : 0,
                marginLeft: expandida ? 16 : 0,
                x: expandida ? 0 : -10,
              }}
              transition={{ duration: 0.25 }}
              className="whitespace-nowrap overflow-hidden block"
            >
              {theme === "light" ? "Escuro" : "Claro"}
            </motion.span>
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}

export default DesktopNavbar;