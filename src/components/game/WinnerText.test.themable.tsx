import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getTheme } from '../../themes';
import type { RevealStrategyConfig } from '../../types/theme';
import { WinnerText } from './WinnerText';

// Mock @react-three/fiber and @react-three/drei
jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text3D: (props: { children: string }) => (
    <div data-testid={`text3d-${props.children}`}>{props.children}</div>
  ),
}));

describe('WinnerText Component - Theme Integration', () => {
  const themes = ['spacia', 'flaming', 'neon'];

  themes.forEach((themeId) => {
    describe(`with ${themeId} theme`, () => {
      let strategy: RevealStrategyConfig;

      beforeEach(() => {
        const theme = getTheme(themeId);
        strategy = theme.revealStrategies.default;
      });

      it('should render with theme strategy config', () => {
        const { container } = render(<WinnerText winner="Alice" strategy={strategy} />);

        expect(container).toBeTruthy();
      });

      it('should use strategy winner color', () => {
        const winnerConfig = strategy.winner;
        expect(winnerConfig.color).toBeDefined();
        expect(winnerConfig.metalness).toBeDefined();
        expect(winnerConfig.roughness).toBeDefined();
      });

      it('should have valid animation config', () => {
        const winnerAnimation = strategy.winnerAnimation;
        expect(winnerAnimation.letterDelay).toBeGreaterThan(0);
        expect(winnerAnimation.floatSpeed).toBeGreaterThan(0);
      });
    });
  });

  it('should handle different reveal strategies', () => {
    const spaciaTheme = getTheme('spacia');

    // Currently all themes have 'default' strategy, but framework supports multiple
    Object.keys(spaciaTheme.revealStrategies).forEach((strategyKey) => {
      const strategy = spaciaTheme.revealStrategies[strategyKey];
      const { container } = render(<WinnerText winner="Test" strategy={strategy} />);
      expect(container).toBeTruthy();
    });
  });
});
