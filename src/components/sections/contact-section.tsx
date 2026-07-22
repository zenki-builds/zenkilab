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
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#E63946] mb-4 block">
            Contact
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[600px]">
            Let's build something together.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            {contactChannels.map((channel, idx) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-[#E63946]/20 hover:bg-[#E63946]/[0.02] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-neutral-400 group-hover:text-[#E63946] group-hover:border-[#E63946]/20 transition-colors duration-300 flex-shrink-0">
                  {channelIcons[channel.label] || <ExternalLink className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-0.5">
                    {channel.label}
                  </p>
                  <p className="text-sm text-white truncate">{channel.value}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700 group-hover:text-[#E63946] transition-colors duration-300 flex-shrink-0" />
              </a>
            ))}
          </motion.div>

          {/* Map / Location */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl overflow-hidden h-full min-h-[320px] flex flex-col"
          >
            {/* Map placeholder */}
            <div className="flex-1 bg-gradient-to-br from-[#262626] to-[#1a1a1a] flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-500 font-medium">Colombo, Sri Lanka</p>
                <p className="text-xs text-neutral-700 mt-1">
                  Google Maps integration coming soon
                </p>
              </div>
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            {/* Address Bar */}
            <div className="p-5 border-t border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#E63946]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Zenki Lab</p>
                  <p className="text-xs text-neutral-500">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-16 text-center p-10 lg:p-14 rounded-2xl border border-white/[0.06] bg-white/[0.01]"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to start your project?
          </h3>
          <p className="text-neutral-400 mb-8 max-w-[480px] mx-auto leading-relaxed">
            Upload your design and receive a detailed quotation within 24 hours.
            No minimum order quantity — we print from one to thousands.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#E63946]/90 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,57,70,0.3)]"
          >
            Get a Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}