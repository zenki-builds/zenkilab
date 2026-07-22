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
  const [showJourneys, setShowJourneys] = useState(false);
  const particlesRef = useRef<Particle[]>([]);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1115] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#0F1115]/40 z-[1]" />

      {/* Radial accent glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full z-[1]"
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
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-400">
              Custom Manufacturing
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6 max-w-[900px] mx-auto">
            If you can imagine it,
            <br />
            <span className="text-[#22D3EE]">we can print it.</span>
          </h1>

          {/* Subtext — human, natural, explains what we do */}
          <p className="text-lg lg:text-xl text-neutral-400 max-w-[680px] mx-auto mb-10 leading-relaxed">
            Upload a model, send us a photo of a broken part, or just tell us
            your idea. We manufacture custom parts, prototypes, gifts, and
            products using professional 3D printing — no minimum order, no
            confusing jargon.
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
              href="#services"
              className="inline-flex items-center gap-2.5 border border-white/[0.08] hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/[0.03] text-neutral-300 hover:text-white h-[52px] px-7 rounded-xl text-sm font-medium transition-all duration-300"
            >
              See What We Make
            </a>
          </div>

          {/* Trust indicators — subtle */}
          <p className="text-xs text-neutral-600">
            1,200+ projects completed &middot; 10+ materials &middot; Free quotes in 24 hrs
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1115] to-transparent z-[2] pointer-events-none" />
    </section>
  );
}