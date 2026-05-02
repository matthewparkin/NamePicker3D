import type { Theme } from '../../types/theme';

// Style configurations for themes
const spaciaStyle = {
  primaryColor: '#9ad3bc',
  secondaryColor: '#6b6cff',
  accentColor: '#00ff00',
  backgroundColor: 'rgba(9, 14, 30, 0.95)',
  textColor: '#f8fafc',
  textHighlightColor: '#00ff00',
  buttonColor: 'rgb(6, 182, 212)',
  buttonHoverColor: 'rgb(14, 165, 233)',
  borderColor: 'rgba(255, 255, 255, 0.08)',
  winnerColor: '#00ff00',
  loserColor: '#ff4c4c',
};

const flamingStyle = {
  primaryColor: '#ffaa00',
  secondaryColor: '#ff6b00',
  accentColor: '#ffff00',
  backgroundColor: 'rgba(40, 12, 5, 0.95)',
  textColor: '#ffccaa',
  textHighlightColor: '#ffff00',
  buttonColor: 'rgb(255, 127, 0)',
  buttonHoverColor: 'rgb(255, 165, 0)',
  borderColor: 'rgba(255, 150, 0, 0.2)',
  winnerColor: '#ffff00',
  loserColor: '#ff3300',
};

const neonStyle = {
  primaryColor: '#ff00ff',
  secondaryColor: '#00ffff',
  accentColor: '#00ffff',
  backgroundColor: 'rgba(10, 5, 25, 0.95)',
  textColor: '#00ffff',
  textHighlightColor: '#ff00ff',
  buttonColor: 'rgb(138, 43, 226)',
  buttonHoverColor: 'rgb(186, 85, 211)',
  borderColor: 'rgba(0, 255, 255, 0.3)',
  winnerColor: '#00ffff',
  loserColor: '#ff00ff',
};

const forestStyle = {
  primaryColor: '#90EE90',
  secondaryColor: '#228B22',
  accentColor: '#32CD32',
  backgroundColor: 'rgba(15, 40, 20, 0.95)',
  textColor: '#E0F0E0',
  textHighlightColor: '#32CD32',
  buttonColor: 'rgb(34, 139, 34)',
  buttonHoverColor: 'rgb(50, 205, 50)',
  borderColor: 'rgba(50, 205, 50, 0.2)',
  winnerColor: '#32CD32',
  loserColor: '#8B4513',
};

const oceanStyle = {
  primaryColor: '#87CEEB',
  secondaryColor: '#1E90FF',
  accentColor: '#00BFFF',
  backgroundColor: 'rgba(10, 20, 40, 0.95)',
  textColor: '#E0F6FF',
  textHighlightColor: '#00BFFF',
  buttonColor: 'rgb(0, 191, 255)',
  buttonHoverColor: 'rgb(30, 144, 255)',
  borderColor: 'rgba(0, 191, 255, 0.3)',
  winnerColor: '#00BFFF',
  loserColor: '#1E90FF',
};

const lavaLampStyle = {
  primaryColor: '#ff00ff',
  secondaryColor: '#ff66ff',
  accentColor: '#ffff00',
  backgroundColor: 'rgba(20, 5, 30, 0.95)',
  textColor: '#ff66ff',
  textHighlightColor: '#ffff00',
  buttonColor: 'rgb(255, 0, 255)',
  buttonHoverColor: 'rgb(255, 100, 255)',
  borderColor: 'rgba(255, 0, 255, 0.2)',
  winnerColor: '#ffff00',
  loserColor: '#ff00ff',
};

