"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

interface PrintedObjectProps {
  animation: RefObject<{ progress: number }>;
  position?: [number, number, number];
}

/** Lightweight, procedural gear assembly revealed one print layer at a time. */
export function PrintedObject({ animation, position = [0, -0.39, 0] }: PrintedObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: "#475569", metalness: 0.92, roughness: 0.24 }), []);
  const glow = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0b3c4a", emissive: "#22d3ee", emissiveIntensity: 0.75, metalness: 0.7, roughness: 0.2 }), []);

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(animation.current.progress, 0.025, 1);
    if (!groupRef.current) return;
    groupRef.current.scale.y = progress;
    groupRef.current.position.y = position[1] - 0.16 * (1 - progress);
  });

  const teeth = Array.from({ length: 16 }, (_, index) => (index / 16) * Math.PI * 2);
  return (
    <group ref={groupRef} position={position}>
      <group position={[0, 0.16, 0]}>
        <mesh castShadow receiveShadow material={metal}>
          <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={glow} position={[0, 0.165, 0]}>
          <torusGeometry args={[0.12, 0.018, 8, 28]} />
        </mesh>
        {teeth.map((angle) => (
          <mesh key={angle} position={[Math.cos(angle) * 0.29, 0, Math.sin(angle) * 0.29]} rotation={[0, -angle, 0]} material={metal} castShadow>
            <boxGeometry args={[0.09, 0.32, 0.07]} />
          </mesh>
        ))}
        <mesh material={metal}>
          <cylinderGeometry args={[0.075, 0.075, 0.34, 24]} />
        </mesh>
      </group>
    </group>
  );
}