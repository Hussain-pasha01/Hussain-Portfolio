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

      {/* Enhanced Theme Grid Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-12 right-0 bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-4 z-[100] min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Select Visual Theme</span>
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  className={`group relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300 border ${
                    activeTheme === theme.name 
                    ? 'bg-white/5 border-white/10 ring-1 ring-white/10' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  {/* Color Preview Swatch */}
                  <div 
                    className={`relative w-full h-10 rounded-lg shadow-sm transition-transform duration-300 flex items-center justify-center overflow-hidden ${activeTheme === theme.name ? 'scale-105 shadow-lg' : 'group-hover:scale-105'}`}
                    style={{ 
                      background: `linear-gradient(135deg, rgb(${theme.primary}), rgb(${theme.secondary}))` 
                    }}
                  >
                    {activeTheme === theme.name && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                        <Check size={16} className="text-white drop-shadow-md" />
                      </div>
                    )}
                    {/* Interior glow for depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[10px] font-bold tracking-tight transition-colors ${activeTheme === theme.name ? 'text-primary' : 'text-slate-400 group-hover:text-slate-200'}`}>
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