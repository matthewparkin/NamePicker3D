import { useState } from 'react';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import type { Theme } from '../../types/theme';
import type { SceneConfig } from '../../config/scenes';
import PhysicsReveal from './PhysicsReveal';

interface PhysicsSceneProps {
  theme: Theme;
  scene: SceneConfig;
  winner: string;
  losers: string[];
}

// GLTF type for the lava lamp model
type GLTFResult = THREE.Object3D & {
  nodes: {
    Base: THREE.Mesh;
    Glass: THREE.Mesh;
    Cap: THREE.Mesh;
    Parkin: THREE.Mesh;
  };
  materials: {
    Metal: THREE.MeshStandardMaterial;
    text: THREE.MeshStandardMaterial;
  };
};

const PhysicsScene = ({ theme, scene, winner, losers }: PhysicsSceneProps) => {
  const [hovered, hover] = useState(false);

  // Preload the model and load it
  useGLTF.preload('/2lava2lampy-transformed.glb');
  const { nodes, materials } = useGLTF(
    '/2lava2lampy-transformed.glb',
    true,
    true
  ) as unknown as GLTFResult;

  // Modify material properties
  materials.Metal.roughness = 0.2;
  materials.Metal.metalness = 0.97;
  materials.Metal.side = THREE.DoubleSide;

  const revealStrategy = theme.revealStrategies.default;
  const physicsConfig = scene.physicsConfig;

  if (!physicsConfig) {
    return null;
  }

  return (
    <>
      {/* Lava Lamp Model */}
      <group dispose={null}>
        {hovered && (
          <>
            <pointLight
              intensity={80.082}
              decay={2.5}
              color="#ff00ff"
              position={[0, 3.2, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <pointLight
              intensity={80.082}
              decay={2.5}
              color="#ff00ff"
              position={[0, 1.2, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </>
        )}

        {/* Base */}
        <mesh castShadow geometry={nodes.Base.geometry} material={materials.Metal} />

        {/* Glass container */}
        <mesh
          receiveShadow
          geometry={nodes.Glass.geometry}
          position={[0, 0, 0]}
          scale={[0.943, 1.035, 0.943]}
          onPointerOver={(event) => {
            event.stopPropagation();
            hover(true);
          }}
          onPointerOut={() => hover(false)}
        >
          <MeshTransmissionMaterial
            thickness={0.3}
            anisotropicBlur={0.8}
            clearcoat={1}
            distortion={0.3}
            iridescence={0.5}
            clearcoatRoughness={1}
            color={hovered ? '#ffaaff' : '#ffffff'}
            emissive={hovered ? '#ff0040' : '#200000'}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Cap */}
        <mesh castShadow geometry={nodes.Cap.geometry} material={materials.Metal} />

        {/* Physics-enabled object inside lamp */}
        <RigidBody
          type="dynamic"
          colliders="hull"
          restitution={0.3}
          friction={0.5}
          position={physicsConfig.spawnPosition}
        >
          <mesh
            castShadow
            geometry={nodes.Parkin.geometry}
            position={[-0.03, 0.792, -0.007]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.27}
          >
            <meshStandardMaterial
              color="#ff0"
              roughness={0.6}
              metalness={1}
              opacity={1}
              transparent
            />
          </mesh>
        </RigidBody>
      </group>

      {/* Physics reveal for winner text */}
      <PhysicsReveal
        winner={winner}
        losers={losers}
        strategy={revealStrategy}
        physicsConfig={physicsConfig}
      />
    </>
  );
};

export default PhysicsScene;
