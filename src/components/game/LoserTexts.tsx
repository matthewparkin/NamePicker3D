import { useMemo } from 'react';
import { Float, Text3D } from '@react-three/drei';

interface LoserTextsProps {
  losers: string[];
}

export const LoserTexts = ({ losers }: LoserTextsProps) => {
  const loserTextFields = useMemo(
    () =>
      losers.slice(0, 6).map((name, index) => {
        const x = (index % 3) * 2.2 - 2.2;
        const y = Math.floor(index / 3) * 1.2 - 0.5;
        const z = -2 - index * 0.5;
        const rotation = [0.1 * index, 0.4 + index * 0.15, -0.05 * index] as [
          number,
          number,
          number,
        ];

        return (
          <Float key={`${name}-${index}`} speed={0.8} rotationIntensity={0.4} floatIntensity={0.3}>
            <group position={[x, y, z]} rotation={rotation}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.35}
                height={0.05}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.008}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={3}
              >
                {name}
                <meshStandardMaterial
                  color="#ff4c4c"
                  emissive="#8b0000"
                  emissiveIntensity={0.35}
                  metalness={0.2}
                  roughness={0.4}
                />
              </Text3D>
            </group>
          </Float>
        );
      }),
    [losers]
  );

  return <>{loserTextFields}</>;
};
