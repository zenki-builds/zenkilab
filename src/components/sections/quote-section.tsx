"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Upload,
  X,
  File as FileIcon,
  CheckCircle,
  Loader2,
  Paperclip,
  Sparkles,
} from "lucide-react";

const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250 MB
const ACCEPTED_TYPES = [
  ".stl",
  ".obj",
  ".3mf",
  ".step",
  ".stp",
  ".zip",
];

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  country: z.string().min(1, "Country is required"),
  material: z.string().min(1, "Please select a material"),
  color: z.string().min(1, "Color preference is required"),
  quantity: z.string().min(1, "Quantity is required"),
  layerHeight: z.string().min(1, "Layer height is required"),
  notes: z.string().optional(),
  desiredDate: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const materials = [
  { value: "pla", label: "PLA" },
  { value: "petg", label: "PETG" },
  { value: "abs", label: "ABS" },
  { value: "asa", label: "ASA" },
  { value: "tpu", label: "TPU" },
  { value: "carbon-fiber", label: "Carbon Fiber Composite" },
  { value: "not-sure", label: "Not Sure / Need Recommendation" },
];

const layerHeights = [
  { value: "0.10", label: "0.10 mm · Ultra Detail" },
  { value: "0.16", label: "0.16 mm · High Quality" },
  { value: "0.20", label: "0.20 mm · Standard" },
  { value: "0.28", label: "0.28 mm · Draft" },
  { value: "0.32", label: "0.32 mm · Fast" },
];

const quantities = [
  { value: "1", label: "1 unit" },
  { value: "2-5", label: "2–5 units" },
  { value: "6-20", label: "6–20 units" },
  { value: "21-100", label: "21–100 units" },
  { value: "100+", label: "100+ units" },
];

