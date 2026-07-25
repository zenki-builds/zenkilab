"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, FileEdit, X, FileText, Camera, Lightbulb, Sparkles } from "lucide-react";
import { projectJourneys } from "@/lib/constants";

/**
 * ═══════════════════════════════════════════════════════
 * Hero Section — Dark Industrial 3-Column Layout
 *
 * Left:   Headline + CTA buttons
 * Center: 3D printer visual container (pulsing placeholder)
 * Right:  "How It Works" vertical card stack
 *
 * Palette:
 *   Background      #0F172A (dark gunmetal)
 *   Surface/Cards    #1E293B (slate gray), border #334155
 *   Accent           #F97316 (performance orange)
 *   Primary text     #F8FAFC (off-white)
 *   Secondary text   #94A3B8 (cool gray)
 * ═══════════════════════════════════════════════════════
 */

const howItWorksSteps = [
  {
    number: "1",
    icon: FileEdit,
    title: "Design & CAD",
    description: "Send us your STL or 3MF file, ready to print.",
  },
  {
    number: "2",
    icon: Zap,
    title: "Material Selection",
    description: "Choose from PLA, PETG, ABS, ASA and more.",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Precision Printing & Finishing",
    description: "Layer-by-layer accuracy with careful post-processing.",
  },
];

export function HeroSection() {
  const [showJourneys, setShowJourneys] = useState(false);
  const journeyIcons = [FileText, Camera, Lightbulb, Sparkles];

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-28 pb-16 lg:pt-32"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Subtle background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Radial accent glow behind center column */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* ═══ 3-Column Grid: stacks below 1024px ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.85fr] gap-10 lg:gap-8 items-center">
          {/* ── LEFT COLUMN: Hook & CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left"
          >
            <h1
              className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-6"
              style={{ color: "#F8FAFC", fontFamily: "var(--font-heading, inherit)" }}
            >
              PRECISION 3D PRINTING FOR{" "}
              <span style={{ color: "#F97316" }}>CUSTOM AUTOMOTIVE PARTS</span>
            </h1>

            <p
              className="text-base lg:text-lg mb-8 max-w-[480px] mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "#94A3B8" }}
            >
              High-temp, engineering-grade prints for brackets, housings and
              replacement parts — built from your STL files with care.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 h-[50px] px-6 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  color: "#F8FAFC",
                }}
              >
                Explore Services
              </a>
              <button
                onClick={() => setShowJourneys(true)}
                className="inline-flex items-center gap-2 h-[50px] px-6 rounded-lg text-sm font-semibold transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor: "#F97316",
                  color: "#0F172A",
                }}
              >
                <Zap className="w-4 h-4" />
                Get Instant Quote
              </button>
            </div>
          </motion.div>

          {/* ── CENTER COLUMN: 3D Printer Visual Core ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-[460px] aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
              }}
            >
              {/* Pulsing glow box */}
              <div
                className="absolute inset-6 rounded-xl hero-printer-pulse"
                style={{
                  border: "1px dashed #334155",
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}
                >
                  <Zap className="w-7 h-7" style={{ color: "#F97316" }} />
                </div>
                <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
                  [3D Printer Animation Placeholder]
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: How It Works Card Stack ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase mb-4 text-center lg:text-left"
              style={{ color: "#F8FAFC" }}
            >
              How It Works
            </h2>
            <div className="flex flex-col gap-3">
              {howItWorksSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="flex items-start gap-3 p-4 rounded-xl transition-colors duration-300"
                    style={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: "rgba(249,115,22,0.12)",
                        color: "#F97316",
                      }}
                    >
                      {step.number}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3.5 h-3.5" style={{ color: "#F97316" }} />
                        <h3 className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Start Your Project Modal ── */}
      <AnimatePresence>
        {showJourneys && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 backdrop-blur-xl flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(15,23,42,0.9)" }}
            onClick={() => setShowJourneys(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[720px] w-full rounded-2xl p-8 lg:p-10"
              style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: "#F8FAFC" }}>
                    Start Your Project
                  </h2>
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    Choose the path that best describes your situation
                  </p>
                </div>
                <button
                  onClick={() => setShowJourneys(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ border: "1px solid #334155", color: "#94A3B8" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectJourneys.map((journey, idx) => {
                  const Icon = journeyIcons[idx];
                  return (
                    <a
                      key={journey.title}
                      href={journey.href}
                      onClick={() => setShowJourneys(false)}
                      className="group flex flex-col gap-3 p-5 rounded-xl transition-all duration-300"
                      style={{ border: "1px solid #334155" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: "#F97316" }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
                          {journey.title}
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
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
    </section>
  );
}
