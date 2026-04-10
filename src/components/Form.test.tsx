import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form component', () => {
  it('renders initial names and submits the provided list', async () => {
    const handlePick = jest.fn();
    render(<Form initialNames={['Alice', 'Bob']} onPick={handlePick} />);

    expect(screen.getByRole('textbox')).toHaveValue('Alice\nBob');

    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).toHaveBeenCalledTimes(1);
    expect(handlePick).toHaveBeenCalledWith(['Alice', 'Bob']);
  });

  it('does not submit when the textarea is empty', async () => {
    const handlePick = jest.fn();
    render(<Form initialNames={[]} onPick={handlePick} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.clear(textarea);
    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).not.toHaveBeenCalled();
  });

  it('trims whitespace and ignores blank lines', async () => {
    const handlePick = jest.fn();
    render(<Form initialNames={[]} onPick={handlePick} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '  Alice  \n\n  Bob  \n  ');
    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).toHaveBeenCalledTimes(1);
    expect(handlePick).toHaveBeenCalledWith(['Alice', 'Bob']);
  });

  it('updates the textarea when initialNames prop changes', async () => {
    const handlePick = jest.fn();
    const { rerender } = render(<Form initialNames={['Alice']} onPick={handlePick} />);

    expect(screen.getByRole('textbox')).toHaveValue('Alice');

    rerender(<Form initialNames={['Bob', 'Charlie']} onPick={handlePick} />);

    expect(screen.getByRole('textbox')).toHaveValue('Bob\nCharlie');
  });
});
