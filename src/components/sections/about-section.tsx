"use client";

import { motion } from "framer-motion";
import { aboutText, trustStats } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
              About the Workshop
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-6">
              {aboutText.heading}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              {aboutText.paragraph1}
            </p>
            <p className="text-neutral-500 leading-relaxed">
              {aboutText.paragraph2}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {trustStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                className="bg-[#161A20] border border-white/[0.04] rounded-2xl p-6 lg:p-8 text-center hover:border-[#22D3EE]/15 hover:bg-[#22D3EE]/[0.02] transition-all duration-300"
              >
                <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white tracking-[-0.02em] block mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-neutral-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}