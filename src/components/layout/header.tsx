"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F1115]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo — typography only, no placeholder icon */}
          <Link href="/" className="flex items-center group">
            <span className="text-xl font-bold tracking-[-0.02em] text-white">
              ZENKI<span className="text-[#22D3EE]">LAB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white hover:bg-white/[0.06] h-10 px-4 text-sm font-medium rounded-lg transition-colors"
            >
              What We Make
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white h-10 px-5 text-sm font-medium rounded-lg transition-colors hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
            >
              Start Your Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0F1115]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-base text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="#quote"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#EF4444] hover:bg-[#EF4444]/90 text-white h-12 text-sm font-medium rounded-lg transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full text-neutral-300 hover:text-white hover:bg-white/[0.06] h-12 text-sm font-medium rounded-lg transition-colors"
                >
                  What We Make
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}