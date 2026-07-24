import Link from "next/link";
import { footerLinks, comingSoonFeatures } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0F1115]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <span className="text-lg font-bold tracking-[-0.02em] text-white">
                ZENKI<span className="text-[#22D3EE]">LAB</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px]">
              A premium custom 3D printing workshop. Built by makers, for makers — bringing ideas into the real world.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-white transition-colors duration-200"
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
        <div className="py-6 border-t border-white/[0.04]">
          <p className="text-sm text-neutral-600 text-center">
            Zenki Lab is currently in its launch phase. New features and services are continuously being added as we grow.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="py-10 border-t border-white/[0.04]">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500">
              Coming Soon
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {comingSoonFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:border-[#22D3EE]/10 hover:bg-[#22D3EE]/[0.01] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/5 border border-[#22D3EE]/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-4 h-4 text-[#22D3EE]/50" />
                </div>
                <h4 className="text-sm font-semibold text-neutral-400 mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Zenki Lab. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700">
            Colombo, Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
