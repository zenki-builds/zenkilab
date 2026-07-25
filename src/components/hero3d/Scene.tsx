"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import { Printer } from "./Printer";
import { Phone } from "./Phone";
import { Hologram } from "./Hologram";
import { Particles } from "./Particles";
import { useMouseParallax } from "./hooks/useMouseParallax";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CameraRig({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = 4.1 + mouse.current.x * 0.2;
    const targetY = 3.0 + mouse.current.y * -0.1;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(4.0, 0.35, -0.08);
  });

  return null;
}

function ScrollRig({ sceneRoot }: { sceneRoot: React.RefObject<Group | null> }) {
  useEffect(() => {
    if (!sceneRoot.current) return;
    const el = sceneRoot.current;

    const trigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        el.rotation.y = self.progress * 0.45;
        const s = 1 + self.progress * 0.1;
        el.scale.set(s, s, s);
      },
    });

    return () => trigger.kill();
  }, [sceneRoot]);

  return null;
}

export function Scene() {
  const mouse = useMouseParallax();
  const sceneRoot = useRef<Group>(null);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        localClippingEnabled: true,
      }}
      camera={{ position: [4.1, 3.0, 5.5], fov: 42 }}
      frameloop="always"
    >
      <ambientLight intensity={0.25} color="#102A38" />
      <directionalLight position={[3, 4, 3]} intensity={0.6} color="#94A3B8" />
      <pointLight position={[-2, 1.5, 2]} intensity={0.9} color="#22D3EE" distance={7} />
      <pointLight position={[2, -0.5, 1.8]} intensity={0.6} color="#0EA5B7" distance={6} />
      <pointLight position={[0, -1, 1]} intensity={0.4} color="#0284C7" distance={5} />
      {/* Overhead warm light shining down on the printer — invisible source */}
      <pointLight position={[6.0, 2.5, -0.08]} intensity={2.2} color="#fff5eb" distance={8} decay={1.2} />
      <group ref={sceneRoot}>
        {/* -10° Y-axis rotation on the entire assembly */}
        <group rotation={[0, -10 * (Math.PI / 180), 0]}>
          <Printer mouse={mouse} position={[6.0, -0.72, -0.08]} />
          <Phone position={[4.0, -0.22, 0.15]} />
          <Hologram position={[4.0, 0.2, 0.15]} />
          <Particles />
        </group>
      </group>

      <CameraRig mouse={mouse} />
      <ScrollRig sceneRoot={sceneRoot} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.65} luminanceThreshold={0.3} luminanceSmoothing={0.25} mipmapBlur radius={0.5} />
        <Vignette eskil={false} offset={0.15} darkness={0.65} />
      </EffectComposer>
    </Canvas>
  );
}