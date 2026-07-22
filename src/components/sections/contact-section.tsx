"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Camera,
  Users,
  Music2,
  MapPin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { contactChannels } from "@/lib/constants";

const channelIcons: Record<string, React.ReactNode> = {
  WhatsApp: <MessageCircle className="w-5 h-5" />,
  Email: <Mail className="w-5 h-5" />,
  Instagram: <Camera className="w-5 h-5" />,
  Facebook: <Users className="w-5 h-5" />,
  TikTok: <Music2 className="w-5 h-5" />,
};

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 lg:py-40 border-t border-white/[0.04]">
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
            Contact
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[600px]">
            Let's make something together.
          </h2>
        </motion.div>

        {/* Contact Channels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px] mx-auto"
        >
          {contactChannels.map((channel, idx) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-[#22D3EE]/20 hover:bg-[#22D3EE]/[0.02] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-neutral-400 group-hover:text-[#22D3EE] group-hover:border-[#22D3EE]/20 transition-colors duration-300 flex-shrink-0">
                {channelIcons[channel.label] || <ExternalLink className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-0.5">
                  {channel.label}
                </p>
                <p className="text-sm text-white truncate">{channel.value}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-700 group-hover:text-[#22D3EE] transition-colors duration-300 flex-shrink-0" />
            </a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-16 text-center p-10 lg:p-14 rounded-2xl border border-white/[0.06] bg-[#161A20]"
        >
          <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center mx-auto mb-5">
            <MapPin className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Based in Colombo, shipping island-wide
          </h3>
          <p className="text-neutral-400 mb-8 max-w-[480px] mx-auto leading-relaxed">
            We're a local team serving all of Sri Lanka. Whether you're in
            Colombo, Kandy, Galle, or Jaffna — we deliver to your doorstep.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}