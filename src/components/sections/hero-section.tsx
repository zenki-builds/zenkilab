"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Camera, Lightbulb, Sparkles } from "lucide-react";
import { projectJourneys } from "@/lib/constants";
import { Hero } from "@/components/hero3d/Hero";

/**
 * HeroSection
 * ─────────────────────────────────────────────────────────
 * Wraps the React Three Fiber hero scene (src/components/hero3d)
 * with the section shell and the "Start Your Project" modal.
 * All heavy 3D logic lives in hero3d/ — this file stays a thin,
 * fast-parsing composition root.
 */
export function HeroSection() {
  const [showJourneys, setShowJourneys] = useState(false);
  const journeyIcons = [FileText, Camera, Lightbulb, Sparkles];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-28 overflow-hidden bg-[#0B0D10]"
    >
      <Hero onStart={() => setShowJourneys(true)} />

      {/* ── Start Your Project Modal ── */}
      <AnimatePresence>
        {showJourneys && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(8,10,14,0.6)" }}
            onClick={() => setShowJourneys(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[720px] w-full rounded-2xl p-8 lg:p-10"
              style={{ backgroundColor: "#171B21", border: "1px solid #293038" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
                    Start Your Project
                  </h2>
                  <p className="text-sm" style={{ color: "#A5ADB8" }}>
                    Choose the path that best describes your situation
                  </p>
                </div>
                <button
                  onClick={() => setShowJourneys(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                  style={{ border: "1px solid #293038", color: "#A5ADB8" }}
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
                      className="group flex flex-col gap-3 p-5 rounded-xl transition-all duration-300 hover:border-[#22D3EE]/40"
                      style={{ border: "1px solid #293038" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: "rgba(34,211,238,0.08)" }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: "#22D3EE" }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: "#FFFFFF" }}>
                          {journey.title}
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: "#A5ADB8" }}>
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