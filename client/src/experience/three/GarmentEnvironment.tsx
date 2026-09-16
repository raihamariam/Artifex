import { ContactShadows, Environment } from "@react-three/drei";

/**
 * Reflection + grounding pass. `Environment preset="studio"` supplies the
 * image-based lighting the metallic textile needs to roll highlights across
 * its folds (flat lights alone read as plastic); `ContactShadows` grounds
 * the garment against the near-black Artifex backdrop without a visible
 * floor plane or virtual room. No skybox is rendered — the canvas clear
 * color stays the shell's near-black.
 */
export function GarmentEnvironment() {
  return (
    <>
      <Environment preset="studio" environmentIntensity={0.75} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.75}
        scale={6}
        blur={2.1}
        far={2.2}
        resolution={512}
        color="#000000"
      />
    </>
  );
}
