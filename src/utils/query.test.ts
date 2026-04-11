import { parseJsonArray, parseWinner, updateUrl } from './query';

describe('query utilities', () => {
  it('parses newline or comma separated lists into arrays', () => {
    expect(parseJsonArray('Alice,Bob')).toEqual(['Alice', 'Bob']);
    expect(parseJsonArray('Alice\nBob')).toEqual(['Alice', 'Bob']);
    expect(parseJsonArray(['Alice', 'Bob'])).toEqual(['Alice', 'Bob']);
  });

  it('returns null for invalid winner inputs', () => {
    expect(parseWinner('')).toBeNull();
    expect(parseWinner('null')).toBeNull();
    expect(parseWinner('  ')).toBeNull();
    expect(parseWinner('Alice')).toBe('Alice');
  });

  it('updates window location search with clean params', () => {
    updateUrl('Alice', ['Bob', 'Charlie'], ['Alice', 'Bob', 'Charlie']);
    expect(window.location.search).toContain('winner=Alice');
    expect(window.location.search).toContain('losers%5B%5D=Bob');
    expect(window.location.search).toContain('names%5B%5D=Alice');
  });
});
