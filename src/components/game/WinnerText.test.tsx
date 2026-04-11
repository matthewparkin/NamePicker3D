import { render } from '@testing-library/react';
import { WinnerText } from './WinnerText';

describe('WinnerText', () => {
  it('renders without crashing', () => {
    render(<WinnerText winner="Alice" />);
    // Just check it renders without throwing
    expect(true).toBe(true);
  });

  it('handles different winner names', () => {
    const { rerender } = render(<WinnerText winner="Alice" />);

    // Rerender with different name
    rerender(<WinnerText winner="Bob" />);

    // Just check it doesn't crash
    expect(true).toBe(true);
  });
});
