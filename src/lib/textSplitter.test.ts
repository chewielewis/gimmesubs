import { describe, it, expect } from 'vitest';
import { wrapLine } from './textSplitter.ts';

describe('wrapLine', () => {
  it('returns short lines unchanged', () => {
    expect(wrapLine('Hello world', 42)).toBe('Hello world');
  });

  it('trims whitespace', () => {
    expect(wrapLine('  Hello world  ', 42)).toBe('Hello world');
  });

  it('wraps at word boundary when exceeding max length', () => {
    const input = 'This is a longer line that should be wrapped at word boundaries';
    const result = wrapLine(input, 30);
    const lines = result.split('\n');
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(30);
    }
    // Content should be preserved
    expect(result.replace(/\n/g, ' ')).toBe(input);
  });

  it('does not break mid-word', () => {
    const input = 'superlongwordthatexceedslimit short';
    const result = wrapLine(input, 20);
    const lines = result.split('\n');
    expect(lines[0]).toBe('superlongwordthatexceedslimit');
    expect(lines[1]).toBe('short');
  });

  it('handles single word longer than max', () => {
    expect(wrapLine('supercalifragilisticexpialidocious', 10)).toBe(
      'supercalifragilisticexpialidocious'
    );
  });

  it('handles exactly max length', () => {
    const input = 'abcdefghij'; // 10 chars
    expect(wrapLine(input, 10)).toBe(input);
  });

  it('wraps multiple times for very long text', () => {
    const input = 'one two three four five six seven eight nine ten';
    const result = wrapLine(input, 15);
    const lines = result.split('\n');
    expect(lines.length).toBeGreaterThan(2);
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(15);
    }
  });

  it('handles empty string', () => {
    expect(wrapLine('', 42)).toBe('');
  });
});
