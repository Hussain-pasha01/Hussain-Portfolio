import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const roles = [
  "Full Stack Developer",
  "Software Engineer",
  "Web Developer", 
  "PHP & Laravel Developer"
];

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Typing Effect Logic
  useEffect(() => {
    const i = roleIndex % roles.length;
    const fullText = roles[i];
    
    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && text === fullText) {
      speed = 2000;
    } else if (isDeleting && text === '') {
      speed = 500;
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

  // Handle Scroll
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Canvas Constellation Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Dynamically fetch colors from CSS variables
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

    const handleThemeChange = () => {
      themeColors = getThemeColors();
      initParticles(); // Re-init particles with new theme colors
    };
    window.addEventListener('themeChanged', handleThemeChange);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseSpeedX: number;
      baseSpeedY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSpeedX = (Math.random() - 0.5) * 1.2;
        this.baseSpeedY = (Math.random() - 0.5) * 1.2;
        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;
        this.size = Math.random() * 2 + 0.8;
        this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
      }

      update() {
        // Apply friction to current velocity to stabilize the reactive movement
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Gradually pull back to base speed
        this.vx += (this.baseSpeedX - this.vx) * 0.01;
        this.vy += (this.baseSpeedY - this.vy) * 0.01;

        this.x += this.vx;
        this.y += this.vy;

        // Bounce/Wrap boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const magnetRadius = 180;

        if (distance < magnetRadius) {
            const force = (magnetRadius - distance) / magnetRadius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Interaction: Attract at distance, repel strongly when too close
            if (distance > 70) {
                // Smooth attraction
                this.vx += directionX * force * 0.4;
                this.vy += directionY * force * 0.4;
            } else {
                // Repulsion force to prevent particles from clumping at the cursor center
                const repelForce = (70 - distance) / 70;
                this.vx -= directionX * repelForce * 0.8;
                this.vy -= directionY * repelForce * 0.8;
            }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add subtle glow to reactive particles
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 0;
        }
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
        particles = [];
        // Slightly higher density for better interaction visuals
        const particleCount = Math.min(Math.floor(width / 12), 140);
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
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < 110) {
                ctx.beginPath();
                const opacity = 1 - (distance / 110);
                const accentColor = themeColors[2].split(',').slice(0, 3).join(',');
                ctx.strokeStyle = `${accentColor}, ${opacity * 0.08})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        const dx = particles[i].x - mouseRef.current.x;
        const dy = particles[i].y - mouseRef.current.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 160) {
            ctx.beginPath();
            const opacity = 1 - (distance / 160);
            const pColor = themeColors[0].split(',').slice(0, 3).join(',');
            ctx.strokeStyle = `${pColor}, ${opacity * 0.25})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
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
      window.removeEventListener('themeChanged', handleThemeChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-slate-950 overflow-hidden pt-20">
      
      {/* 1. Fluid Background Gradients */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0f172a] to-slate-950"></div>
         
         <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, 45, 0],
              x: [0, 150, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen"
         />
         <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -45, 0],
              x: [0, -150, 0],
              y: [0, -100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-secondary/10 rounded-full blur-[120px] mix-blend-screen"
         />
         <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 100, -100, 0],
              y: [0, 50, -50, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[100px] mix-blend-screen"
         />
      </div>

      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none w-full h-full"
      />

      <div className="absolute inset-0 opacity-[0.03] z-2 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20">
          
          <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="font-extrabold text-white leading-tight mb-4">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg sm:text-xl md:text-3xl block mb-2 md:mb-4 text-slate-300 font-bold tracking-wide"
                >
                  Hi, I'm
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x inline-block pb-2"
                >
                  RunHussain Pasha Shaik
                </motion.span>
              </h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg md:text-2xl font-medium text-slate-300 flex items-center justify-center md:justify-start gap-2 h-8"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold min-w-[10px]">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-accent animate-pulse"></span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start"
            >
              <motion.a 
                href="#contact" 
                onClick={(e) => handleScroll(e, '#contact')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--color-primary), 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold shadow-lg transition-all duration-300 text-center w-full sm:w-auto relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              <motion.a 
                href="/RunHussain_CV.pdf"
                download="RunHussain_CV.pdf"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(30, 41, 59, 0.4)", 
                  borderColor: "rgb(var(--color-primary))",
                  color: "white"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-slate-700 text-slate-300 font-bold transition-all duration-300 bg-slate-900/40 backdrop-blur-sm text-center w-full sm:w-auto hover:shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
              >
                Get CV
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
             className="flex-1 w-full max-w-[280px] sm:max-w-md md:max-w-lg relative mt-8 md:mt-0"
          >
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-full aspect-square rounded-full p-2"
             >
                <div className="absolute inset-[-10%] rounded-full border border-primary/20 animate-spin-slow"></div>
                <div className="absolute inset-[-5%] rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                <div className="absolute inset-2 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full opacity-30 blur-2xl animate-pulse"></div>
                
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-800 relative z-10 bg-slate-900 flex items-center justify-center group shadow-2xl">
                   <img 
                    src="https://picsum.photos/600/600?grayscale" 
                    alt="RunHussain Pasha Shaik" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter-none opacity-90 group-hover:opacity-100"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;