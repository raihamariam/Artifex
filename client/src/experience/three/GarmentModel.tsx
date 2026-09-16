import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GARMENT_MODEL_PATH, GARMENT_TARGET_HEIGHT } from "./garmentConfig";

/**
 * Loads the Artifex hero GLB, centers it on X/Z, rests it on the ground
 * plane (Y=0, matching GarmentEnvironment's contact shadow), and normalizes
 * its scale to a consistent world height. Upgrades the exported
 * MeshStandardMaterial to MeshPhysicalMaterial so the liquid-metallic
 * textile gets a controlled clearcoat + cloth-like sheen layered on top of
 * its authored base/normal/metalness-roughness maps, instead of reading as
 * flat chrome.
 */
export function GarmentModel({ path = GARMENT_MODEL_PATH }: { path?: string }) {
  const { scene } = useGLTF(path);
  const group = useRef<THREE.Group>(null);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const source = child.material as THREE.MeshStandardMaterial;
      if (!source) return;

      const physical = new THREE.MeshPhysicalMaterial({
        map: source.map ?? null,
        normalMap: source.normalMap ?? null,
        metalnessMap: source.metalnessMap ?? null,
        roughnessMap: source.roughnessMap ?? null,
        metalness: source.metalness ?? 1,
        roughness: source.roughness ?? 1,
        envMapIntensity: 0.85,
        clearcoat: 0.18,
        clearcoatRoughness: 0.28,
        sheen: 0.25,
        sheenRoughness: 0.65,
        sheenColor: new THREE.Color("#e8ecef"),
        side: source.side ?? THREE.DoubleSide,
      });
      child.material = physical;
    });

    // Normalize scale + rest the garment on the ground plane, centered on X/Z.
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const scale = size.y > 0 ? GARMENT_TARGET_HEIGHT / size.y : 1;
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    return clone;
  }, [scene]);

  // Only dispose the MeshPhysicalMaterial instances created above — the
  // geometry is owned by drei's global useGLTF cache (shared across every
  // mount of this component for the same URL) and must not be disposed
  // here, or a remount would try to draw a GPU buffer that no longer exists.
  useLayoutEffect(() => {
    return () => {
      prepared.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.Material | THREE.Material[];
          const materials = Array.isArray(material) ? material : [material];
          materials.forEach((m) => m?.dispose());
        }
      });
    };
  }, [prepared]);

  return <primitive ref={group} object={prepared} />;
}

useGLTF.preload(GARMENT_MODEL_PATH);
