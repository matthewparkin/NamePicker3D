import { allThemes, themeRegistry, getTheme } from '.';

describe('Theme System', () => {
  describe('allThemes', () => {
    it('should have at least one theme', () => {
      expect(allThemes.length).toBeGreaterThan(0);
    });

    it('should have unique theme IDs', () => {
      const ids = allThemes.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have proper theme structure', () => {
      allThemes.forEach((theme) => {
        expect(theme).toHaveProperty('id');
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('scene');
        expect(theme).toHaveProperty('revealStrategies');
        expect(theme).toHaveProperty('formTheme');
      });
    });
  });

  describe('themeRegistry', () => {
    it('should contain all themes', () => {
      allThemes.forEach((theme) => {
        expect(themeRegistry[theme.id]).toEqual(theme);
      });
    });
  });

  describe('getTheme', () => {
    it('should return a theme for any registered ID', () => {
      allThemes.forEach((theme) => {
        const retrieved = getTheme(theme.id);
        expect(retrieved.id).toBe(theme.id);
      });
    });

    it('should return default theme for unknown ID', () => {
      const unknownTheme = getTheme('unknown-theme-xyz');
      // Default theme should be the first one in allThemes
      expect(unknownTheme.id).toBe(allThemes[0].id);
    });

    it('should have default reveal strategy for all themes', () => {
      allThemes.forEach((theme) => {
        const retrieved = getTheme(theme.id);
        expect(retrieved.revealStrategies.default).toBeDefined();
      });
    });
  });

  describe('Theme Scene Configuration', () => {
    const validateRgbColor = (color: number[], themeId: string) => {
      expect(color).toHaveLength(3);
      color.forEach((value) => {
        expect(typeof value)
          .toBe('number')
          .toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      });
    };

    const validateLights = (lights: (typeof allThemes)[0]['scene']['lights'], themeId: string) => {
      expect(lights.ambient.intensity).toBeGreaterThanOrEqual(0);
      expect(lights.directional.intensity).toBeGreaterThanOrEqual(0);
      expect(lights.directional.position).toHaveLength(3);
      validateRgbColor(lights.directional.position, themeId);
      expect(lights.pointLights).toBeInstanceOf(Array);
    };

    it.each(allThemes)('theme $id should have valid background color', (theme) => {
      const { backgroundColor } = theme.scene;
      validateRgbColor(backgroundColor, theme.id);
    });

    it.each(allThemes)('theme $id should have valid lights configuration', (theme) => {
      const { lights } = theme.scene;
      validateLights(lights, theme.id);
    });
  });

  describe('Reveal Strategy Configuration', () => {
    const validateTextConfig = (config: { color: string }, strategyName: string) => {
      expect(config.color).toBeDefined();
      expect(typeof config.color).toBe('string');
      expect(config.color.length).toBeGreaterThan(0);
    };

    const validateAnimationConfig = (
      config: { floatSpeed: number; letterDelay?: number },
      strategyName: string
    ) => {
      expect(config.floatSpeed).toBeGreaterThan(0);
      if (config.letterDelay !== undefined) {
        expect(config.letterDelay).toBeGreaterThan(0);
      }
    };

    it.each(allThemes)(
      'theme $id should have winner and loser text configs for all strategies',
      (theme) => {
        Object.entries(theme.revealStrategies).forEach(([strategyName, strategy]) => {
          expect(strategy.winner).toBeDefined();
          validateTextConfig(strategy.winner, strategyName);
          expect(strategy.losers).toBeDefined();
          validateTextConfig(strategy.losers, strategyName);
          expect(strategy.losers.layout).toBeDefined();
        });
      }
    );

    it.each(allThemes)(
      'theme $id should have valid animation config for all strategies',
      (theme) => {
        Object.entries(theme.revealStrategies).forEach(([strategyName, strategy]) => {
          validateAnimationConfig(strategy.winnerAnimation, strategyName);
          validateAnimationConfig(strategy.losersAnimation, strategyName);
        });
      }
    );

    it.each(allThemes)('theme $id loser layout should return valid positions', (theme) => {
      Object.entries(theme.revealStrategies).forEach(([strategyName, strategy]) => {
        const positions = [];
        for (let i = 0; i < 6; i++) {
          const { position, rotation } = strategy.losers.layout(i, 6);
          expect(position).toHaveLength(3);
          expect(rotation).toHaveLength(3);
          positions.push(position);
        }

        // Check that not all positions are the same (layout produces varied positions)
        const uniquePositions = new Set(positions.map((p) => JSON.stringify(p)));
        expect(uniquePositions.size).toBeGreaterThan(1);
      });
    });
  });

  describe('Form Theme Configuration', () => {
    const requiredFormThemeProperties = [
      'backgroundColor',
      'textColor',
      'borderColor',
      'buttonBackground',
      'buttonHoverBackground',
      'accentColor',
    ] as const;

    it.each(allThemes)('theme $id should have all required form theme properties', (theme) => {
      requiredFormThemeProperties.forEach((property) => {
        expect(theme.formTheme[property]).toBeDefined();
        expect(typeof theme.formTheme[property]).toBe('string');
        expect(theme.formTheme[property].length).toBeGreaterThan(0);
      });
    });
  });
});
