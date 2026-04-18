import { allAnimationPackages, animationRegistry, getAnimationPackage } from '.';

describe('Animation Packages System', () => {
  describe('allAnimationPackages', () => {
    it('should have at least one animation package', () => {
      expect(allAnimationPackages.length).toBeGreaterThan(0);
    });

    it('should have unique package IDs', () => {
      const ids = allAnimationPackages.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have proper structure', () => {
      allAnimationPackages.forEach((pkg) => {
        expect(pkg).toHaveProperty('id');
        expect(pkg).toHaveProperty('name');
        expect(pkg).toHaveProperty('description');
        expect(pkg).toHaveProperty('preview');
      });
    });

    it('should have preview with color for each package', () => {
      allAnimationPackages.forEach((pkg) => {
        expect(pkg.preview).toBeDefined();
        expect(pkg.preview.color).toBeDefined();
        expect(typeof pkg.preview.color).toBe('string');
        expect(pkg.preview.color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe('animationRegistry', () => {
    it('should contain all animation packages', () => {
      allAnimationPackages.forEach((pkg) => {
        expect(animationRegistry[pkg.id]).toEqual(pkg);
      });
    });

    it('should be retrievable by ID', () => {
      expect(animationRegistry['text-3d']).toBeDefined();
    });
  });

  describe('getAnimationPackage', () => {
    it('should return the correct package by ID', () => {
      const pkg = getAnimationPackage('text-3d');
      expect(pkg.id).toBe('text-3d');
      expect(pkg.name).toBe('3D Text');
    });

    it('should return default package for unknown ID', () => {
      const pkg = getAnimationPackage('unknown-animation-xyz');
      expect(pkg.id).toBe('text-3d');
    });

    it('should have WinnerComponent for text-3d', () => {
      const pkg = getAnimationPackage('text-3d');
      expect(pkg.WinnerComponent).toBeDefined();
    });

    it('should have LoserComponent for text-3d', () => {
      const pkg = getAnimationPackage('text-3d');
      expect(pkg.LoserComponent).toBeDefined();
    });
  });

  describe('Animation Package Independence', () => {
    it('can be used with any theme', () => {
      const textPkg = getAnimationPackage('text-3d');
      // The animation should be independent and work with any theme
      expect(textPkg.WinnerComponent).toBeTruthy();
      expect(textPkg.LoserComponent).toBeTruthy();
    });

    it('packages can have optional components', () => {
      const allPkgsHaveOptionalFields = allAnimationPackages.every((pkg) => {
        // Some packages may not have custom components (yet)
        return pkg.WinnerComponent === undefined || typeof pkg.WinnerComponent === 'function';
      });
      expect(allPkgsHaveOptionalFields).toBe(true);
    });
  });
});
