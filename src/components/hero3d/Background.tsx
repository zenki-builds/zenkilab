"use client";

/**
 * Background
 * ─────────────────────────────────────────────────────────
 * Pure HTML/CSS backdrop layered behind the <Canvas>. Kept out
 * of WebGL entirely — gradients, grid lines and vignette are
 * free on the GPU compositor and don't cost a single draw call
 * in the 3D scene, which keeps the frame budget for the
 * actual R3F content.
 */
export function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Dark gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 32%, rgba(34,211,238,0.14), transparent 55%), linear-gradient(150deg, #05070A 0%, #0A0F16 45%, #0D1420 100%)",
        }}
      />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "42px 42px",
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px)",
        }}
      />

      {/* Animated HUD lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line x1="0" y1="18%" x2="100%" y2="18%" stroke="#22D3EE" strokeOpacity="0.08" strokeDasharray="6 10" className="hero2-dashline" />
        <line x1="0" y1="82%" x2="100%" y2="82%" stroke="#22D3EE" strokeOpacity="0.06" strokeDasharray="4 8" className="hero2-dashline" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#22D3EE" strokeOpacity="0.05" strokeDasharray="2 8" className="hero2-dashline" />
      </svg>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
