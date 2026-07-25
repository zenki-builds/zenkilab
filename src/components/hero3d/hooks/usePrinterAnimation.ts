"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Group, MeshStandardMaterial } from "three";
import type { RefObject } from "react";

export type PrinterAnimState = {
  headX: number;
  headZ: number;
  progress: number;
};

export type UsePrinterAnimProps = {
  headRef: RefObject<Group | null>;
  nozzleMatRef: RefObject<MeshStandardMaterial | null>;
  ledMatRef: RefObject<MeshStandardMaterial | null>;
  /** Optional observer for non-rendering consumers. Avoid React state here. */
  onStateUpdate?: (state: PrinterAnimState) => void;
};

/**
 * usePrinterAnimation
 * ─────────────────────────────────────────────────────────
 * Synchronizes 3D printer gantry motion with layer-by-layer printing growth:
 * - Print head sweeps left/right (X) and steps forward/back (Z)
 * - Print layer growth progress ticks upward from 0.05 -> 1.0, holds, resets
 * - Nozzle glow and status LED pulse smoothly
 */
export function usePrinterAnimation({
  headRef,
  nozzleMatRef,
  ledMatRef,
  onStateUpdate,
}: UsePrinterAnimProps) {
  const stateRef = useRef<PrinterAnimState>({
    headX: 0,
    headZ: 0,
    progress: 0.05,
  });

  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];
    const tweens: gsap.core.Tween[] = [];

    // 1. Head sweep X & Z movement timeline
    if (headRef.current) {
      const headTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "power1.inOut" } });
      headTl
        .to(stateRef.current, {
          headX: 0.42,
          duration: 1.4,
          onUpdate: () => {
            if (headRef.current) headRef.current.position.x = stateRef.current.headX;
            onStateUpdate?.(stateRef.current);
          },
        })
        .to(stateRef.current, {
          headZ: 0.2,
          duration: 0.3,
          onUpdate: () => {
            if (headRef.current) headRef.current.position.z = stateRef.current.headZ;
            onStateUpdate?.(stateRef.current);
          },
        })
        .to(stateRef.current, {
          headX: -0.42,
          duration: 1.4,
          onUpdate: () => {
            if (headRef.current) headRef.current.position.x = stateRef.current.headX;
            onStateUpdate?.(stateRef.current);
          },
        })
        .to(stateRef.current, {
          headZ: -0.2,
          duration: 0.3,
          onUpdate: () => {
            if (headRef.current) headRef.current.position.z = stateRef.current.headZ;
            onStateUpdate?.(stateRef.current);
          },
        });
      timelines.push(headTl);
    }

    // 2. Layer growth progress (0.05 -> 1.0 over 6s, brief hold at full height, reset)
    const growTl = gsap.timeline({ repeat: -1 });
    growTl
      .to(stateRef.current, {
        progress: 1.0,
        duration: 7.0,
        ease: "none",
        onUpdate: () => {
          onStateUpdate?.(stateRef.current);
        },
      })
      .to(stateRef.current, {
        progress: 1.0,
        duration: 1.2, // hold full print briefly
        onUpdate: () => {
          onStateUpdate?.(stateRef.current);
        },
      })
      .to(stateRef.current, {
        progress: 0.05,
        duration: 0.05, // instant restart
        onUpdate: () => {
          onStateUpdate?.(stateRef.current);
        },
      });
    timelines.push(growTl);

    // 3. Nozzle glow pulse
    if (nozzleMatRef.current) {
      const nozzleTween = gsap.to(nozzleMatRef.current, {
        emissiveIntensity: 1.5,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      tweens.push(nozzleTween);
    }

    // 4. Status LED pulse
    if (ledMatRef.current) {
      const ledTween = gsap.to(ledMatRef.current, {
        emissiveIntensity: 0.9,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      tweens.push(ledTween);
    }

    return () => {
      timelines.forEach((tl) => tl.kill());
      tweens.forEach((tw) => tw.kill());
    };
  }, [headRef, nozzleMatRef, ledMatRef, onStateUpdate]);

  return stateRef;
}
