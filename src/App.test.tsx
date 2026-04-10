import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

describe('App integration', () => {
  it('renders the form when no winner is present', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByRole('heading', { name: /name reveal/i })).toBeInTheDocument();
  });

  it('renders the reveal screen when the URL includes game state', async () => {
    window.history.replaceState({}, '', '?winner=Alice&losers=Bob&names=Alice%2CBob');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      await screen.findByRole('button', {
        name: /pick again from losers/i,
      })
    ).toBeInTheDocument();
  });
});
