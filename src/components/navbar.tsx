function Navbar() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed right-0 top-0 h-screen w-16 flex items-center justify-center border-r border-white/10">
      <ul className="flex flex-col gap-10">
        {links.map((link) => (
          <li key={link.href}><a
            
              href={link.href}
              className="text-sm tracking-widest [writing-mode:vertical-rl] rotate-180 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;