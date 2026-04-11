import { render } from '@testing-library/react';
import { Scene } from './Scene';

describe('Scene', () => {
  it('renders without crashing', () => {
    const { container } = render(<Scene />);

    // Since it's 3D components, just check it renders
    expect(container).toBeInTheDocument();
  });
});
