import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { WinnerText } from './WinnerText';
import { LoserTexts } from './LoserTexts';
import { ThemeScene } from './ThemeScene';
import { DecorativeElements } from './DecorativeElements';
import PhysicsScene from './PhysicsScene';
import type { Theme } from '../../types/theme';
import type { SceneConfig } from '../../config/scenes';
import type { RevealStrategyConfig } from '../../types/theme';

interface SceneManagerProps {
  theme: Theme;
  scene: SceneConfig;
  winner: string;
  losers: string[];
  revealStrategy: RevealStrategyConfig;
}

/**
 * SceneManager handles all game mechanics and rendering.
 *
 * Responsibilities:
 * - Decide which rendering approach to use (physics vs standard)
 * - Render the appropriate scene components
 * - Apply theme visuals (lights, colors, scenery)
 *
 * Theme responsibilities (visual only):
 * - Background color
 * - Lighting (ambient, directional, point lights)
 * - Scenery (stars, sparkles, plane, decorative elements)
 * - Colors for text and UI
 *
 * Scene responsibilities (mechanics):
 * - How names are rendered (3D text, particles, etc.)
 * - Physics simulation (if applicable)
 * - Animation behavior
 * - Special effects
 */
export const SceneManager = ({
  theme,
  scene,
  winner,
  losers,
  revealStrategy,
}: SceneManagerProps) => {
  const isPhysicsScene = scene.type === 'physics';

  // Default components if scene doesn't provide custom ones
  const WinnerComponent = scene.WinnerComponent || WinnerText;
  const LoserComponent = scene.LoserComponent || LoserTexts;
  const SceneEffects = scene.SceneEffects;

  if (isPhysicsScene && scene.physicsConfig) {
    return (
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <Physics gravity={scene.physicsConfig.gravity}>
          <PhysicsScene theme={theme} scene={scene} winner={winner} losers={losers} />
        </Physics>
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    );
  }

  // Standard scene - theme controls visuals, scene controls mechanics
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
      <ThemeScene theme={theme} />
      {SceneEffects && <SceneEffects />}
      <LoserComponent losers={losers} strategy={revealStrategy} />
      <WinnerComponent winner={winner} strategy={revealStrategy} />
      <DecorativeElements />
      <OrbitControls enableZoom enablePan enableRotate />
    </Canvas>
  );
};

export default SceneManager;
