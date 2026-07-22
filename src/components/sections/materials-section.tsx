"use client";

import { motion } from "framer-motion";
import { materials } from "@/lib/constants";

export function MaterialsSection() {
  return (
    <section id="materials" className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            Engineering Materials
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            The right material for every application.
          </h2>
          <p className="text-neutral-500 text-lg mt-4 max-w-[600px] leading-relaxed">
            We'll help you choose. From everyday PLA to industrial-grade carbon
            fibre composites — there's a material for your project.
          </p>
        </motion.div>

        {/* Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((material, idx) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              className="group relative bg-[#161A20] border border-white/[0.04] rounded-2xl p-8 lg:p-9 hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Color indicator bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-all duration-500 group-hover:left-2 group-hover:right-2"
                style={{ backgroundColor: material.color }}
              />

              {/* Name */}
              <div className="flex items-center gap-3 mb-4 mt-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full`}
                  style={{ backgroundColor: material.color }}
                />
                <h3 className="text-xl font-bold text-white tracking-[-0.01em]">
                  {material.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-500 leading-relaxed mb-7">
                {material.description}
              </p>

              {/* Stats */}
              <div className="space-y-3">
                {material.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:border-[#22D3EE]/15 transition-colors duration-300">
                      <stat.icon className={`w-3.5 h-3.5 ${material.textColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-600 mb-0.5">
                        {stat.label}
                      </p>
                      <p className="text-sm font-medium text-neutral-200 truncate">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}