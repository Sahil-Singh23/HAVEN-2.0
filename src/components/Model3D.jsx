import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export function Model({ url }) {
  const { scene } = useGLTF(url);
  const texture = useTexture("/machine-texture.webp");

  useEffect(() => {
    if (!scene || !texture) return;

    // Apply texture to all meshes in the scene
    scene.traverse((node) => {
      if (node.isMesh) {
        if (Array.isArray(node.material)) {
          node.material.forEach((material) => {
            material.map = texture;
            material.needsUpdate = true;
          });
        } else if (node.material) {
          node.material.map = texture;
          node.material.needsUpdate = true;
        }
      }
    });

    // Calculate bounds and center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Scale the model to reasonable size
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    scene.scale.multiplyScalar(scale);
    
    // Center the model
    scene.position.sub(center.multiplyScalar(scale));
  }, [scene, texture]);

  return <primitive object={scene} dispose={null} />;
}
