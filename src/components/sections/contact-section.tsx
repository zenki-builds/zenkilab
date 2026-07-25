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
    <section id="contact" className="relative py-24 lg:py-28 bg-[#05070A] border-t" style={{ borderColor: "#1E293B" }}>
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
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1] max-w-[600px]" style={{ color: "#E2E8F0" }}>
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
              style={{ border: "1px solid #1E293B", backgroundColor: "#0A0F16" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: "#1E1A14", color: "#F97316" }}
              >
                {channelIcons[channel.label] ?? <MessageCircle className="w-5 h-5" />}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
                  {channel.label}
                </p>
                <p className="text-xs truncate" style={{ color: "#94A3B8" }}>
                  {channel.value}
                </p>
              </div>

              <div className="ml-auto flex-shrink-0 text-[#64748B] group-hover:text-[#F97316] transition-colors duration-300">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Location & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-16 text-center p-10 lg:p-14 rounded-2xl"
          style={{ backgroundColor: "#0A0F16", border: "1px solid #1E293B" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#1E1A14", border: "1px solid #1E293B" }}
          >
            <MapPin className="w-5 h-5" style={{ color: "#F97316" }} />
          </div>

          <h3 className="text-xl font-bold mb-2" style={{ color: "#E2E8F0" }}>
            Visit the workshop
          </h3>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
            Colombo, Sri Lanka · Available by appointment
          </p>

          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-white h-[52px] px-7 rounded-xl text-sm font-semibold transition-all duration-300 hover:brightness-110"
            style={{ backgroundColor: "#F97316" }}
          >
            Request a Quote
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}