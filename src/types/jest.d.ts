/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Extend Jest matchers with Testing Library matchers
declare global {
  namespace jest {
    interface Matchers<R> extends jest.Matchers<void, R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveValue(value?: string | number | string[]): R;
    }
  }
}

export {};
