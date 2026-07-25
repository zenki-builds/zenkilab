"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Zap, X, FileText, Camera, Lightbulb, Sparkles } from "lucide-react";
import { projectJourneys } from "@/lib/constants";

/**
 * ═══════════════════════════════════════════════════════
 * Hero Section — Light Industrial 3-Column Layout
 * Matches the approved wireframe: light bg, dark text,
 * orange accent, printer visual center, How It Works right.
 * ═══════════════════════════════════════════════════════
 */

const howItWorksSteps = [
  {
    icon: FileText,
    title: "1. Design & CAD",
  },
  {
    icon: Settings2,
    title: "2. Material Selection",
  },
  {
    icon: Sparkles,
    title: "3. Precision Printing & Finishing",
  },
];

export function HeroSection() {
  const [showJourneys, setShowJourneys] = useState(false);
  const journeyIcons = [FileText, Camera, Lightbulb, Sparkles];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.3fr_0.75fr] gap-10 lg:gap-6 items-center">
          {/* ── LEFT: Headline & CTAs ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left"
          >
            <h1
              className="text-[clamp(2rem,3.6vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] mb-6"
              style={{ color: "#0F172A" }}
            >
              PRECISION 3D PRINTING FOR CUSTOM AUTOMOTIVE PARTS
            </h1>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 h-[46px] px-5 rounded-lg text-sm font-semibold border transition-colors duration-200"
                style={{ borderColor: "#CBD5E1", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <Settings2 className="w-4 h-4" />
                Explore Services
              </a>
              <button
                onClick={() => setShowJourneys(true)}
                className="inline-flex items-center gap-2 h-[46px] px-5 rounded-lg text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: "#F97316" }}
              >
                <Zap className="w-4 h-4" />
                Get Instant Quote
              </button>
            </div>
          </motion.div>

          {/* ── CENTER: Animated 3D Printer Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[440px] aspect-square">
              <svg
                viewBox="0 0 500 500"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Animated illustration of a 3D printer printing an automotive intake manifold"
              >
                <defs>
                  <linearGradient id="frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="orange-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="print-reveal-clip">
                    <rect x="100" y="220" width="300" height="150" className="zenki-clip-reveal-box" />
                  </clipPath>
                </defs>

                {/* Enclosure outer frame */}
                <rect x="40" y="40" width="420" height="420" rx="24" fill="url(#frame-grad)" stroke="#CBD5E1" strokeWidth="3" />
                {/* Glass panel inner border */}
                <rect x="60" y="60" width="380" height="380" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

                {/* Heatbed platform */}
                <rect x="110" y="370" width="280" height="16" rx="4" fill="#CBD5E1" />
                <rect x="120" y="386" width="260" height="8" fill="#E2E8F0" />
                <rect x="140" y="394" width="20" height="26" fill="#94A3B8" />
                <rect x="340" y="394" width="20" height="26" fill="#94A3B8" />

                {/* Blueprint wireframe of the part (background) */}
                <g stroke="#CBD5E1" strokeWidth="2" fill="none" opacity="0.7">
                  <path d="M150 370 L170 260 C200 240, 240 240, 260 260 L280 370 Z" />
                  <path d="M190 370 L200 270 M230 370 L235 265 M270 370 L270 280" />
                </g>

                {/* Printed part — revealed layer-by-layer in orange */}
                <g clipPath="url(#print-reveal-clip)">
                  <path
                    d="M150 370 L170 260 C200 240, 240 240, 260 260 L280 370 Z"
                    fill="#F97316"
                    fillOpacity="0.15"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path d="M190 370 L200 270 M230 370 L235 265 M270 370 L270 280" stroke="#F97316" strokeWidth="3" />
                  <line x1="120" y1="260" x2="380" y2="260" stroke="#EF4444" strokeWidth="2" opacity="0.6" />
                </g>

                {/* Moving gantry & toolhead assembly */}
                <g className="zenki-toolhead">
                  <rect x="60" y="200" width="380" height="12" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
                  <rect x="220" y="175" width="60" height="50" rx="8" fill="#334155" stroke="#F97316" strokeWidth="2" />
                  <line x1="220" y1="190" x2="280" y2="190" stroke="#F97316" strokeWidth="3" />
                  <polygon points="242,225 258,225 252,238 248,238" fill="#CBD5E1" />
                  <polygon
                    points="245,238 255,238 265,260 235,260"
                    fill="url(#orange-glow)"
                    className="zenki-nozzle-glow"
                  />
                </g>

                {/* Status LED */}
                <circle cx="410" cy="80" r="5" fill="#22C55E" />
                <circle cx="410" cy="80" r="10" fill="#22C55E" opacity="0.2" className="zenki-nozzle-glow" />

                {/* "3D printer" label */}
                <text x="250" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fill="#334155">
                  3D printer
                </text>
              </svg>
            </div>
          </motion.div>

          {/* ── RIGHT: How It Works Card Stack ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2
              className="text-xs font-bold tracking-[0.12em] uppercase mb-3 text-center lg:text-left"
              style={{ color: "#0F172A" }}
            >
              How It Works
            </h2>
            <div className="flex flex-col gap-2.5">
              {howItWorksSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="flex items-center gap-3 p-3.5 rounded-lg border"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: "#FFF7ED" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#F97316" }} />
                    </div>
                    <h3 className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                      {step.title}
                    </h3>
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
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(15,23,42,0.4)" }}
            onClick={() => setShowJourneys(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[720px] w-full rounded-2xl p-8 lg:p-10"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: "#0F172A" }}>
                    Start Your Project
                  </h2>
                  <p className="text-sm" style={{ color: "#64748B" }}>
                    Choose the path that best describes your situation
                  </p>
                </div>
                <button
                  onClick={() => setShowJourneys(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ border: "1px solid #E2E8F0", color: "#64748B" }}
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
                      className="group flex flex-col gap-3 p-5 rounded-xl transition-all duration-300 hover:border-[#F97316]/40"
                      style={{ border: "1px solid #E2E8F0" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: "#FFF7ED" }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: "#F97316" }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: "#0F172A" }}>
                          {journey.title}
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
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
