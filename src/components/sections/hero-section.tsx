"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Camera, Lightbulb, Sparkles, X } from "lucide-react";
import { projectJourneys } from "@/lib/constants";

/* ─── Particle type for engineering accent ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [showJourneys, setShowJourneys] = useState(false);
  const particlesRef = useRef<Particle[]>([]);

  /* ── IntersectionObserver: pause hero bg loop when scrolled out of view ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Bail out if user prefers reduced motion — no animations to pause */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          section.classList.remove("hero-bg-paused");
        } else {
          section.classList.add("hero-bg-paused");
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let gridOffset = 0;
    const particles: Particle[] = particlesRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* spawn particles occasionally */
    const spawnParticle = () => {
      if (particles.length > 40) return;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.1),
        life: 0,
        maxLife: 200 + Math.random() * 300,
        size: Math.random() * 2 + 0.5,
      });
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Subtle grid ── */
      gridOffset += 0.15;
      const spacing = 64;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      ctx.strokeStyle = `rgba(34,211,238,${0.025 + Math.sin(gridOffset * 0.3) * 0.008})`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing - (gridOffset % spacing);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        const y = j * spacing - (gridOffset * 0.6) % spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      /* ── Floating particles ── */
      if (Math.random() < 0.15) spawnParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) * 3.3 : 1;
        ctx.fillStyle = `rgba(34,211,238,${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      /* ── Occasional wireframe circles (CAD feel) ── */
      const t = performance.now() * 0.001;
      for (let k = 0; k < 3; k++) {
        const cx = canvas.width * (0.3 + k * 0.25);
        const cy = canvas.height * (0.3 + Math.sin(t * 0.4 + k) * 0.2);
        const r = 60 + Math.sin(t * 0.6 + k * 2) * 20;
        ctx.strokeStyle = `rgba(34,211,238,${0.03 + Math.sin(t + k) * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        /* crosshairs */
        ctx.beginPath();
        ctx.moveTo(cx - r - 8, cy);
        ctx.lineTo(cx + r + 8, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - r - 8);
        ctx.lineTo(cx, cy + r + 8);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const journeyIcons = [FileText, Camera, Lightbulb, Sparkles];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* ═══ Hero Background Printer Build Loop ═══ */}
      <div
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg
          id="hero-printer-bg"
          width="900"
          height="700"
          viewBox="0 0 900 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[900px]"
          style={{
            maskImage: "radial-gradient(ellipse 50% 50% at 50% 48%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 48%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        >
          {/* ═══ Frame — enclosure box ═══ */}
          <g id="hero-frame">
            <rect className="hero-outline" x="200" y="80" width="500" height="420" rx="12" strokeWidth="2" />
            <path className="hero-accent" d="M200 110 L700 110" strokeWidth="1.5" />
            <path className="hero-accent" d="M220 460 L680 460" strokeWidth="1.5" strokeDasharray="6 8" />
          </g>

          {/* ═══ Doors — front panels ═══ */}
          <g id="hero-doors">
            <rect className="hero-outline" x="200" y="80" width="250" height="420" rx="12" strokeWidth="1" strokeDasharray="8 4" />
            <rect className="hero-outline" x="450" y="80" width="250" height="420" rx="12" strokeWidth="1" strokeDasharray="8 4" />
            <path className="hero-accent" d="M438 280 L438 320" strokeWidth="2" />
            <path className="hero-accent" d="M462 280 L462 320" strokeWidth="2" />
          </g>

          {/* ═══ Gantry — rails ═══ */}
          <g id="hero-gantry">
            <path className="hero-outline" d="M240 130 L660 130" strokeWidth="1.5" />
            <path className="hero-outline" d="M240 420 L660 420" strokeWidth="1.5" />
            <path className="hero-accent" d="M270 130 L270 420" strokeWidth="1.5" />
            <path className="hero-accent" d="M630 130 L630 420" strokeWidth="1.5" />
            <path className="hero-accent" d="M270 180 L630 180" strokeWidth="1.5" strokeDasharray="4 3" />
          </g>

          {/* ═══ Toolhead — on X-axis, sweeps back and forth ═══ */}
          <g id="hero-toolhead">
            <rect className="hero-outline" x="398" y="158" width="44" height="36" rx="4" strokeWidth="1.5" />
            <path className="hero-accent" d="M416 194 L416 212 L420 212 L420 194" strokeWidth="1.5" />
            {/* Heatsink lines */}
            <path className="hero-outline" d="M404 164 L404 174" strokeWidth="1" />
            <path className="hero-outline" d="M416 164 L416 174" strokeWidth="1" />
            <path className="hero-outline" d="M428 164 L428 174" strokeWidth="1" />
            <circle className="hero-accent" cx="408" cy="178" r="7" strokeWidth="1" />
          </g>

          {/* ═══ Bed — print platform ═══ */}
          <g id="hero-bed">
            <rect className="hero-outline" x="300" y="340" width="300" height="8" rx="2" strokeWidth="1.5" />
            <path className="hero-outline" d="M360 340 L360 348" strokeWidth="0.8" />
            <path className="hero-outline" d="M420 340 L420 348" strokeWidth="0.8" />
            <path className="hero-outline" d="M480 340 L480 348" strokeWidth="0.8" />
            <path className="hero-accent" d="M330 348 L330 380 L570 380 L570 348" strokeWidth="1" />
          </g>

          {/* ═══ Print — object being built (clipPath + opacity cycle) ═══ */}
          <g id="hero-print">
            <defs>
              <clipPath id="hero-print-clip">
                <rect id="hero-print-clip-rect" x="380" y="230" width="80" height="44" fill="white" />
              </clipPath>
            </defs>
            <g clipPath="url(#hero-print-clip)">
              {/* Base platform */}
              <rect className="hero-accent-fill hero-print-fill" x="380" y="266" width="80" height="8" rx="1" />
              {/* Column */}
              <rect className="hero-accent-fill hero-print-fill" x="406" y="226" width="28" height="40" rx="3" />
              {/* Top cap */}
              <rect className="hero-accent-fill hero-print-fill" x="394" y="210" width="52" height="20" rx="4" />
              {/* Outlines */}
              <rect className="hero-outline hero-print-fill" x="380" y="266" width="80" height="8" rx="1" />
              <rect className="hero-outline hero-print-fill" x="406" y="226" width="28" height="40" rx="3" />
              <rect className="hero-outline hero-print-fill" x="394" y="210" width="52" height="20" rx="4" />
            </g>
          </g>
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1115] z-[4]" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0F1115]/40 z-[4]" />

      {/* Radial accent glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full z-[5]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full z-[5]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Heading */}
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6 max-w-[900px] mx-auto">
            Built by makers,
            <br />
            <span className="text-[#22D3EE]">for makers.</span>
          </h1>

          {/* Subtext — explains what the workshop does, natural language */}
          <p className="text-lg lg:text-xl text-neutral-400 max-w-[680px] mx-auto mb-6 leading-relaxed">
            Zenki Lab helps makers, enthusiasts and businesses bring their ideas
            into the real world through reliable, precision 3D printing.
          </p>

          <p className="text-base text-neutral-500 max-w-[600px] mx-auto mb-10 leading-relaxed">
            Whether it's a hard-to-find automotive part, a custom prototype, a
            die-cast modification or a one-off creation, every project receives
            the same care we'd expect for our own.
          </p>

          {/* Primary CTA — "Start Your Project" */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setShowJourneys(true)}
              className="inline-flex items-center gap-2.5 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2.5 border border-white/[0.08] hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/[0.03] text-neutral-300 hover:text-white h-[52px] px-7 rounded-xl text-sm font-medium transition-all duration-300"
            >
              Explore Our Work
            </a>
          </div>

          {/* Trust indicators — subtle */}
          <p className="text-xs text-neutral-600">
            1,200+ projects completed &middot; 10+ materials &middot; 6 machines &middot; Free quotes in 24 hrs
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-white/[0.12] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-[#22D3EE]/50"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Start Your Project Modal ── */}
      <AnimatePresence>
        {showJourneys && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0F1115]/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowJourneys(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[720px] w-full bg-[#161A20] border border-white/[0.08] rounded-2xl p-8 lg:p-10 shadow-[0_0_60px_rgba(34,211,238,0.06)]"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Start Your Project
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Choose the path that best describes your situation
                  </p>
                </div>
                <button
                  onClick={() => setShowJourneys(false)}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Journey cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectJourneys.map((journey, idx) => {
                  const Icon = journeyIcons[idx];
                  return (
                    <a
                      key={journey.title}
                      href={journey.href}
                      onClick={() => setShowJourneys(false)}
                      className="group flex flex-col gap-3 p-5 rounded-xl border border-white/[0.05] hover:border-[#22D3EE]/25 hover:bg-[#22D3EE]/[0.02] transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4.5 h-4.5 text-[#22D3EE]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#22D3EE] transition-colors duration-200">
                          {journey.title}
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          {journey.description}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1115] to-transparent z-[6] pointer-events-none" />
    </section>
  );
}