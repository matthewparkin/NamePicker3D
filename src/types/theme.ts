import type { ReactNode } from 'react';

export type ThemeType = 'standard' | 'physics';

// Theme style configuration - colors and visual elements
export interface ThemeStyleConfig {
  // Primary colors for the theme
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Background colors
  backgroundColor: string;
  backgroundGradient?: {
    start: string;
    end: string;
  };

  // Text colors
  textColor: string;
  textHighlightColor: string;

  // UI element colors
  buttonColor: string;
  buttonHoverColor: string;
  borderColor: string;

  // Winner/loser specific colors (can override reveal strategy)
  winnerColor?: string;
  loserColor?: string;
}

export interface ThemeSceneConfig {
  backgroundColor: [number, number, number];
  lights: {
    ambient: {
      intensity: number;
    };
    directional: {
      position: [number, number, number];
      intensity: number;
      color: string;
    };
    pointLights: Array<{
      position: [number, number, number];
      intensity: number;
      color: string;
    }>;
  };
  starsConfig?: {
    radius: number;
    depth: number;
    count: number;
    factor: number;
    saturation: number;
    fade: boolean;
    speed: number;
  };
  sparklesConfig?: {
    count: number;
    scale: number;
    size: number;
    speed: number;
    color: string;
  };
  planeConfig?: {
    args: [number, number];
    rotation: [number, number, number];
    position: [number, number, number];
    material: {
      color: string;
      metalness: number;
      roughness: number;
    };
  };
  decorativeElements?: ReactNode;
}

export interface PhysicsSceneConfig {
  modelPath: string;
  spawnPosition: [number, number, number];
  containerBounds: {
    min: [number, number, number];
    max: [number, number, number];
  };
  gravity: [number, number, number];
}

export interface TextConfig {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  metalness: number;
  roughness: number;
  position: [number, number, number];
}

export interface RevealStrategyConfig {
  winner: TextConfig;
  losers: TextConfig & {
    layout: (
      index: number,
      total: number
    ) => {
      position: [number, number, number];
      rotation: [number, number, number];
    };
  };
  winnerAnimation: {
    floatSpeed: number;
    rotationIntensity: number;
    floatIntensity: number;
    letterDelay: number;
  };
  losersAnimation: {
    floatSpeed: number;
    rotationIntensity: number;
    floatIntensity: number;
  };
}

export interface Theme {
  id: string;
  name: string;
  type: ThemeType;
  style: ThemeStyleConfig;
  scene: ThemeSceneConfig;
  physicsConfig?: PhysicsSceneConfig;
  revealStrategies: {
    default: RevealStrategyConfig;
    [key: string]: RevealStrategyConfig;
  };
}

export type RevealStrategyType = keyof Theme['revealStrategies'];