export const spaciaTheme: Theme = {
  id: 'spacia',
  name: 'Spacia',
  type: 'standard',
  style: spaciaStyle,
  scene: {
    backgroundColor: [0.02, 0.03, 0.08],
    lights: {
      ambient: {
        intensity: 0.25,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.8,
        color: '#9ad3bc',
      },
      pointLights: [
        {
          position: [-4, 2, 6],
          intensity: 0.6,
          color: '#ffbb7a',
        },
        {
          position: [4, -2, 5],
          intensity: 0.45,
          color: '#6b6cff',
        },
      ],
    },
    starsConfig: {
      radius: 120,
      depth: 40,
      count: 4000,
      factor: 4,
      saturation: 0,
      fade: true,
      speed: 1,
    },
    sparklesConfig: {
      count: 180,
      scale: 8,
      size: 2.2,
      speed: 0.5,
      color: '#a5f3fc',
    },
    planeConfig: {
      args: [60, 30],
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -3.3, 0],
      material: {
        color: '#acacac',
        metalness: 0.2,
        roughness: 0.6,
      },
    },
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#00ff00',
        metalness: 0.2,
        roughness: 0.2,
        position: [-2, -0.5, 0],
      },
      losers: {
        color: '#ff4c4c',
        emissive: '#8b0000',
        emissiveIntensity: 0.35,
        metalness: 0.2,
        roughness: 0.4,
        position: [0, 0, 0],
        layout: (index) => {
          const x = (index % 3) * 2.2 - 2.2;
          const y = Math.floor(index / 3) * 1.2 - 0.5;
          const z = -2 - index * 0.5;
          const rotation = [0.1 * index, 0.4 + index * 0.15, -0.05 * index] as [
            number,
            number,
            number,
          ];
          return { position: [x, y, z] as [number, number, number], rotation };
        },
      },
      winnerAnimation: {
        floatSpeed: 1.2,
        rotationIntensity: 1,
        floatIntensity: 1.8,
        letterDelay: 100,
      },
      losersAnimation: {
        floatSpeed: 0.8,
        rotationIntensity: 0.4,
        floatIntensity: 0.3,
      },
    },
  },
};

export const flamingTheme: Theme = {
  id: 'flaming',
  name: 'Flaming',
  type: 'standard',
  style: flamingStyle,
  scene: {
    backgroundColor: [0.15, 0.05, 0.02],
    lights: {
      ambient: {
        intensity: 0.3,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.9,
        color: '#ffaa00',
      },
      pointLights: [
        {
          position: [-4, 2, 6],
          intensity: 0.7,
          color: '#ff6b00',
        },
        {
          position: [4, -2, 5],
          intensity: 0.6,
          color: '#ff0000',
        },
      ],
    },
    planeConfig: {
      args: [60, 30],
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -3.3, 0],
      material: {
        color: '#8b4513',
        metalness: 0.1,
        roughness: 0.8,
      },
    },
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#ffff00',
        emissive: '#ff6600',
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.3,
        position: [0, 0, 0],
      },
      losers: {
        color: '#ff3300',
        emissive: '#990000',
        emissiveIntensity: 0.4,
        metalness: 0.2,
        roughness: 0.5,
        position: [0, 0, 0],
        layout: (index, total) => {
          const angle = (index / total) * Math.PI * 2;
          const radius = 3;
          return {
            position: [Math.cos(angle) * radius, -1 + index * 0.3, Math.sin(angle) * radius] as [
              number,
              number,
              number,
            ],
            rotation: [0.2, angle, 0.1] as [number, number, number],
          };
        },
      },
      winnerAnimation: {
        floatSpeed: 1.5,
        rotationIntensity: 1.5,
        floatIntensity: 2,
        letterDelay: 80,
      },
      losersAnimation: {
        floatSpeed: 1,
        rotationIntensity: 0.6,
        floatIntensity: 0.5,
      },
    },
  },
};

