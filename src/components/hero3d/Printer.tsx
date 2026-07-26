"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

interface PrinterProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  position?: [number, number, number];
}

// ══════════════════════════════════════════════════════════════════════
// Procedural gear geometry
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
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/**
 * Printer
 * ───────
 * Open 2‑pillar 3D printer with premium brand-aligned materials.
 * Warm charcoal frame, pearl-white toolhead, orange brand filament,
 * polished chrome rails, and brass nozzle.
 */
export function Printer({ mouse, position = [2.8, -0.72, -0.08] }: PrinterProps) {
  const rigRef = useRef<Group>(null);
  const gantryRef = useRef<Group>(null);
  const toolheadRef = useRef<Group>(null);
  const bedRef = useRef<Group>(null);
  const gear1Ref = useRef<Group>(null);
  const gear2Ref = useRef<Group>(null);
  const gear3Ref = useRef<Group>(null);

  const S = 0.52;
  const baseWidth = 3.2 * S;
  const baseDepth = 3.6 * S;
  const pillarHeight = 3.8 * S;
  const pillarX = 1.4 * S;
  const gearMaxThickness = 0.25 * S;

  // ── Premium material palette ──
  const matFrame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1e2328", metalness: 0.88, roughness: 0.28 }),
    [],
  );
  const matFrameAccent = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#15191e", metalness: 0.9, roughness: 0.22 }),
    [],
  );
  const matBracket = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#171210", metalness: 0.85, roughness: 0.3 }),
    [],
  );
  const matToolhead = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8e4de", metalness: 0.08, roughness: 0.45 }),
    [],
  );
  const matBedCarrier = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d5d0c8", metalness: 0.5, roughness: 0.45 }),
    [],
  );
  const matPEI = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8e4de", metalness: 0.25, roughness: 0.5 }),
    [],
  );
  const matChrome = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ecedee", metalness: 0.97, roughness: 0.12 }),
    [],
  );
  const matGear = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#22D3EE", metalness: 0.05, roughness: 0.7 }),
    [],
  );
  const matBrass = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c49b3c", metalness: 0.92, roughness: 0.18 }),
    [],
  );
  const matOrange = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#22D3EE", metalness: 0.15, roughness: 0.5 }),
    [],
  );
  const matOrangeAccent = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#22D3EE", emissive: "#22D3EE", emissiveIntensity: 0.4, metalness: 0.2, roughness: 0.3 }),
    [],
  );

  // ── Pre‑generated gear geometries ──
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

  const g1x = -0.35 * S;
  const g1z = 0.1 * S;
  const g2x = 0.5 * S;
  const g2z = 0.1 * S;
  const g3x = 0.05 * S;
  const g3z = -0.55 * S;

  // ── Animation ──
  useFrame(({ clock }) => {
    const root = rigRef.current;
    if (root) {
      root.rotation.y = THREE.MathUtils.lerp(
        root.rotation.y,
        -0.302 + mouse.current.x * 0.04,
        0.05,
      );
      root.rotation.x = THREE.MathUtils.lerp(
        root.rotation.x,
        Math.sin(clock.getElapsedTime() * 0.35) * 0.006 - mouse.current.y * 0.02,
        0.05,
      );
    }

    const elapsed = clock.getElapsedTime();
    const printProgress = (elapsed % 16) / 16;

    if (gantryRef.current) {
      gantryRef.current.position.y = 0.91 * S + printProgress * gearMaxThickness;
    }

    const gearScaleY = Math.max(0.001, printProgress);
    if (gear1Ref.current) gear1Ref.current.scale.set(1, gearScaleY, 1);
    if (gear2Ref.current) gear2Ref.current.scale.set(1, gearScaleY, 1);
    if (gear3Ref.current) gear3Ref.current.scale.set(1, gearScaleY, 1);

    const activeCycle = Math.floor((elapsed * 1.5) % 3);
    let targetX = 0;
    let targetBedZ = 0;

    if (activeCycle === 0) {
      targetX = g1x + Math.sin(elapsed * 6) * 0.45 * S;
      targetBedZ = -g1z + Math.cos(elapsed * 6) * 0.45 * S;
    } else if (activeCycle === 1) {
      targetX = g2x + Math.sin(elapsed * 7) * 0.32 * S;
      targetBedZ = -g2z + Math.cos(elapsed * 7) * 0.32 * S;
    } else {
      targetX = g3x + Math.sin(elapsed * 8) * 0.22 * S;
      targetBedZ = -g3z + Math.cos(elapsed * 8) * 0.22 * S;
    }

    if (toolheadRef.current) {
      toolheadRef.current.position.x += (targetX - toolheadRef.current.position.x) * 0.1;
    }
    if (bedRef.current) {
      bedRef.current.position.z += (targetBedZ - bedRef.current.position.z) * 0.1;
    }
  });

  return (
    <group ref={rigRef} position={position}>
      {/* ═══ BASE FRAME — Y-Rails ═══ */}
      <mesh position={[-1.4 * S, 0.1 * S, 0]} material={matFrame} castShadow>
        <boxGeometry args={[0.2 * S, 0.2 * S, baseDepth]} />
      </mesh>
      <mesh position={[1.4 * S, 0.1 * S, 0]} material={matFrame} castShadow>
        <boxGeometry args={[0.2 * S, 0.2 * S, baseDepth]} />
      </mesh>
      <mesh position={[0, 0.1 * S, baseDepth / 2]} material={matFrame} castShadow>
        <boxGeometry args={[baseWidth, 0.2 * S, 0.2 * S]} />
      </mesh>
      <mesh position={[0, 0.1 * S, -baseDepth / 2]} material={matFrame} castShadow>
        <boxGeometry args={[baseWidth, 0.2 * S, 0.2 * S]} />
      </mesh>

      {/* Y linear rods — chrome */}
      <mesh
        position={[-0.7 * S, 0.22 * S, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={matChrome}
      >
        <cylinderGeometry args={[0.04 * S, 0.04 * S, baseDepth - 0.4 * S, 16]} />
      </mesh>
      <mesh
        position={[0.7 * S, 0.22 * S, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={matChrome}
      >
        <cylinderGeometry args={[0.04 * S, 0.04 * S, baseDepth - 0.4 * S, 16]} />
      </mesh>

      {/* ═══ VERTICAL PILLARS & TOP CROSSBAR ═══ */}
      <mesh
        position={[-pillarX, pillarHeight / 2 + 0.2 * S, 0]}
        material={matFrame}
        castShadow
      >
        <boxGeometry args={[0.2 * S, pillarHeight, 0.2 * S]} />
      </mesh>
      <mesh
        position={[pillarX, pillarHeight / 2 + 0.2 * S, 0]}
        material={matFrame}
        castShadow
      >
        <boxGeometry args={[0.2 * S, pillarHeight, 0.2 * S]} />
      </mesh>
      <mesh
        position={[0, pillarHeight + 0.2 * S, 0]}
        material={matFrameAccent}
        castShadow
      >
        <boxGeometry args={[baseWidth + 0.2 * S, 0.2 * S, 0.2 * S]} />
      </mesh>

      {/* Corner brackets — dark with warm undertone */}
      {([-pillarX, pillarX] as number[]).map((xPos) => (
        <group key={`brackets-${xPos}`}>
          <mesh position={[xPos, pillarHeight + 0.2 * S, 0]} material={matBracket}>
            <boxGeometry args={[0.35 * S, 0.35 * S, 0.35 * S]} />
          </mesh>
          <mesh position={[xPos, 0.2 * S, 0]} material={matBracket}>
            <boxGeometry args={[0.35 * S, 0.35 * S, 0.35 * S]} />
          </mesh>
        </group>
      ))}

      {/* Z lead screws — chrome */}
      <mesh
        position={[-pillarX + 0.2 * S, pillarHeight / 2 + 0.1 * S, -0.15 * S]}
        material={matChrome}
      >
        <cylinderGeometry args={[0.035 * S, 0.035 * S, pillarHeight - 0.2 * S, 16]} />
      </mesh>
      <mesh
        position={[pillarX - 0.2 * S, pillarHeight / 2 + 0.1 * S, -0.15 * S]}
        material={matChrome}
      >
        <cylinderGeometry args={[0.035 * S, 0.035 * S, pillarHeight - 0.2 * S, 16]} />
      </mesh>

      {/* Spool holder — hub dark, winding = ORANGE brand filament */}
      <group position={[-0.6 * S, pillarHeight + 0.7 * S, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={matBedCarrier}>
          <cylinderGeometry args={[0.38 * S, 0.38 * S, 0.45 * S, 24]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={matOrange}>
          <cylinderGeometry args={[0.78 * S, 0.78 * S, 0.42 * S, 32]} />
        </mesh>
      </group>

      {/* ═══ HEATED BED ═══ */}
      <group ref={bedRef} position={[0, 0.26 * S, 0]}>
        <mesh position={[0, 0.03 * S, 0]} material={matBedCarrier}>
          <boxGeometry args={[2.4 * S, 0.06 * S, 2.4 * S]} />
        </mesh>
        {/* PEI sheet — warm light grey */}
        <mesh position={[0, 0.08 * S, 0]} material={matPEI}>
          <boxGeometry args={[2.3 * S, 0.04 * S, 2.3 * S]} />
        </mesh>

        {/* Bed grid lines — subtle premium detail */}
        <mesh position={[0, 0.105 * S, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.2 * S, 2.2 * S]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.06} />
        </mesh>

        {/* Levelling knobs */}
        {[-1.0 * S, 1.0 * S].map((x) =>
          [-1.0 * S, 1.0 * S].map((z) => (
            <mesh key={`knob-${x}-${z}`} position={[x, 0.01 * S, z]} material={matBracket}>
              <cylinderGeometry args={[0.12 * S, 0.12 * S, 0.04 * S, 16]} />
            </mesh>
          )),
        )}

        {/* ═══ 3 premium metallic gears ═══ */}
        <group ref={gear1Ref} position={[g1x, 0.1 * S, g1z]}>
          <mesh geometry={geoGear1} material={matGear} castShadow />
        </group>
        <group ref={gear2Ref} position={[g2x, 0.1 * S, g2z]} rotation={[0, Math.PI / 10, 0]}>
          <mesh geometry={geoGear2} material={matGear} castShadow />
        </group>
        <group ref={gear3Ref} position={[g3x, 0.1 * S, g3z]}>
          <mesh geometry={geoGear3} material={matGear} castShadow />
        </group>
      </group>

      {/* ═══ X‑GANTRY ═══ */}
      <group ref={gantryRef} position={[0, 0.91 * S, 0]}>
        <mesh material={matFrameAccent} castShadow>
          <boxGeometry args={[baseWidth, 0.18 * S, 0.18 * S]} />
        </mesh>

        <mesh position={[-pillarX, 0, 0]} material={matBracket}>
          <boxGeometry args={[0.35 * S, 0.45 * S, 0.35 * S]} />
        </mesh>
        <mesh position={[pillarX, 0, 0]} material={matBracket}>
          <boxGeometry args={[0.35 * S, 0.45 * S, 0.35 * S]} />
        </mesh>

        {/* Toolhead — warm pearl-white, with orange brand accent stripe */}
        <group ref={toolheadRef} position={[0, 0, 0.15 * S]}>
          <mesh material={matToolhead} castShadow>
            <boxGeometry args={[0.55 * S, 0.6 * S, 0.45 * S]} />
          </mesh>
          {/* Fan duct — pearl white */}
          <mesh position={[0, -0.15 * S, 0.23 * S]} material={matToolhead}>
            <boxGeometry args={[0.45 * S, 0.25 * S, 0.1 * S]} />
          </mesh>
          {/* Brand accent stripe — orange */}
          <mesh position={[0, 0.15 * S, 0.23 * S]} material={matOrangeAccent}>
            <boxGeometry args={[0.5 * S, 0.03 * S, 0.02 * S]} />
          </mesh>
          {/* Heater block — chrome */}
          <mesh position={[0, -0.38 * S, 0]} material={matChrome}>
            <boxGeometry args={[0.18 * S, 0.12 * S, 0.18 * S]} />
          </mesh>
          {/* Brass nozzle */}
          <mesh position={[0, -0.48 * S, 0]} rotation={[Math.PI, 0, 0]} material={matBrass}>
            <coneGeometry args={[0.06 * S, 0.12 * S, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}