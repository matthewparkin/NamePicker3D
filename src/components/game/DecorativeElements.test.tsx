import { render } from '@testing-library/react';
import { DecorativeElements } from './DecorativeElements';

describe('DecorativeElements', () => {
  it('renders without crashing', () => {
    const { container } = render(<DecorativeElements />);

    // Since it's 3D components, just check it renders
    expect(container).toBeInTheDocument();
  });
});
