import { render } from '@testing-library/react';
import { Scene } from './Scene';

describe('Scene', () => {
  it('renders without crashing', () => {
    render(<Scene />);

    // Since it's 3D components, just check it doesn't throw
    expect(true).toBe(true);
  });
});
