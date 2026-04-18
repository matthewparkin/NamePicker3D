import type { ReactNode } from 'react';

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
  scene: ThemeSceneConfig;
  revealStrategies: {
    default: RevealStrategyConfig;
    [key: string]: RevealStrategyConfig;
  };
  formTheme: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    buttonBackground: string;
    buttonHoverBackground: string;
    accentColor: string;
  };
}

export type RevealStrategyType = keyof Theme['revealStrategies'];
