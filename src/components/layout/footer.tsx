import Link from "next/link";
import { footerLinks, comingSoonFeatures } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-[#0F172A]" style={{ borderColor: "#1E293B" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: "#F97316", color: "#FFFFFF" }}
              >
                Z
              </div>
              <span className="text-lg font-bold tracking-[-0.01em] text-white">
                ZENKI LAB
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: "#94A3B8" }}>
              Premium custom 3D printing. Building confidence, one part at a time.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#CBD5E1" }}>
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "#94A3B8" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Launch phase note */}
        <div className="py-6 border-t" style={{ borderColor: "#1E293B" }}>
          <p className="text-sm text-center" style={{ color: "#64748B" }}>
            Zenki Lab is currently in its launch phase. New features and services are continuously being added as we grow.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="py-10 border-t" style={{ borderColor: "#1E293B" }}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4" style={{ color: "#F97316" }} />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#94A3B8" }}>
              Coming Soon
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {comingSoonFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group p-4 rounded-xl transition-all duration-300"
                style={{ border: "1px solid #1E293B", backgroundColor: "#111C33" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}
                >
                  <feature.icon className="w-4 h-4" style={{ color: "#F97316" }} />
                </div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: "#CBD5E1" }}>
                  {feature.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "#1E293B" }}>
          <p className="text-xs" style={{ color: "#64748B" }}>
            &copy; {new Date().getFullYear()} Zenki Lab. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            Colombo, Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
