/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any  */
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import React from 'react';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

// Mock drei components
jest.mock('@react-three/drei', () => ({
  Float: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', null, children),
  Text3D: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', null, children),
  Stars: () => React.createElement('div', null),
  Sparkles: () => React.createElement('div', null),
  Plane: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', null, children),
  OrbitControls: () => React.createElement('div', null),
}));

// Mock React Three Fiber with extend
jest.mock('@react-three/fiber', () => {
  const React = require('react');
  const mockComponent = ({ children, ...props }: any) =>
    React.createElement('div', props, children);

  return {
    Canvas: () => React.createElement('div', { 'data-testid': 'canvas' }),
    useFrame: jest.fn(),
    useThree: jest.fn(() => ({})),
    extend: jest.fn(),
    // Mock all the JSX elements that React Three Fiber creates
    mesh: mockComponent,
    meshStandardMaterial: mockComponent,
    group: mockComponent,
    torusGeometry: mockComponent,
    planeGeometry: mockComponent,
    ambientLight: mockComponent,
    directionalLight: mockComponent,
    pointLight: mockComponent,
    meshBasicMaterial: mockComponent,
    boxGeometry: mockComponent,
    sphereGeometry: mockComponent,
  };
});

// Mock game components that are Three.js-only
jest.mock('./src/components/game/LoserTexts', () => ({
  LoserTexts: () => React.createElement('div', { 'data-testid': 'loser-texts' }),
}));

jest.mock('./src/components/game/WinnerText', () => ({
  WinnerText: () => React.createElement('div', { 'data-testid': 'winner-text' }),
}));

jest.mock('./src/components/game/DecorativeElements', () => ({
  DecorativeElements: () => React.createElement('div', { 'data-testid': 'decorative-elements' }),
}));

jest.mock('./src/components/game/Scene', () => ({
  Scene: () => React.createElement('div', { 'data-testid': 'scene' }),
}));
