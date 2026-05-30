import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Model } from "./Model3D";
import { Suspense } from "react";

export default function Canvas3D() {
  return (
    <Canvas 
      style={{ width: "100%", height: "100%", display: "block" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3], fov: 75 }}
    >
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={2}
        enableZoom={true}
        enablePan={false}
      />
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Model url="/machine.glb" />
      </Suspense>
    </Canvas>
  );
}
