import { render } from '@testing-library/react';
import { LoserTexts } from './LoserTexts';

describe('LoserTexts', () => {
  it('renders without crashing with losers', () => {
    const losers = ['Bob', 'Charlie'];
    const { container } = render(<LoserTexts losers={losers} />);

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
    const { container } = render(<LoserTexts losers={losers} />);

    expect(container).toBeInTheDocument();
  });

  it('renders without crashing with empty losers', () => {
    const { container } = render(<LoserTexts losers={[]} />);

    expect(container).toBeInTheDocument();
  });
});
