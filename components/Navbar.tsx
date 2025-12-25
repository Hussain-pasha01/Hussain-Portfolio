import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from '../types';
import ThemePicker from './ThemePicker';
import Logo from './Logo';

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Optimized offset for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 80 : 100;
      
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 transform-gpu ${scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg py-3 border-b border-slate-800/50' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 group">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 hidden sm:block tracking-tighter">
                SHAIK RUNHUSSAIN
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 pr-6 border-r border-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <ThemePicker />
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-300 bg-[length:200%_200%] animate-gradient-x"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-4">
            <ThemePicker />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-slate-800/40"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-dark/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 ease-in-out transform-gpu ${isOpen ? 'opacity-100 max-h-screen translate-y-0' : 'opacity-0 max-h-0 overflow-hidden -translate-y-4'}`}>
        <div className="px-6 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-4 text-lg font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all border-l-4 border-transparent hover:border-primary"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 border-t border-slate-800 mt-4">
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full text-center px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold animate-gradient-x"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;