import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

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
      {/* Theme Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
          isOpen 
          ? 'bg-slate-800 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--color-primary),0.2)]' 
          : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700'
        }`}
        title="Change Portfolio Theme"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Palette size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Theme Selection Dropdown - Simplified "Only Color" Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-14 right-0 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 z-[100] min-w-[160px]"
          >
            <div className="mb-3 text-center">
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">Select Theme</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  className="group relative flex flex-col items-center justify-center p-1 rounded-full transition-all duration-300"
                  title={theme.name}
                >
                  {/* Outer selection ring */}
                  <AnimatePresence>
                    {activeTheme === theme.name && (
                      <motion.div 
                        layoutId="active-ring"
                        className="absolute inset-0 border-2 border-white rounded-full z-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Color Circle */}
                  <div 
                    className={`relative w-8 h-8 rounded-full shadow-lg transition-transform duration-500 z-10 ${
                      activeTheme === theme.name ? 'scale-75' : 'group-hover:scale-110'
                    }`}
                    style={{ 
                      background: `linear-gradient(135deg, rgb(${theme.primary}), rgb(${theme.secondary}))` 
                    }}
                  >
                    {/* Inner highlight for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full opacity-60"></div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-800/50 flex flex-col items-center">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent/30"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;