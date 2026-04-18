import { useMemo } from 'react';
import { Float, Text3D } from '@react-three/drei';
import type { RevealStrategyConfig } from '../../types/theme';

interface LoserTextsProps {
  losers: string[];
  strategy: RevealStrategyConfig;
}

export const LoserTexts = ({ losers, strategy }: LoserTextsProps) => {
  const { losers: losersConfig, losersAnimation } = strategy;

  const loserTextFields = useMemo(
    () =>
      losers.slice(0, 6).map((name, index) => {
        const { position, rotation } = losersConfig.layout(index, losers.slice(0, 6).length);

        return (
          <Float
            key={`${name}-${index}`}
            speed={losersAnimation.floatSpeed}
            rotationIntensity={losersAnimation.rotationIntensity}
            floatIntensity={losersAnimation.floatIntensity}
          >
            <group position={position} rotation={rotation}>
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
                  color={losersConfig.color}
                  emissive={losersConfig.emissive}
                  emissiveIntensity={losersConfig.emissiveIntensity}
                  metalness={losersConfig.metalness}
                  roughness={losersConfig.roughness}
                />
              </Text3D>
            </group>
          </Float>
        );
      }),
    [losers, losersConfig, losersAnimation]
  );

  return <>{loserTextFields}</>;
};
