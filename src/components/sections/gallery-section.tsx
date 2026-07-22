"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { galleryProjects, galleryCategories } from "@/lib/constants";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory);

  const selected = galleryProjects.find((p) => p.id === selectedProject);

  return (
    <section id="gallery" className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            Gallery
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            Work we're proud of.
          </h2>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#22D3EE] text-[#0F1115]"
                  : "bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="break-inside-avoid group relative bg-[#161A20] border border-white/[0.04] rounded-2xl overflow-hidden cursor-pointer hover:border-[#22D3EE]/20 transition-all duration-300"
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#1E232B] to-[#161A20] flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-neutral-700" />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0F1115]/0 group-hover:bg-[#0F1115]/60 transition-all duration-400 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 text-white text-sm font-medium bg-[#22D3EE] px-4 py-2 rounded-xl">
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#22D3EE] mb-1.5 block">
                    {project.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F1115]/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[640px] w-full bg-[#161A20] border border-white/[0.08] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#1E232B] to-[#161A20] flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-neutral-700" />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#22D3EE] mb-2 block">
                  {selected.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {selected.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {selected.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#0F1115]/80 border border-white/[0.1] flex items-center justify-center text-white hover:bg-[#1E232B] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}