export const neonTheme: Theme = {
  id: 'neon',
  name: 'Neon',
  type: 'standard',
  style: neonStyle,
  scene: {
    backgroundColor: [0.05, 0.02, 0.15],
    lights: {
      ambient: {
        intensity: 0.2,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.7,
        color: '#ff00ff',
      },
      pointLights: [
        {
          position: [-4, 2, 6],
          intensity: 0.8,
          color: '#00ffff',
        },
        {
          position: [4, -2, 5],
          intensity: 0.8,
          color: '#ff00ff',
        },
      ],
    },
    sparklesConfig: {
      count: 300,
      scale: 10,
      size: 1.5,
      speed: 1,
      color: '#00ffff',
    },
    planeConfig: {
      args: [60, 30],
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -3.3, 0],
      material: {
        color: '#1a0033',
        metalness: 0.8,
        roughness: 0.2,
      },
    },
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#00ffff',
        emissive: '#00ffff',
        emissiveIntensity: 0.8,
        metalness: 0.6,
        roughness: 0.1,
        position: [0, 1, 0],
      },
      losers: {
        color: '#ff00ff',
        emissive: '#ff00ff',
        emissiveIntensity: 0.6,
        metalness: 0.5,
        roughness: 0.2,
        position: [0, 0, 0],
        layout: (index, total) => {
          const angle = (index / total) * Math.PI * 2;
          const radius = 2.5;
          return {
            position: [
              Math.cos(angle) * radius,
              Math.sin(angle) * 1.5 - 1,
              Math.sin(angle) * radius,
            ] as [number, number, number],
            rotation: [0, angle + Math.PI / 2, 0.3] as [number, number, number],
          };
        },
      },
      winnerAnimation: {
        floatSpeed: 2,
        rotationIntensity: 2,
        floatIntensity: 2.5,
        letterDelay: 60,
      },
      losersAnimation: {
        floatSpeed: 1.2,
        rotationIntensity: 0.8,
        floatIntensity: 0.6,
      },
    },
  },
};

export const forestTheme: Theme = {
  id: 'forest',
  name: 'Forest',
  type: 'standard',
  style: forestStyle,
  scene: {
    backgroundColor: [0.02, 0.08, 0.03],
    lights: {
      ambient: {
        intensity: 0.4,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.6,
        color: '#90EE90',
      },
      pointLights: [
        {
          position: [-4, 2, 6],
          intensity: 0.5,
          color: '#228B22',
        },
        {
          position: [4, -2, 5],
          intensity: 0.4,
          color: '#32CD32',
        },
      ],
    },
    planeConfig: {
      args: [60, 30],
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -3.3, 0],
      material: {
        color: '#8B4513',
        metalness: 0.1,
        roughness: 0.9,
      },
    },
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#32CD32',
        emissive: '#006400',
        emissiveIntensity: 0.3,
        metalness: 0.2,
        roughness: 0.3,
        position: [0, 0, 0],
      },
      losers: {
        color: '#8B4513',
        emissive: '#654321',
        emissiveIntensity: 0.2,
        metalness: 0.1,
        roughness: 0.7,
        position: [0, 0, 0],
        layout: (index) => {
          const x = (index % 3) * 2 - 2;
          const y = Math.floor(index / 3) * 1.5 - 1;
          const z = -1 - index * 0.3;
          return {
            position: [x, y, z] as [number, number, number],
            rotation: [0, 0, 0] as [number, number, number],
          };
        },
      },
      winnerAnimation: {
        floatSpeed: 0.8,
        rotationIntensity: 0.5,
        floatIntensity: 1,
        letterDelay: 120,
      },
      losersAnimation: {
        floatSpeed: 0.5,
        rotationIntensity: 0.2,
        floatIntensity: 0.2,
      },
    },
  },
};

