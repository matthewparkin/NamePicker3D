import { render } from '@testing-library/react';
import { DecorativeElements } from './DecorativeElements';

describe('DecorativeElements', () => {
  it('renders without crashing', () => {
    render(<DecorativeElements />);

    // Since it's 3D components, just check it doesn't throw
    expect(true).toBe(true);
  });
});
