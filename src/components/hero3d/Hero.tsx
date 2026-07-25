"use client";

import { Suspense, lazy } from "react";
import { Background } from "./Background";
import { HeroText } from "./HeroText";

const Scene = lazy(() => import("./Scene").then((m) => ({ default: m.Scene })));

function SceneFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-40 h-40 rounded-full border border-cyan-400/20 animate-pulse" />
    </div>
  );
}

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <>
      <Background />

      {/* Full-screen 3D canvas behind everything */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneFallback />}>
          <Scene />
        </Suspense>
      </div>

      {/* Foreground content layered on top */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <HeroText onStart={onStart} />
          </div>
          {/* Empty right column — the background canvas fills this region */}
          <div className="hidden lg:block lg:col-span-7" />
        </div>
      </div>
    </>
  );
}