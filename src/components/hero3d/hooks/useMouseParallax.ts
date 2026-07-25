"use client";

import { useEffect, useRef } from "react";

/**
 * useMouseParallax
 * ─────────────────────────────────────────────────────────
 * Tracks normalized pointer position (-1 → 1 on both axes)
 * in a mutable ref so consumers can read it inside a
 * useFrame() loop without triggering React re-renders on
 * every mouse move (critical for keeping 60fps).
 */
export function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1..1, origin center of viewport
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return mouse;
}
