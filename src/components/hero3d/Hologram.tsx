"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFloating } from "./hooks/useFloating";

// ══════════════════════════════════════════════════════════════════════
// Procedural gear geometry — identical to Printer's gears so the
// hologram mirrors exactly what is being printed on the bed.
// ══════════════════════════════════════════════════════════════════════
function createGearGeometry(
  radius: number,
  teeth: number,
  toothDepth: number,
  thickness: number,
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const outerRadius = radius;
  const innerRadius = radius - toothDepth;
  const numPoints = teeth * 4;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const r = i % 4 === 1 || i % 4 === 2 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const holePath = new THREE.Path();
  holePath.absarc(0, 0, radius * 0.3, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.01,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/** Three floating, luminous wireframe gears — the hologram preview of what's being printed. */
export function Hologram({
  position = [-1.1, 0.2, 0.15],
}: {
  position?: [number, number, number];
}) {
  const root = useFloating<THREE.Group>({
    amplitude: 0.035,
    speed: 0.55,
    phase: 1.2,
  });
  const gearGroup = useRef<THREE.Group>(null);

  // Same gear dimensions as the printed gears on the bed
  const S = 0.52;
  const gearMaxThickness = 0.25 * S;

  const geoGear1 = useMemo(
    () => createGearGeometry(0.55 * S, 14, 0.08 * S, gearMaxThickness),
    [S, gearMaxThickness],
  );
  const geoGear2 = useMemo(
    () => createGearGeometry(0.4 * S, 10, 0.08 * S, gearMaxThickness),
    [S, gearMaxThickness],
  );
  const geoGear3 = useMemo(
    () => createGearGeometry(0.3 * S, 8, 0.07 * S, gearMaxThickness),
    [S, gearMaxThickness],
  );

  const wireframe = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#67e8f9",
        wireframe: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );
  const aura = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#0e7490",
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  // Rotate the whole gear assembly
  useFrame(({ clock }, delta) => {
    if (gearGroup.current) {
      gearGroup.current.rotation.y += delta * 0.55;
      gearGroup.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.7) * 0.08;
    }
  });

  return (
    <group ref={root} position={position}>
      {/* Glowing platform ring */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 40]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Light cone / projector beam */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.24, 0.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.11}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3 floating wireframe gears — cycling print preview */}
      <group ref={gearGroup} position={[0, 0.35, 0]}>
        {/* Gear 1 — 14 teeth (large) */}
        <group position={[-0.18 * S, 0, 0.05 * S]}>
          <mesh geometry={geoGear1} material={wireframe} />
          <mesh geometry={geoGear1} material={aura} scale={1.008} />
        </group>

        {/* Gear 2 — 10 teeth (medium), rotated to mesh */}
        <group
          position={[0.26 * S, 0, 0.05 * S]}
          rotation={[0, Math.PI / 10, 0]}
        >
          <mesh geometry={geoGear2} material={wireframe} />
          <mesh geometry={geoGear2} material={aura} scale={1.008} />
        </group>

        {/* Gear 3 — 8 teeth (small) */}
        <group position={[0.02 * S, 0, -0.29 * S]}>
          <mesh geometry={geoGear3} material={wireframe} />
          <mesh geometry={geoGear3} material={aura} scale={1.008} />
        </group>
      </group>

      {/* Orbital ring accent */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[0.54, 0.006, 8, 48]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}