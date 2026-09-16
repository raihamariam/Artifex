import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CAMERA_PRESETS, CAMERA_TRANSITION_SECONDS, ORBIT_LIMITS } from "./garmentConfig";
import type { CameraPresetKey, GarmentControlsHandle } from "./types";
import gsap from "gsap";

/**
 * User orbit/zoom (drag to rotate 360°, wheel/pinch to zoom, damped) plus an
 * imperative API for the UI's Front/Side/Back/Reset buttons to ease the
 * camera into a named preset via gsap — never a hard teleport. Panning is
 * disabled so the garment always stays framed at the control's target.
 */
export const GarmentControls = forwardRef<GarmentControlsHandle>(function GarmentControls(_props, ref) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const hero = CAMERA_PRESETS.hero;
    controls.target.set(...hero.target);
    controls.update();
  }, []);

  const animateTo = (key: CameraPresetKey) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const preset = CAMERA_PRESETS[key];

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration: CAMERA_TRANSITION_SECONDS,
      ease: "power3.out",
      onUpdate: () => controls.update(),
    });
    gsap.to(controls.target, {
      x: preset.target[0],
      y: preset.target[1],
      z: preset.target[2],
      duration: CAMERA_TRANSITION_SECONDS,
      ease: "power3.out",
      onUpdate: () => controls.update(),
    });
    if (camera instanceof THREE.PerspectiveCamera) {
      gsap.to(camera, {
        fov: preset.fov,
        duration: CAMERA_TRANSITION_SECONDS,
        ease: "power3.out",
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    }
  };

  useImperativeHandle(ref, () => ({
    goTo: animateTo,
    reset: () => animateTo("hero"),
  }));

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={ORBIT_LIMITS.dampingFactor}
      rotateSpeed={ORBIT_LIMITS.rotateSpeed}
      zoomSpeed={ORBIT_LIMITS.zoomSpeed}
      minDistance={ORBIT_LIMITS.minDistance}
      maxDistance={ORBIT_LIMITS.maxDistance}
      minPolarAngle={ORBIT_LIMITS.minPolarAngle}
      maxPolarAngle={ORBIT_LIMITS.maxPolarAngle}
    />
  );
});
