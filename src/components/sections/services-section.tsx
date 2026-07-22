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
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            What We Manufacture
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            Pretty much anything you can dream up.
          </h2>
          <p className="text-neutral-500 text-lg mt-4 max-w-[600px] leading-relaxed">
            From functional engineering parts to art pieces and cosplay props.
            If it can be printed, we can make it.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              href={service.href}
              variants={item}
              className="group relative bg-[#161A20] border border-white/[0.04] rounded-2xl p-7 lg:p-8 transition-all duration-400 hover:border-[#22D3EE]/20 hover:bg-[#22D3EE]/[0.02] hover:-translate-y-[2px]"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-5 group-hover:bg-[#22D3EE]/10 group-hover:border-[#22D3EE]/20 transition-all duration-300">
                <service.icon className="w-5 h-5 text-neutral-400 group-hover:text-[#22D3EE] transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white mb-2 tracking-[-0.01em]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Examples */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {service.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.04] text-neutral-500 group-hover:border-[#22D3EE]/15 group-hover:text-neutral-400 transition-colors duration-300"
                  >
                    {ex}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-[#22D3EE] transition-colors duration-300">
                Start a Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}