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
}));

// Mock React Three Fiber with extend
jest.mock('@react-three/fiber', () => {
  const React = require('react');
  const mockComponent = ({ children, ...props }: any) =>
    React.createElement('div', props, children);

  return {
    Canvas: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
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
    meshBasicMaterial: mockComponent,
    boxGeometry: mockComponent,
    sphereGeometry: mockComponent,
  };
});
