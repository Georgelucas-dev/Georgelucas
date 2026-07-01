// App.tsx
import Hero from "./sections/hero";
import About from "./sections/about";
import Projects from "./sections/projects";
import Contact from "./sections/contact";
import Footer from "./sections/footer";

function App() {
  return (
    <div className="relative">
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
        {/* próximas sections aqui */}
      </main>
    </div>
  );
}

export default App;