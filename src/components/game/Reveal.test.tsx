import { render, screen } from '@testing-library/react';
import Reveal from './Reveal';

// Mock the entire Canvas to prevent 3D rendering
jest.mock('@react-three/fiber', () => ({
  Canvas: () => <div data-testid="canvas" />,
}));

jest.mock('@react-three/drei', () => ({
  Float: () => null,
  OrbitControls: () => null,
  Plane: () => null,
  Sparkles: () => null,
  Stars: () => null,
  Text3D: () => null,
}));

describe('Reveal component', () => {
  it('renders buttons', () => {
    render(<Reveal winner="Alice" losers={['Bob']} onBack={jest.fn()} onPickAgain={jest.fn()} />);

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pick again from losers/i })).toBeInTheDocument();
  });

  it('does not render pick again button when no losers', () => {
    render(<Reveal winner="Alice" losers={[]} onBack={jest.fn()} onPickAgain={jest.fn()} />);

    expect(
      screen.queryByRole('button', { name: /pick again from losers/i })
    ).not.toBeInTheDocument();
  });
});
