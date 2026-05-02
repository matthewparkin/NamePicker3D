import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store';
import Form from './Form';

describe('Form component', () => {
  it('renders initial names and submits the provided list', async () => {
    const handlePick = jest.fn();
    render(
      <Provider store={store}>
        <Form initialNames={['Alice', 'Bob']} onPick={handlePick} />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Alice\nBob');

    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).toHaveBeenCalledTimes(1);
    expect(handlePick).toHaveBeenCalledWith(['Alice', 'Bob']);
  });

  it('does not submit when the textarea is empty', async () => {
    const handlePick = jest.fn();
    render(
      <Provider store={store}>
        <Form initialNames={[]} onPick={handlePick} />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.clear(textarea);
    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).not.toHaveBeenCalled();
  });

  it('trims whitespace and ignores blank lines', async () => {
    const handlePick = jest.fn();
    render(
      <Provider store={store}>
        <Form initialNames={[]} onPick={handlePick} />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '  Alice  \n\n  Bob  \n  ');
    await userEvent.click(screen.getByRole('button', { name: /pick random name/i }));

    expect(handlePick).toHaveBeenCalledTimes(1);
    expect(handlePick).toHaveBeenCalledWith(['Alice', 'Bob']);
  });

  it('updates the textarea when initialNames prop changes', async () => {
    const handlePick = jest.fn();
    const { rerender } = render(
      <Provider store={store}>
        <Form initialNames={['Alice']} onPick={handlePick} />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Alice');

    rerender(
      <Provider store={store}>
        <Form initialNames={['Bob', 'Charlie']} onPick={handlePick} />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Bob\nCharlie');
  });
});
