import type { ComponentType } from 'react';
import type { RevealStrategyConfig } from './theme';

/**
 * Animation Package: Independent of Theme
 * Can include custom components, 3D models, animations, effects
 */

export interface AnimationComponentProps {
  isActive: boolean;
}

export interface WinnerAnimationComponentProps {
  winner: string;
  strategy: RevealStrategyConfig;
}

export interface LoserAnimationComponentProps {
  losers: string[];
  strategy: RevealStrategyConfig;
}

export interface SceneEffectComponentProps {
  intensity?: number;
  active?: boolean;
}

export interface AnimationPackage {
  id: string;
  name: string;
  description: string;

  // Custom 3D components for rendering names
  WinnerComponent?: ComponentType<WinnerAnimationComponentProps>;
  LoserComponent?: ComponentType<LoserAnimationComponentProps>;

  // Custom scene effects/decorations
  SceneEffects?: ComponentType<SceneEffectComponentProps>;

  // Custom animations or transitions
  customAnimations?: Record<string, string | number | boolean>;

  // Visual metadata for UI
  preview: {
    color: string;
    icon?: string;
  };

  // Supported reveal strategies (these can override theme strategies)
  revealStrategiesOverride?: Record<string, Record<string, string | number | boolean>>;
}

/**
 * Combined configuration when using Animation + Theme
 */
export interface AnimationThemeCombo {
  animationPackageId: string;
  themeId: string;
}
