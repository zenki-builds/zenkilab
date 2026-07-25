"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Materials", href: "#materials" },
  { label: "About", href: "#about" },
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

  // Light chrome once scrolled past the dark hero, dark-on-transparent while over the hero.
  const textColor = scrolled ? "#0F172A" : "#FFFFFF";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo — hexagon monogram, matches brand mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 2 L36 11 V29 L20 38 L4 29 V11 Z"
                stroke="#22D3EE"
                strokeWidth="1.6"
                fill="none"
              />
              <path
                d="M20 2 L36 11 V29 L20 38 L4 29 V11 Z"
                stroke={textColor}
                strokeOpacity="0.15"
                strokeWidth="1.6"
                fill="none"
                transform="scale(0.78) translate(5.7 5.7)"
              />
              <text
                x="20"
                y="25"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill={textColor}
                fontFamily="var(--font-geist-sans), sans-serif"
              >
                Z
              </text>
            </svg>
            <span className="text-lg font-extrabold tracking-[0.02em] transition-colors duration-300" style={{ color: textColor }}>
              ZENKI<span style={{ color: "#22D3EE" }}>LAB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:opacity-100"
                style={{
                  color: textColor,
                  opacity: scrolled ? 0.75 : 0.85,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Menu Button (hamburger, all breakpoints) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-md transition-colors"
            style={{ color: textColor, backgroundColor: scrolled ? "transparent" : "rgba(255,255,255,0.06)" }}
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
            className="lg:hidden bg-[#0B1624]/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-sm font-medium rounded-md hover:bg-white/5 transition-colors text-white/90"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
