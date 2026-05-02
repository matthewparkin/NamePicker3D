import type { Theme } from '../../types/theme';

// Scene types
export type SceneType = 'generic' | 'physics';

export interface SceneConfig {
  id: string;
  name: string;
  type: SceneType;
  // Optional custom components
  WinnerComponent?: React.ComponentType<{ winner: string }>;
  LoserComponent?: React.ComponentType<{ losers: string[] }>;
  SceneEffects?: React.ComponentType;
  // Physics configuration (only for physics scenes)
  physicsConfig?: {
    spawnPosition: [number, number, number];
    containerBounds: {
      min: [number, number, number];
      max: [number, number, number];
    };
    gravity: [number, number, number];
  };
  // 3D model path (for physics scenes)
  modelPath?: string;
  // Reveal strategy override for this scene
  revealStrategyOverride?: {
    winnerAnimation?: {
      floatSpeed?: number;
      rotationIntensity?: number;
      floatIntensity?: number;
      letterDelay?: number;
    };
    losersAnimation?: {
      floatSpeed?: number;
      rotationIntensity?: number;
      floatIntensity?: number;
    };
  };
}

// Generic scene - standard 3D text reveal
export const genericScene: SceneConfig = {
  id: 'generic',
  name: 'Generic Reveal',
  type: 'generic',
};

// Physics scene - uses physics simulation (e.g., lava lamp)
export const physicsScene: SceneConfig = {
  id: 'physics',
  name: 'Physics Reveal',
  type: 'physics',
  physicsConfig: {
    spawnPosition: [0, 4, 0],
    containerBounds: {
      min: [-1.5, -2, -1],
      max: [1.5, 3, 1],
    },
    gravity: [0, -9.81, 0],
  },
  modelPath: '/2lava2lampy-transformed.glb',
};

export const allScenes: SceneConfig[] = [genericScene, physicsScene];

export const sceneRegistry: Record<string, SceneConfig> = {
  generic: genericScene,
  physics: physicsScene,
};

export const getScene = (sceneId: string): SceneConfig => {
  return sceneRegistry[sceneId] || genericScene;
};

// Check if a theme is compatible with a scene
export const isThemeCompatibleWithScene = (theme: Theme, scene: SceneConfig): boolean => {
  // Physics scenes require physics themes
  if (scene.type === 'physics' && theme.type !== 'physics') {
    return false;
  }
  return true;
};
