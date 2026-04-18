import { render } from '@testing-library/react';
import { getTheme } from '../../themes';
import { LoserTexts } from './LoserTexts';

describe('LoserTexts', () => {
  const theme = getTheme('spacia');
  const strategy = theme.revealStrategies.default;

  it('renders without crashing with losers', () => {
    const losers = ['Bob', 'Charlie'];
    const { container } = render(<LoserTexts losers={losers} strategy={strategy} />);

    expect(container).toBeInTheDocument();
  });

  it('renders without crashing with many losers', () => {
    const losers = [
      'Alice',
      'Bob',
      'Charlie',
      'Davey',
      'Master Skywalker',
      'Theres',
      'too',
      'many',
      'of them',
    ];
    const { container } = render(<LoserTexts losers={losers} strategy={strategy} />);

    expect(container).toBeInTheDocument();
  });

  it('renders without crashing with empty losers', () => {
    const { container } = render(<LoserTexts losers={[]} strategy={strategy} />);

    expect(container).toBeInTheDocument();
  });
});
