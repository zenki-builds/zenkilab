"use client";

import { motion } from "framer-motion";
import { materials } from "@/lib/constants";

export function MaterialsSection() {
  return (
    <section id="materials" className="relative py-24 lg:py-28 bg-[#05070A] border-t" style={{ borderColor: "#1E293B" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 block" style={{ color: "#F97316" }}>
            Materials
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1] max-w-[700px]" style={{ color: "#E2E8F0" }}>
            The right material for your project.
          </h2>
          <p className="text-lg mt-4 max-w-[600px] leading-relaxed" style={{ color: "#94A3B8" }}>
            We'll help you choose. From everyday PLA to carbon fibre
            composites — there's a material that fits your application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material, idx) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              className="group relative rounded-2xl p-8 lg:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: "#0A0F16", border: "1px solid #1E293B" }}
            >
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-all duration-500 group-hover:left-2 group-hover:right-2"
                style={{ backgroundColor: material.color }}
              />
              <div className="flex items-center gap-3 mb-4 mt-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: material.color }} />
                <h3 className="text-xl font-bold tracking-[-0.01em]" style={{ color: "#E2E8F0" }}>
                  {material.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "#94A3B8" }}>
                {material.description}
              </p>
              <div className="space-y-3">
                {material.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#0F1720", border: "1px solid #1E293B" }}
                    >
                      <stat.icon className="w-3.5 h-3.5" style={{ color: "#F97316" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "#64748B" }}>
                        {stat.label}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: "#CBD5E1" }}>
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