import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';

interface WinnerTextProps {
  winner: string;
}

interface AnimatedLetter {
  char: string;
  animationProgress: number;
}

export const WinnerText = ({ winner }: WinnerTextProps) => {
  const [letters, setLetters] = useState<AnimatedLetter[]>([]);

  useEffect(() => {
    setLetters([]);
    // To do: fix index. -1 the index as wasnt getting the first letter. Might be me being dense here.
    let index = -1;
    const interval = setInterval(() => {
      if (index < winner.length) {
        setLetters((prev) => [...prev, { char: winner[index], animationProgress: 0 }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [winner]);

  useFrame(() => {
    setLetters((prevLetters) => {
      return prevLetters.map((letter) =>
        letter.animationProgress < 1
          ? { ...letter, animationProgress: Math.min(letter.animationProgress + 0.5, 1) }
          : letter
      );
    });
  });

  // Show text with all letters (even partially animated ones)
  const allLetters = letters.map((l) => l.char).join('');

  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={1.8}>
      <group position={[-2, -0.5, 0]}>
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
          <meshStandardMaterial color="#00ff00" metalness={0.2} roughness={0.2} />
        </Text3D>
      </group>
    </Float>
  );
};
