import { render } from '@testing-library/react';
import { LoserTexts } from './LoserTexts';

describe('LoserTexts', () => {
  it('renders without crashing with losers', () => {
    const losers = ['Bob', 'Charlie'];
    render(<LoserTexts losers={losers} />);

    expect(true).toBe(true);
  });

  it('renders without crashing with many losers', () => {
    const losers = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    render(<LoserTexts losers={losers} />);

    expect(true).toBe(true);
  });

  it('renders without crashing with empty losers', () => {
    render(<LoserTexts losers={[]} />);

    expect(true).toBe(true);
  });
});
