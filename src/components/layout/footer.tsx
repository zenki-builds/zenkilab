import Link from "next/link";
import { footerLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0F1115]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#22D3EE] flex items-center justify-center">
                <span className="text-[#0F1115] font-bold text-xs">Z</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                Zenki Lab
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px]">
              Custom manufacturing using professional 3D printing. From ideas to finished parts — we make things for people who need things made.
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