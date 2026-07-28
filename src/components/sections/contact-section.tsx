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
    <section id="contact" className="relative py-24 lg:py-28 bg-[#0B0D10] border-t" style={{ borderColor: "#293038" }}>
      <div className="max-w-[960px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 block" style={{ color: "#22D3EE" }}>
            Contact
          </span>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] leading-[1.1] max-w-[600px]" style={{ color: "#FFFFFF" }}>
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
              style={{ border: "1px solid #293038", backgroundColor: "#171B21" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: "rgba(34,211,238,0.08)", color: "#22D3EE" }}
              >
                {channelIcons[channel.label] ?? <MessageCircle className="w-5 h-5" />}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                  {channel.label}
                </p>
                <p className="text-xs truncate" style={{ color: "#A5ADB8" }}>
                  {channel.value}
                </p>
              </div>

              <div className="ml-auto flex-shrink-0 text-[#5F6A76] group-hover:text-[#22D3EE] transition-colors duration-300">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}