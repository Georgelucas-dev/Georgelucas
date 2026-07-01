// components/footer.tsx
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-10 py-6 border-t border-zinc-300 bg-zinc-100">
      <p className="text-xs text-zinc-500">
        © {year} George Lucas. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;