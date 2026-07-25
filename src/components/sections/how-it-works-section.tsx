"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-28 bg-[#05070A] border-t" style={{ borderColor: "#1E293B" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 lg:mb-16 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 block" style={{ color: "#F97316" }}>
            How It Works
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1]" style={{ color: "#E2E8F0" }}>
            From idea to finished part
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col lg:flex-row justify-between gap-8 lg:gap-0"
        >
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-[1px]" style={{ backgroundColor: "#1E293B" }} />

          {steps.map((step, idx) => (
            <motion.div key={step.title} variants={item} className="flex-1 text-center relative px-4">
              <div className="relative inline-block mx-auto">
                <div className="absolute left-1/2 -translate-x-1/2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#0A0F16", border: "1px solid #1E293B" }}>
                    <span className="text-sm font-bold tracking-widest" style={{ color: "#F97316" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-base font-semibold mt-20 mb-2" style={{ color: "#E2E8F0" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}