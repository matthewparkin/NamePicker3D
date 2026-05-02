import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import type { RevealStrategyConfig } from '../../types/theme';

interface WinnerTextProps {
  winner: string;
  strategy: RevealStrategyConfig;
}

interface AnimatedLetter {
  char: string;
  animationProgress: number;
}

export const WinnerText = ({ winner, strategy }: WinnerTextProps) => {
  const [letters, setLetters] = useState<AnimatedLetter[]>([]);
  const { winner: winnerConfig, winnerAnimation } = strategy;

  useEffect(() => {
    setLetters([]);
    let index = -1;
    const interval = setInterval(() => {
      if (index < winner.length) {
        setLetters((prev) => [...prev, { char: winner[index], animationProgress: 0 }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, winnerAnimation.letterDelay);

    return () => clearInterval(interval);
  }, [winner, winnerAnimation.letterDelay]);

  useFrame(() => {
    setLetters((prevLetters) => {
      return prevLetters.map((letter) =>
        letter.animationProgress < 1
          ? { ...letter, animationProgress: Math.min(letter.animationProgress + 0.5, 1) }
          : letter
      );
    });
  });

  const allLetters = letters.map((l) => l.char).join('');

  return (
    <Float
      speed={winnerAnimation.floatSpeed}
      rotationIntensity={winnerAnimation.rotationIntensity}
      floatIntensity={winnerAnimation.floatIntensity}
    >
      <group position={winnerConfig.position}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.27}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={5}
        >
          {allLetters}
          <meshStandardMaterial
            color={winnerConfig.color}
            emissive={winnerConfig.emissive}
            emissiveIntensity={winnerConfig.emissiveIntensity}
            metalness={winnerConfig.metalness}
            roughness={winnerConfig.roughness}
          />
        </Text3D>
      </group>
    </Float>
  );
};
