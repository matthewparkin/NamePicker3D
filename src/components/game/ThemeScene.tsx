import { Plane, Sparkles, Stars } from '@react-three/drei';
import type { Theme } from '../../types/theme';

interface ThemeSceneProps {
  theme: Theme;
}

export const ThemeScene = ({ theme }: ThemeSceneProps) => {
  const { backgroundColor, lights, starsConfig, sparklesConfig, planeConfig, decorativeElements } =
    theme.scene;

  return (
    <>
      <color attach="background" args={backgroundColor} />

      {/* Ambient Light */}
      <ambientLight intensity={lights.ambient.intensity} />

      {/* Directional Light */}
      <directionalLight
        position={lights.directional.position}
        intensity={lights.directional.intensity}
        color={lights.directional.color}
      />

      {/* Point Lights */}
      {lights.pointLights.map((light, index) => (
        <pointLight
          key={`pointLight-${index}`}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
        />
      ))}

      {/* Stars */}
      {starsConfig && (
        <Stars
          radius={starsConfig.radius}
          depth={starsConfig.depth}
          count={starsConfig.count}
          factor={starsConfig.factor}
          saturation={starsConfig.saturation}
          fade={starsConfig.fade}
          speed={starsConfig.speed}
        />
      )}

      {/* Sparkles */}
      {sparklesConfig && (
        <Sparkles
          count={sparklesConfig.count}
          scale={sparklesConfig.scale}
          size={sparklesConfig.size}
          speed={sparklesConfig.speed}
          color={sparklesConfig.color}
        />
      )}

      {/* Plane */}
      {planeConfig && (
        <Plane
          args={planeConfig.args}
          rotation={planeConfig.rotation}
          position={planeConfig.position}
        >
          <meshStandardMaterial
            color={planeConfig.material.color}
            metalness={planeConfig.material.metalness}
            roughness={planeConfig.material.roughness}
          />
        </Plane>
      )}

      {/* Decorative Elements */}
      {decorativeElements}
    </>
  );
};