export function QuoteSection() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      country: "Sri Lanka",
      layerHeight: "0.20",
      quantity: "1",
    },
  });

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const incoming = Array.from(newFiles);
      const valid = incoming.filter(
        (f) =>
          ACCEPTED_TYPES.some((ext) => f.name.toLowerCase().endsWith(ext)) ||
          incoming.some((x) => x.type === "application/zip")
      );
      if (valid.length > 0) {
        setFiles((prev) => [...prev, ...valid].slice(0, 10));
        // Simulate upload animation
        setUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setUploading(false);
              return 100;
            }
            return prev + Math.random() * 20 + 10;
          });
        }, 200);
      }
    },
    []
  );

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Quote data:", data, "Files:", files.length);
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => {
      setSubmitted(false);
      setFiles([]);
    }, 6000);
  };

  return (
    <section id="quote" className="relative py-32 lg:py-40 border-t border-white/[0.04]">
      <div className="max-w-[960px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#22D3EE] mb-4 block">
            Start Your Project
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-[700px]">
            Tell us what you need. We'll handle the rest.
          </h2>
          <p className="text-neutral-500 text-lg mt-4 max-w-[600px] leading-relaxed">
            Upload your files, describe your project, and our engineers will
            review and respond with a detailed quote within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
          >
            {/* File Upload — redesigned Linear/Figma style */}
            <div>
              <label className="text-sm font-semibold text-neutral-300 mb-2 block">
                Design Files
              </label>
              <p className="text-xs text-neutral-600 mb-4">
                Accepted: STL, OBJ, 3MF, STEP, ZIP &middot; Up to 250 MB per file &middot; Max 10 files
              </p>

              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                className={`relative border-2 border-dashed rounded-2xl p-12 lg:p-16 text-center transition-all duration-400 ${
                  dragOver
                    ? "border-[#22D3EE] bg-[#22D3EE]/[0.04] scale-[1.01]"
                    : "border-white/[0.06] hover:border-[#22D3EE]/30 bg-white/[0.01]"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                {/* Upload icon with animated ring */}
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-2xl border border-[#22D3EE]/20 animate-pulse" />
                  <div className="relative w-full h-full rounded-2xl bg-[#22D3EE]/[0.06] border border-[#22D3EE]/20 flex items-center justify-center">
                    {uploading ? (
                      <Loader2 className="w-6 h-6 text-[#22D3EE] animate-spin" />
                    ) : (
                      <Upload className="w-6 h-6 text-[#22D3EE]" />
                    )}
                  </div>
                </div>

                <p className="text-base font-medium text-white mb-1">
                  {dragOver ? "Drop your files here" : "Drag and drop your files here"}
                </p>
                <p className="text-sm text-neutral-500">
                  or click to browse
                </p>

                {/* Upload progress bar */}
                <AnimatePresence>
                  {uploading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 max-w-[320px] mx-auto"
                    >
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#22D3EE] to-[#0891B2] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(uploadProgress, 100)}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-2">
                        {uploadProgress < 100
                          ? "Analysing file..."
                          : "File uploaded successfully"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* File List */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {files.map((file, idx) => (
                      <motion.div
                        key={`${file.name}-${idx}`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        className="flex items-center gap-3 bg-[#161A20] border border-white/[0.06] rounded-xl px-4 py-3"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-4 h-4 text-[#22D3EE]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{file.name}</p>
                          <p className="text-xs text-neutral-500">
                            {formatSize(file.size)} &middot; Printability:{" "}
                            <span className="text-[#22D3EE]">Checking...</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Two column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldWrapper label="Full Name" error={errors.name?.message} required>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Email" error={errors.email?.message} required>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Phone" error={errors.phone?.message} required>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+94 77 000 0000"
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Country" error={errors.country?.message} required>
                <input
                  {...register("country")}
                  type="text"
                  placeholder="Sri Lanka"
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Material" error={errors.material?.message} required>
                <select {...register("material")} className={inputClass}>
                  <option value="">Select material...</option>
                  {materials.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper label="Color" error={errors.color?.message} required>
                <input
                  {...register("color")}
                  type="text"
                  placeholder="e.g., Matte Black, White"
                  className={inputClass}
                />
              </FieldWrapper>

              <FieldWrapper label="Quantity" error={errors.quantity?.message} required>
                <select {...register("quantity")} className={inputClass}>
                  {quantities.map((q) => (
                    <option key={q.value} value={q.value}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper
                label="Layer Height"
                error={errors.layerHeight?.message}
                required
              >
                <select {...register("layerHeight")} className={inputClass}>
                  {layerHeights.map((lh) => (
                    <option key={lh.value} value={lh.value}>
                      {lh.label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            </div>

            {/* Desired Date */}
            <FieldWrapper
              label="Desired Completion Date"
              error={errors.desiredDate?.message}
            >
              <input
                {...register("desiredDate")}
                type="date"
                className={inputClass}
              />
            </FieldWrapper>

            {/* Notes */}
            <FieldWrapper label="Project Notes" error={errors.notes?.message}>
              <textarea
                {...register("notes")}
                rows={4}
                placeholder="Tell us about your project — what are you making, what's it for, any specific requirements? The more detail, the more accurate your quote."
                className={`${inputClass} resize-none`}
              />
            </FieldWrapper>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2.5 bg-[#EF4444] hover:bg-[#EF4444]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white h-[52px] px-8 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Submit Quote Request
                </>
              )}
            </button>
          </motion.form>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#22D3EE]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Quote Request Submitted
            </h3>
            <p className="text-neutral-400 max-w-[460px] mx-auto leading-relaxed">
              Thank you. Our engineering team will review your files and respond
              with a detailed quotation within 24 hours. We're excited to work on your project.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Helper Components ─────────────────────────────────

function FieldWrapper({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-300 flex items-center gap-1">
        {label}
        {required && <span className="text-[#EF4444]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#EF4444] mt-1">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full h-12 px-4 bg-[#161A20] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#22D3EE]/30 focus:ring-1 focus:ring-[#22D3EE]/15 transition-all duration-200";