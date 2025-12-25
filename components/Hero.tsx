import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * List of roles displayed in the typewriter effect.
 * Change these strings to update your professional titles.
 */
const roles = [
  "Full Stack Developer",
  "Software Engineer",
  "Web Developer", 
  "PHP & Laravel Developer"
];

const Hero: React.FC = () => {
  // --- TYPEWRITER STATE ---
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // --- CANVAS ANIMATION REFS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 1. Typewriter Animation Effect
  useEffect(() => {
    const i = roleIndex % roles.length;
    const fullText = roles[i];
    
    // Typing speed logic
    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && text === fullText) {
      speed = 2000; // Pause at the end of the word
    } else if (isDeleting && text === '') {
      speed = 500; // Pause before starting a new word
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => prev + 1);
      } else {
        setText(fullText.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  // 2. Interactive Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Helper: Gets colors from the custom CSS variables defined in index.html
    const getThemeColors = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const p = rootStyle.getPropertyValue('--color-primary').trim().replace(/ /g, ',');
      const s = rootStyle.getPropertyValue('--color-secondary').trim().replace(/ /g, ',');
      const a = rootStyle.getPropertyValue('--color-accent').trim().replace(/ /g, ',');
      return [
        `rgba(${p}, 0.7)`,
        `rgba(${s}, 0.7)`,
        `rgba(${a}, 0.7)`
      ];
    };

    let themeColors = getThemeColors();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('themeChanged', () => {
      themeColors = getThemeColors();
      initParticles(); 
    });

    /**
     * Particle Class: Represents a single dot on the screen
     */
    class Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string;
      baseSpeedX: number; baseSpeedY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSpeedX = (Math.random() - 0.5) * 1.5;
        this.baseSpeedY = (Math.random() - 0.5) * 1.5;
        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;
        this.size = Math.random() * 2 + 1;
        this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
      }

      update() {
        // Interaction with mouse position
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const magnetRadius = 200;

        if (distance < magnetRadius) {
            const force = (magnetRadius - distance) / magnetRadius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            if (distance > 60) {
                this.vx += directionX * force * 0.5; // Attraction
                this.vy += directionY * force * 0.5;
            } else {
                this.vx -= directionX * 1.2; // Repulsion
                this.vy -= directionY * 1.2;
            }
        }

        this.vx *= 0.96; // Friction to slow down movement
        this.vy *= 0.96;
        this.vx += (this.baseSpeedX - this.vx) * 0.02; // Return to original drift
        this.vy += (this.baseSpeedY - this.vy) * 0.02;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
        particles = [];
        const particleCount = Math.min(Math.floor(width / 10), 160);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };
    initParticles();

    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        // Draw connections between dots
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < 120) {
                ctx.beginPath();
                const opacity = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-slate-950 overflow-hidden pt-20">
      
      {/* Background Lighting Decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0f172a] to-slate-950"></div>
         <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px]"
         />
         <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[120px]"
         />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-1 pointer-events-none w-full h-full opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <div className="flex-1 text-center md:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="font-extrabold text-white leading-tight">
                <span className="text-xl md:text-2xl block mb-4 text-slate-400 font-medium tracking-wide">Hello, I'm</span>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x inline-block pb-4 tracking-tighter">
                  Shaik RunHussain Pasha
                </span>
              </h1>

              <div className="text-2xl md:text-3xl font-semibold text-slate-300 flex items-center justify-center md:justify-start gap-3 h-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {text}
                </span>
                <span className="w-1 h-8 bg-accent animate-pulse"></span>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg shadow-xl bg-[length:200%_200%] animate-gradient-x text-center transition-all hover:shadow-primary/25"
              >
                Hire Me
              </motion.a>
              <motion.a 
                href="/RunHussain_CV.pdf"
                download
                whileHover={{ scale: 1.05, borderColor: "rgb(var(--color-primary))" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl border-2 border-slate-700 text-white font-bold text-lg backdrop-blur-sm transition-all duration-300 text-center hover:shadow-lg hover:shadow-primary/10"
              >
                Get CV
              </motion.a>
            </div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative flex-1 max-w-sm sm:max-w-md lg:max-w-lg"
          >
             <div className="relative z-10 w-full aspect-square p-2">
                <div className="absolute inset-[-15%] rounded-full border-2 border-primary/20 animate-spin-slow" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full opacity-20 blur-3xl animate-pulse" />
                
                <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-slate-800 shadow-2xl relative bg-slate-900 group">
                   <img 
                    src="https://unsplash.com/photos/B_jLTqC4eoE" 
                    alt="RunHussain Pasha Shaik" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;