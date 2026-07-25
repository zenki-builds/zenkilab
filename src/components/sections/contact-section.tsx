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
    <section id="contact" className="relative py-24 lg:py-28 bg-white border-t" style={{ borderColor: "#E2E8F0" }}>
      <div className="max-w-[960px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 block" style={{ color: "#F97316" }}>
            Contact
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1] max-w-[600px]" style={{ color: "#0F172A" }}>
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
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md"
              style={{ border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: "#FFF7ED", color: "#F97316" }}
              >
                {channelIcons[channel.label] || <ExternalLink className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: "#94A3B8" }}>
                  {channel.label}
                </p>
                <p className="text-sm truncate" style={{ color: "#0F172A" }}>{channel.value}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#CBD5E1" }} />
            </a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-16 text-center p-10 lg:p-14 rounded-2xl"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#FFF7ED", border: "1px solid #FED7AA" }}
          >
            <MapPin className="w-5 h-5" style={{ color: "#F97316" }} />
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>
            Based in Colombo, shipping island-wide
          </h3>
          <p className="mb-8 max-w-[480px] mx-auto leading-relaxed" style={{ color: "#64748B" }}>
            We're a local team serving all of Sri Lanka. Whether you're in
            Colombo, Kandy, Galle, or Jaffna — we deliver to your doorstep.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:brightness-110"
            style={{ backgroundColor: "#F97316" }}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
