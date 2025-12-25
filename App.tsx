import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Main Application Entry
 * AIAssistant has been completely removed to optimize performance and scrolling.
 */
const App: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Sectioned Content */}
      <main className="transform-gpu">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      {/* Branding & Footer */}
      <Footer />
    </div>
  );
};

export default App;