"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Object3D } from "three";

type FloatingOptions = {
  /** Vertical bob amplitude in world units */
  amplitude?: number;
  /** Cycles per second */
  speed?: number;
  /** Max rotation on Z in radians (subtle tilt) */
  tiltAmplitude?: number;
  /** Phase offset so multiple objects don't move in lockstep */
  phase?: number;
};

/**
 * useFloating
 * ─────────────────────────────────────────────────────────
 * Applies a gentle sinusoidal vertical bob + subtle tilt to
 * an Object3D ref every frame. Pure useFrame-driven (no GSAP
 * ticking needed for this loop) — cheap trig, runs at 60fps.
 *
 * Usage: const ref = useFloating({ amplitude: 0.08 });
 *        <group ref={ref}>...</group>
 */
export function useFloating<T extends Object3D = Group>(opts: FloatingOptions = {}) {
  const {
    amplitude = 0.06,
    speed = 0.6,
    tiltAmplitude = 0.035, // ~2°
    phase = 0,
  } = opts;

  const ref = useRef<T>(null);
  const baseY = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const obj = ref.current;
    if (!obj) return;

    if (baseY.current === null) {
      baseY.current = obj.position.y;
    }

    const t = clock.getElapsedTime() * speed + phase;
    obj.position.y = baseY.current + Math.sin(t) * amplitude;
    obj.rotation.z = Math.sin(t * 0.7) * tiltAmplitude;
  });

  return ref;
}
