import { useRef, useState } from 'react';
import { RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Text3D } from '@react-three/drei';
import type { RevealStrategyConfig } from '../../types/theme';

interface PhysicsRevealProps {
  winner: string;
  losers: string[];
  strategy: RevealStrategyConfig;
  physicsConfig: {
    spawnPosition: [number, number, number];
    containerBounds: {
      min: [number, number, number];
      max: [number, number, number];
    };
    gravity: [number, number, number];
  };
}

const LETTER_HEIGHT = 0.5;

// Physics-enabled winner text that falls into the container
const PhysicsWinner = ({
  winner,
  color,
  spawnPosition,
}: {
  winner: string;
  color: string;
  spawnPosition: [number, number, number];
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const [settled, setSettled] = useState(false);
  const letters = winner.split('');

  useFrame(() => {
    if (rigidBodyRef.current && !settled) {
      const vel = rigidBodyRef.current.linvel();
      const isSettled = Math.abs(vel.x) < 0.1 && Math.abs(vel.y) < 0.1 && Math.abs(vel.z) < 0.1;
      if (isSettled) {
        setSettled(true);
      }
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={spawnPosition}
      colliders="hull"
      restitution={0.3}
      friction={0.5}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <group>
        {letters.map((letter, index) => (
          <group key={index} position={[index * 0.35 - (letters.length * 0.35) / 2, 0, 0]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={LETTER_HEIGHT}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
            >
              {letter}
              <meshStandardMaterial
                color={color}
                metalness={0.3}
                roughness={0.4}
                emissive={color}
                emissiveIntensity={0.2}
              />
            </Text3D>
          </group>
        ))}
      </group>
    </RigidBody>
  );
};

// Floating loser text (not physics-based, just visual)
const FloatingLoser = ({
  name,
  color,
  position,
}: {
  name: string;
  color: string;
  position: [number, number, number];
}) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text fontSize={0.3} color={color} position={position} anchorX="center" anchorY="middle">
        {name}
      </Text>
    </Float>
  );
};

// Invisible container walls to keep physics objects inside
const PhysicsContainer = ({
  bounds,
}: {
  bounds: { min: [number, number, number]; max: [number, number, number] };
}) => {
  const { min, max } = bounds;
  const width = max[0] - min[0];
  const height = max[1] - min[1];
  const depth = max[2] - min[2];
  const centerX = min[0] + width / 2;
  const centerY = min[1] + height / 2;
  const centerZ = min[2] + depth / 2;

  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[centerX, min[1], centerZ]}>
        <CuboidCollider args={[width / 2, 0.1, depth / 2]} />
      </RigidBody>
      {/* Back wall */}
      <RigidBody type="fixed" position={[centerX, centerY, min[2] - 0.1]}>
        <CuboidCollider args={[width / 2, height / 2, 0.1]} />
      </RigidBody>
      {/* Front wall */}
      <RigidBody type="fixed" position={[centerX, centerY, max[2] + 0.1]}>
        <CuboidCollider args={[width / 2, height / 2, 0.1]} />
      </RigidBody>
      {/* Left wall */}
      <RigidBody type="fixed" position={[min[0] - 0.1, centerY, centerZ]}>
        <CuboidCollider args={[0.1, height / 2, depth / 2]} />
      </RigidBody>
      {/* Right wall */}
      <RigidBody type="fixed" position={[max[0] + 0.1, centerY, centerZ]}>
        <CuboidCollider args={[0.1, height / 2, depth / 2]} />
      </RigidBody>
    </>
  );
};

const PhysicsReveal = ({ winner, losers, strategy, physicsConfig }: PhysicsRevealProps) => {
  const { spawnPosition, containerBounds } = physicsConfig;

  return (
    <>
      {/* Container walls */}
      <PhysicsContainer bounds={containerBounds} />

      {/* Winner text with physics */}
      <PhysicsWinner winner={winner} color={strategy.winner.color} spawnPosition={spawnPosition} />

      {/* Floating losers (visual only, not physics) */}
      {losers.map((loser, index) => {
        const { position } = strategy.losers.layout(index, losers.length);
        return (
          <FloatingLoser
            key={index}
            name={loser}
            color={strategy.losers.color}
            position={position}
          />
        );
      })}
    </>
  );
};

export default PhysicsReveal;
