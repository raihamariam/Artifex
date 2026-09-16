/**
 * Premium studio lighting rig for the hero garment: a large soft key light,
 * a low fill, a rim/edge light to trace the collar and sleeve silhouette,
 * and a quiet hemisphere fill so the near-black environment doesn't read
 * as flat. Tuned to reveal fabric folds and the metallic textile's
 * highlight roll-off without blowing out to white.
 */
export function GarmentLighting() {
  return (
    <>
      {/* Key — large soft source, upper front-left */}
      <directionalLight
        position={[3.2, 4.5, 3.6]}
        intensity={3.6}
        color="#f4f2ec"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-2.4, 2.4, 2.4, -2.4, 0.1, 12]} />
      </directionalLight>

      {/* Fill — soft, opposite side, no shadow, keeps shadow side readable */}
      <directionalLight position={[-3.6, 2.2, 2.4]} intensity={0.45} color="#dfe7ef" />

      {/* Rim / edge — behind and above, traces collar + shoulder silhouette */}
      <directionalLight position={[-1.2, 3.4, -4.2]} intensity={2.2} color="#c9ff3e" />
      <directionalLight position={[1.6, 3.0, -3.8]} intensity={1.6} color="#eef6ff" />

      {/* Quiet ambient lift so shadow terminator never reads as pure black */}
      <hemisphereLight args={["#3a3d3a", "#050505", 0.22]} />
    </>
  );
}