export const oceanTheme: Theme = {
  id: 'ocean',
  name: 'Ocean',
  type: 'standard',
  style: oceanStyle,
  scene: {
    backgroundColor: [0.02, 0.05, 0.15],
    lights: {
      ambient: {
        intensity: 0.3,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.7,
        color: '#87CEEB',
      },
      pointLights: [
        {
          position: [-4, 2, 6],
          intensity: 0.6,
          color: '#00BFFF',
        },
        {
          position: [4, -2, 5],
          intensity: 0.5,
          color: '#1E90FF',
        },
      ],
    },
    planeConfig: {
      args: [60, 30],
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -3.3, 0],
      material: {
        color: '#4682B4',
        metalness: 0.3,
        roughness: 0.4,
      },
    },
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#00BFFF',
        emissive: '#00008B',
        emissiveIntensity: 0.4,
        metalness: 0.4,
        roughness: 0.2,
        position: [0, 0, 0],
      },
      losers: {
        color: '#1E90FF',
        emissive: '#000080',
        emissiveIntensity: 0.3,
        metalness: 0.3,
        roughness: 0.3,
        position: [0, 0, 0],
        layout: (index, total) => {
          const angle = (index / total) * Math.PI * 2;
          const radius = 2.8;
          return {
            position: [Math.cos(angle) * radius, -0.5, Math.sin(angle) * radius] as [
              number,
              number,
              number,
            ],
            rotation: [0.1, angle, 0] as [number, number, number],
          };
        },
      },
      winnerAnimation: {
        floatSpeed: 1,
        rotationIntensity: 0.8,
        floatIntensity: 1.5,
        letterDelay: 90,
      },
      losersAnimation: {
        floatSpeed: 0.7,
        rotationIntensity: 0.3,
        floatIntensity: 0.4,
      },
    },
  },
};

export const lavaLampTheme: Theme = {
  id: 'lavalamp',
  name: 'Lava Lamp',
  type: 'physics',
  style: lavaLampStyle,
  scene: {
    backgroundColor: [0.02, 0.01, 0.05],
    lights: {
      ambient: {
        intensity: 0.15,
      },
      directional: {
        position: [5, 5, 5],
        intensity: 0.5,
        color: '#ff66ff',
      },
      pointLights: [
        {
          position: [0, 3.2, 0],
          intensity: 80,
          color: '#ff00ff',
        },
        {
          position: [0, 1.2, 0],
          intensity: 80,
          color: '#ff00ff',
        },
      ],
    },
  },
  physicsConfig: {
    modelPath: '/2lava2lampy-transformed.glb',
    spawnPosition: [0, 4, 0],
    containerBounds: {
      min: [-1.5, -2, -1],
      max: [1.5, 3, 1],
    },
    gravity: [0, -9.81, 0],
  },
  revealStrategies: {
    default: {
      winner: {
        color: '#ffff00',
        emissive: '#ff6600',
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.2,
        position: [0, 0, 0],
      },
      losers: {
        color: '#ff00ff',
        emissive: '#880088',
        emissiveIntensity: 0.4,
        metalness: 0.3,
        roughness: 0.3,
        position: [0, 0, 0],
        layout: (index, total) => {
          const angle = (index / total) * Math.PI * 2;
          const radius = 2;
          return {
            position: [Math.cos(angle) * radius, 2 + index * 0.3, Math.sin(angle) * radius] as [
              number,
              number,
              number,
            ],
            rotation: [0, angle, 0.2] as [number, number, number],
          };
        },
      },
      winnerAnimation: {
        floatSpeed: 0,
        rotationIntensity: 0,
        floatIntensity: 0,
        letterDelay: 0,
      },
      losersAnimation: {
        floatSpeed: 0.5,
        rotationIntensity: 0.3,
        floatIntensity: 0.3,
      },
    },
  },
};

export const allThemes: Theme[] = [
  spaciaTheme,
  flamingTheme,
  neonTheme,
  forestTheme,
  oceanTheme,
  lavaLampTheme,
];

export const themeRegistry: Record<string, Theme> = {
  spacia: spaciaTheme,
  flaming: flamingTheme,
  neon: neonTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  lavalamp: lavaLampTheme,
};

export const getTheme = (themeId: string): Theme => {
  return themeRegistry[themeId] || spaciaTheme;
};
