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
    <section id="services" className="relative py-24 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 block" style={{ color: "#F97316" }}>
            What We Manufacture
          </span>
          <h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1] max-w-[700px]"
            style={{ color: "#0F172A" }}
          >
            Pretty much anything you can dream up.
          </h2>
          <p className="text-lg mt-4 max-w-[600px] leading-relaxed" style={{ color: "#64748B" }}>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service) => (
            <motion.a
              key={service.title}
              href={service.href}
              variants={item}
              className="group relative rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{ backgroundColor: "#FFF7ED" }}
              >
                <service.icon className="w-5 h-5 transition-colors duration-300" style={{ color: "#F97316" }} />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold mb-2 tracking-[-0.01em]" style={{ color: "#0F172A" }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>
                {service.description}
              </p>

              {/* Examples */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {service.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[11px] px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", color: "#64748B" }}
                  >
                    {ex}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300"
                style={{ color: "#F97316" }}
              >
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
