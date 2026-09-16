import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, forwardRef, useCallback, useState } from "react";
import * as THREE from "three";
import { GarmentControls } from "./GarmentControls";
import { GarmentEnvironment } from "./GarmentEnvironment";
import { GarmentLighting } from "./GarmentLighting";
import { GarmentLoader } from "./GarmentLoader";
import { GarmentModel } from "./GarmentModel";
import { CAMERA_PRESETS } from "./garmentConfig";
import type { GarmentControlsHandle } from "./types";

/**
 * The Artifex hero garment viewer. Owns the WebGL canvas, physically
 * plausible renderer configuration (ACES tone mapping, sRGB output,
 * capped DPR, soft shadows), and composes the lighting/environment/model/
 * controls modules. Exposes a GarmentControlsHandle ref so the surrounding
 * screen UI (Front/Side/Back/Reset) can drive the camera.
 *
 * Explicitly handles WebGL context loss: browsers reclaim GPU contexts
 * under memory pressure (common with several automated/headless tabs open
 * at once); without an explicit `webglcontextlost` handler the context
 * would stay dead permanently instead of auto-restoring.
 */
export const GarmentCanvas = forwardRef<GarmentControlsHandle>(function GarmentCanvas(_props, ref) {
  const hero = CAMERA_PRESETS.hero;
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      setContextLost(true);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      setContextLost(false);
    });
  }, []);

  return (
    <div className="garment-canvas">
      <Canvas
        shadows="soft"
        dpr={[1, 1.5]}
        camera={{ position: hero.position, fov: hero.fov, near: 0.1, far: 20 }}
        gl={{
          antialias: true,
          powerPreference: "default",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={handleCreated}
      >
        <color attach="background" args={["#0a0b0a"]} />
        <fog attach="fog" args={["#0a0b0a", 6, 11]} />

        <GarmentLighting />
        <GarmentEnvironment />

        <Suspense fallback={null}>
          <GarmentModel />
        </Suspense>

        <GarmentControls ref={ref} />

        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.15} luminanceThreshold={1.05} luminanceSmoothing={0.25} resolutionScale={0.5} />
        </EffectComposer>
      </Canvas>
      <GarmentLoader />
      {contextLost && (
        <div className="garment-loader" role="status" aria-live="polite">
          <span className="art-meta">Restoring renderer…</span>
        </div>
      )}
    </div>
  );
});
