"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#E63946] mb-4 block">
            What We Manufacture
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            Precision manufacturing across every category.
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]"
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              href={service.href}
              variants={item}
              className="group relative bg-[#111111] p-8 lg:p-10 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-white/[0.06] transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-[#E63946]/10 group-hover:border-[#E63946]/20 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-neutral-400 group-hover:text-[#E63946] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 tracking-[-0.01em]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-5 line-clamp-3">
                  {service.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-[#E63946] transition-colors duration-300">
                  Get a Quote
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}