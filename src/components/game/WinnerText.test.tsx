import { render } from '@testing-library/react';
import { WinnerText } from './WinnerText';
import { getTheme } from '../../themes';

describe('WinnerText', () => {
  const theme = getTheme('spacia');
  const strategy = theme.revealStrategies.default;

  it('renders without crashing', () => {
    const { container } = render(<WinnerText winner="Alice" strategy={strategy} />);
    expect(container).toBeInTheDocument();
  });

  it('handles different winner names', () => {
    const { rerender, container } = render(<WinnerText winner="Alice" strategy={strategy} />);

    // Rerender with different name
    rerender(<WinnerText winner="Bob" strategy={strategy} />);

    // Just check it doesn't crash
    expect(container).toBeInTheDocument();
  });
});
