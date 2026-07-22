"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/constants";

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[960px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            FAQ
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            Questions? We've got answers.
          </h2>
        </motion.div>

        {/* Questions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              className={`border rounded-2xl transition-all duration-300 ${
                openIdx === idx
                  ? "border-[#22D3EE]/20 bg-white/[0.02]"
                  : "border-white/[0.04] bg-transparent hover:border-white/[0.08]"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIdx === idx
                      ? "border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]"
                      : "border-white/[0.06] text-neutral-500"
                  }`}
                >
                  {openIdx === idx ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIdx === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}