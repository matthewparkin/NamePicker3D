import { WinnerText } from '../components/game/WinnerText';
import { LoserTexts } from '../components/game/LoserTexts';
import type { AnimationPackage } from '../types/animation';

/**
 * Default Text Animation Package
 * Uses 3D text with floating animation and letter-by-letter reveal
 */
export const textAnimationPackage: AnimationPackage = {
  id: 'text-3d',
  name: '3D Text',
  description: 'Classic 3D text with floating animation and letter reveals',
  WinnerComponent: WinnerText,
  LoserComponent: LoserTexts,
  preview: {
    color: '#00ff00',
  },
};

/**
 * Particles Animation Package
 * Would render names as particles that swirl and coalesce
 */
export const particlesAnimationPackage: AnimationPackage = {
  id: 'particles',
  name: 'Particles',
  description: 'Names rendered as particle systems that swirl and form together',
  preview: {
    color: '#00ffff',
  },
  // These would be implemented as actual components
  // WinnerComponent: ParticlesWinner,
  // LoserComponent: ParticlesLosers,
};

/**
 * Hologram Animation Package
 * Names rendered with holographic effects
 */
export const hologramAnimationPackage: AnimationPackage = {
  id: 'hologram',
  name: 'Hologram',
  description: 'Futuristic holographic name display with glitch effects',
  preview: {
    color: '#ff00ff',
  },
  // WinnerComponent: HologramWinner,
  // LoserComponent: HologramLosers,
};

/**
 * Pixelated Animation Package
 * Names rendered with voxel/pixel style
 */
export const pixelatedAnimationPackage: AnimationPackage = {
  id: 'voxel',
  name: 'Voxel',
  description: 'Blocky voxel-style name rendering',
  preview: {
    color: '#ffff00',
  },
  // WinnerComponent: VoxelWinner,
  // LoserComponent: VoxelLosers,
};

/**
 * Organic Animation Package
 * Names rendered with organic, fluid shapes
 */
export const organicAnimationPackage: AnimationPackage = {
  id: 'organic',
  name: 'Organic',
  description: 'Fluid, organic shapes and animations',
  preview: {
    color: '#00ff00',
  },
  // WinnerComponent: OrganicWinner,
  // LoserComponent: OrganicLosers,
};

export const allAnimationPackages: AnimationPackage[] = [
  textAnimationPackage,
  particlesAnimationPackage,
  hologramAnimationPackage,
  pixelatedAnimationPackage,
  organicAnimationPackage,
];

export const animationRegistry: Record<string, AnimationPackage> = {
  'text-3d': textAnimationPackage,
  particles: particlesAnimationPackage,
  hologram: hologramAnimationPackage,
  voxel: pixelatedAnimationPackage,
  organic: organicAnimationPackage,
};

export const getAnimationPackage = (packageId: string): AnimationPackage => {
  return animationRegistry[packageId] || textAnimationPackage;
};
