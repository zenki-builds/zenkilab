"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/constants";

export function HowItWorksSection() {
  return (
    <section className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 lg:mb-28"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            How It Works
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            From idea to finished part in four steps.
          </h2>
          <p className="text-neutral-500 text-lg mt-4 max-w-[600px] leading-relaxed">
            Clear communication, honest timelines, and parts that fit — every single time.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-16 lg:space-y-0">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: "easeOut" }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                  idx % 2 === 0 ? "" : "lg:[direction:rtl]"
                }`}
              >
                {/* Content */}
                <div
                  className={`relative lg:text-right ${
                    idx % 2 === 1 ? "lg:text-left" : ""
                  }`}
                  style={{ direction: "ltr" }}
                >
                  {/* Step number (mobile) */}
                  <span className="lg:hidden text-[#22D3EE] text-sm font-bold tracking-[0.2em] mb-4 block">
                    {step.number}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed max-w-[420px] lg:ml-auto">
                    {step.description}
                  </p>
                </div>

                {/* Timestamp dot + number */}
                <div
                  className="hidden lg:flex items-center justify-center relative"
                  style={{ direction: "ltr" }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="w-14 h-14 rounded-2xl bg-[#161A20] border border-white/[0.08] flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                      <span className="text-sm font-bold text-[#22D3EE] tracking-widest">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for alternating layout */}
                <div className="hidden lg:block" />

                {/* Mobile connector */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden mt-10 ml-5 w-px h-12 bg-white/[0.06]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}