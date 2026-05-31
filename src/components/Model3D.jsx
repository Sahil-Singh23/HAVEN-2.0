import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

// Globe textures for the sphere (cycle through these)
const GLOBE_TEXTURES = [
  "/model/Globe Textures/town-prompt-360.webp",
  "/model/Globe Textures/amphitheater-prompt-360.webp",
  "/model/Globe Textures/anime-train-prompt-360.webp",
  "/model/Globe Textures/autumn-prompt-360.webp",
  "/model/Globe Textures/bath-prompt-360.webp",
  "/model/Globe Textures/garden-prompt-360.webp",
];

// Animation duration for the looping animation (from GLB analysis)
const ANIM_DURATION = 5.833;

// Impact time: OBJ.IN.BOTTOM.002 hits the sphere causing scale bounce
// The sphere scale starts rising at t≈0.875s, peaks at t≈1.083s
// We trigger the switch right at the peak impact
const IMPACT_TIME = 1.0;

// Parts that should use the matcap copper material
const MATCAP_PARTS = new Set([
  "BASE_METAL", "Magic", "Magic001",
  "OBJOUT", "OBJOUT001",
  "OBJINBOTTOM", "OBJINBOTTOM002", "OBJINTOP004",
  "P_STEP",
  "Circle006", "Circle007", "Circle008", "Circle009",
  "Circle010", "Circle011", "Circle012",
]);

const SPHERE_PARTS = new Set(["CENTER_SPHERE"]);
const EMISSIVE_PARTS = new Set(["PORTAL1", "PORTAL2", "PORTAL3"]);
const HIDDEN_PARTS = new Set(["OBJOUTSHADOW", "OBJOUTSHADOW001", "FLOOR"]);
const PATH_PARTS = new Set([
  "PATHINBOTTOM", "PATHINTOP", "PATHOUT",
  "PATHOUTSHADOW", "PATHOUTSHADOW001", "PATHOUTSHADOW002",
  "PATHINBOTTOM001", "PATHOUT001", "FLAG",
]);

export function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const groupRef = useRef();
  const mixerRef = useRef(null);
  const setupDone = useRef(false);
  const sphereMatRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const textureIndexRef = useRef(0);
  const impactTriggeredRef = useRef(false);
  const prevSphereScaleRef = useRef(1.0);
  const { camera } = useThree();

  // Load textures
  const mainTexture = useTexture("/model/machine-texture.webp");
  const matcapTex = useTexture("/model/matcap.webp");
  const globeTextures = useTexture(GLOBE_TEXTURES);

  useEffect(() => {
    if (setupDone.current) return;
    setupDone.current = true;
    if (!scene) return;

    // Configure main baked texture
    // flipY=false is critical for GLB models (UV origin is bottom-left)
    mainTexture.flipY = false;
    mainTexture.colorSpace = THREE.SRGBColorSpace;
    mainTexture.wrapS = THREE.ClampToEdgeWrapping;
    mainTexture.wrapT = THREE.ClampToEdgeWrapping;
    mainTexture.minFilter = THREE.LinearMipmapLinearFilter;
    mainTexture.magFilter = THREE.LinearFilter;
    mainTexture.generateMipmaps = true;
    mainTexture.needsUpdate = true;

    // Configure matcap texture
    matcapTex.colorSpace = THREE.SRGBColorSpace;
    matcapTex.needsUpdate = true;

    // Configure globe textures
    globeTextures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.mapping = THREE.EquirectangularReflectionMapping;
      tex.needsUpdate = true;
    });

    // === Create materials ===
    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: mainTexture,
      side: THREE.DoubleSide,
    });

    const matcapMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTex,
      side: THREE.DoubleSide,
    });

    const portalMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
    });



    // === Apply materials ===
    scene.traverse((node) => {
      if (!node.isMesh) return;
      const name = node.name || "";

      if (HIDDEN_PARTS.has(name) || PATH_PARTS.has(name)) {
        node.visible = false;
        return;
      }

      if (EMISSIVE_PARTS.has(name)) {
        node.material = portalMaterial;
      } else if (SPHERE_PARTS.has(name)) {
        const sphereMat = new THREE.MeshBasicMaterial({
          envMap: globeTextures[0],
          reflectivity: 1.0,
          side: THREE.FrontSide,
        });
        node.material = sphereMat;
        sphereMatRef.current = sphereMat;
        sphereMeshRef.current = node;
      } else if (MATCAP_PARTS.has(name)) {
        node.material = matcapMaterial;
      } else {
        node.material = bakedMaterial;
      }
    });

    // === Compute bounding box & position ===
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const group = groupRef.current;
    if (group) {
      const targetSize = 4.2;
      const scale = targetSize / maxDim;
      group.scale.setScalar(scale);
      group.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
    }

    // === Camera ===
    const dist = 5.8;
    const azimuth = Math.PI / 4;
    const elevation = 0.52;
    camera.position.set(
      dist * Math.cos(azimuth) * Math.cos(elevation),
      dist * Math.sin(elevation),
      dist * Math.sin(azimuth) * Math.cos(elevation)
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // === Animations ===
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      mixerRef.current = mixer;
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }

    console.log("[Model3D] Setup complete. Meshes:", countMeshes(scene), "Anims:", animations?.length || 0);
  }, [scene, mainTexture, matcapTex, globeTextures, camera, animations]);

  // Animation loop: update mixer + detect ball impact for globe texture switch
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Detect ball impact by watching the sphere's actual scale
    // The sphere bounces (scale goes from 1.0 → 1.08 → 1.0) when hit
    if (sphereMeshRef.current && sphereMatRef.current) {
      const currentScale = sphereMeshRef.current.scale.x;
      const prevScale = prevSphereScaleRef.current;

      // Detect the moment scale starts increasing (rising edge of bounce)
      // Scale goes above threshold = ball just hit
      const BOUNCE_THRESHOLD = 1.01;

      if (currentScale > BOUNCE_THRESHOLD && prevScale <= BOUNCE_THRESHOLD && !impactTriggeredRef.current) {
        // Ball just hit the sphere - switch texture!
        impactTriggeredRef.current = true;
        textureIndexRef.current = (textureIndexRef.current + 1) % globeTextures.length;
        sphereMatRef.current.envMap = globeTextures[textureIndexRef.current];
        sphereMatRef.current.needsUpdate = true;
      }

      // Reset trigger when scale returns to normal
      if (currentScale <= 1.005) {
        impactTriggeredRef.current = false;
      }

      prevSphereScaleRef.current = currentScale;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

function countMeshes(scene) {
  let count = 0;
  scene.traverse((n) => { if (n.isMesh) count++; });
  return count;
}
