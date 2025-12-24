import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';

interface Theme {
  name: string;
  primary: string; // "R G B" format
  secondary: string;
  accent: string;
}

const themes: Theme[] = [
  { name: 'Nebula', primary: '139 92 246', secondary: '217 70 239', accent: '6 182 212' },
  { name: 'Emerald', primary: '16 185 129', secondary: '20 184 166', accent: '132 204 22' },
  { name: 'Supernova', primary: '244 63 94', secondary: '249 115 22', accent: '245 158 11' },
  { name: 'Deep Space', primary: '59 130 246', secondary: '99 102 241', accent: '14 165 233' },
  { name: 'Aurora', primary: '79 70 229', secondary: '147 51 234', accent: '244 63 94' },
  { name: 'Solar', primary: '245 158 11', secondary: '234 88 12', accent: '251 191 36' },
];

const ThemePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0].name);
  const containerRef = useRef<HTMLDivElement>(null);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    setActiveTheme(theme.name);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      {/* Mini Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border ${
          isOpen 
          ? 'bg-slate-800 border-primary text-primary shadow-[0_0_10px_rgba(var(--color-primary),0.3)]' 
          : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700'
        }`}
        title="Themes"
      >
        {isOpen ? <X size={16} /> : <Palette size={16} />}
      </motion.button>

      {/* Tiny Compact Color Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute top-12 right-0 bg-slate-900/95 backdrop-blur-xl border border-slate-800/80 rounded-xl shadow-2xl p-2.5 z-[100] min-w-[110px]"
          >
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  title={theme.name}
                  className={`group relative w-7 h-7 rounded-md transition-all duration-300 flex items-center justify-center border-2 ${
                    activeTheme === theme.name 
                    ? 'border-white/80 scale-110 shadow-[0_0_8px_rgba(255,255,255,0.2)]' 
                    : 'border-transparent hover:border-white/20'
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, rgb(${theme.primary}), rgb(${theme.secondary}))` 
                  }}
                >
                  {activeTheme === theme.name && (
                    <Check size={12} className="text-white drop-shadow-md" />
                  )}
                  
                  {/* Tooltip for name */}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-950 text-white text-[9px] font-bold py-0.5 px-1.5 rounded border border-white/10 whitespace-nowrap z-[110] pointer-events-none">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;