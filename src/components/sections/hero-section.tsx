"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload, FileText } from "lucide-react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      time += 0.002;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.025 + Math.sin(time * 0.5) * 0.01})`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing - ((time * 15) % spacing);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        const y = j * spacing - ((time * 8) % spacing);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#111111]/40 z-[1]" />

      {/* Radial accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-400">
              Premium Digital Manufacturing
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6 max-w-[900px] mx-auto">
            If you can imagine it,
            <br />
            <span className="text-[#E63946]">we can print it.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-neutral-400 max-w-[620px] mx-auto mb-10 leading-relaxed">
            Zenki Lab transforms your ideas into precision-manufactured reality using
            industrial-grade 3D printing. Custom parts, functional prototypes,
            and production-ready components — on demand, on time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote"
              className="inline-flex items-center gap-2.5 bg-[#E63946] hover:bg-[#E63946]/90 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,57,70,0.3)]"
            >
              <Upload className="w-5 h-5" />
              Upload STL
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2.5 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] text-white h-[52px] px-7 rounded-xl text-sm font-medium transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              Request Quote
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-white/[0.15] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent z-[2] pointer-events-none" />
    </section>
  );
}