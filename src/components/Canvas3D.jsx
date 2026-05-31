import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model3D";
import { Suspense } from "react";
import * as THREE from "three";
import Loader from "./Loader";

export default function Canvas3D() {
  return (
    <>
    <Loader></Loader>
    <Canvas
      style={{ width: "100%", height: "500px", display: "block" }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.NoToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        preserveDrawingBuffer: true,
      }}
      camera={{ position: [5, 4, 5], fov: 35, near: 0.1, far: 1000 }}
    >
      {/* Match page background */}
      <color attach="background" args={["#F9F9FB"]} />

      {/* Environment map for sphere reflections */}
      <Environment preset="city" background={false} />

      {/* Soft ambient fill - needed for MeshStandardMaterial (sphere) */}
      <ambientLight intensity={0.8} color="#ffffff" />

      {/* Main directional light */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Fill light */}
      <directionalLight position={[-8, 8, -8]} intensity={0.4} color="#e0dce8" />

      {/* Hemisphere light */}
      <hemisphereLight args={["#f0eef5", "#d4c8b8", 0.3]} />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
      />

      {/* Model */}
      <Suspense fallback={null}>
        <Model url="/model/machine.glb" />
      </Suspense>
    </Canvas>
    </>
  );
}
