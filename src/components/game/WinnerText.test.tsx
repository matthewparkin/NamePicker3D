import { render } from '@testing-library/react';
import { WinnerText } from './WinnerText';

describe('WinnerText', () => {
  it('renders without crashing', () => {
    const { container } = render(<WinnerText winner="Alice" />);
    expect(container).toBeInTheDocument();
  });

  it('handles different winner names', () => {
    const { rerender, container } = render(<WinnerText winner="Alice" />);

    // Rerender with different name
    rerender(<WinnerText winner="Bob" />);

    // Just check it doesn't crash
    expect(container).toBeInTheDocument();
  });
});
