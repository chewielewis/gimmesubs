import { describe, it, expect } from 'vitest';
import { generateSubtitles, formatSrt, generateSrt } from './srt.ts';
import { DEFAULT_SETTINGS } from './defaults.ts';
import type { Settings } from '../types/index.ts';

const testSettings: Settings = {
  fps: 24,
  startTimecode: '00:00:00:00',
  titleDuration: 3.0,
  gapDuration: 0.5,
  maxLineLength: 42,
};

describe('generateSubtitles', () => {
  it('generates one subtitle per non-empty line', () => {
    const text = 'Line one\nLine two\nLine three';
    const subs = generateSubtitles(text, testSettings);
    expect(subs).toHaveLength(3);
    expect(subs[0].index).toBe(1);
    expect(subs[1].index).toBe(2);
    expect(subs[2].index).toBe(3);
  });

  it('assigns correct timing with gap', () => {
    const text = 'First\nSecond';
    const subs = generateSubtitles(text, testSettings);

    // First: 0ms -> 3000ms
    expect(subs[0].startMs).toBe(0);
    expect(subs[0].endMs).toBe(3000);

    // Second: 3500ms -> 6500ms (3000 + 500 gap)
    expect(subs[1].startMs).toBe(3500);
    expect(subs[1].endMs).toBe(6500);
  });

  it('treats blank lines as pauses', () => {
    const text = 'Before gap\n\nAfter gap';
    const subs = generateSubtitles(text, testSettings);

    expect(subs).toHaveLength(2);
    // First: 0 -> 3000
    // Blank line adds 500ms gap
    // Normal gap after first sub: 500ms
    // So second starts at: 3000 + 500 (normal gap) + 500 (blank line gap) = 4000
    expect(subs[1].startMs).toBe(4000);
  });

  it('handles multiple consecutive blank lines', () => {
    const text = 'Before\n\n\n\nAfter';
    const subs = generateSubtitles(text, testSettings);

    expect(subs).toHaveLength(2);
    // First ends at 3000, normal gap 500, then 3 blank lines × 500 = 1500
    expect(subs[1].startMs).toBe(3000 + 500 + 1500);
  });

  it('wraps long lines', () => {
    const longLine = 'This is a really long subtitle line that definitely exceeds the maximum character limit';
    const subs = generateSubtitles(longLine, testSettings);
    expect(subs[0].text).toContain('\n');
  });

  it('returns empty array for empty input', () => {
    expect(generateSubtitles('', testSettings)).toHaveLength(0);
  });

  it('returns empty array for only blank lines', () => {
    expect(generateSubtitles('\n\n\n', testSettings)).toHaveLength(0);
  });

  it('uses start timecode offset', () => {
    const settings: Settings = { ...testSettings, startTimecode: '01:00:00:00' };
    const subs = generateSubtitles('Hello', settings);
    expect(subs[0].startMs).toBe(3_600_000);
  });
});

describe('formatSrt', () => {
  it('formats subtitles in SRT format with CRLF', () => {
    const subs = [
      { index: 1, startMs: 1000, endMs: 4000, text: 'First subtitle' },
      { index: 2, startMs: 4500, endMs: 7500, text: 'Second subtitle' },
    ];

    const result = formatSrt(subs);
    expect(result).toBe(
      '1\r\n00:00:01,000 --> 00:00:04,000\r\nFirst subtitle\r\n\r\n' +
      '2\r\n00:00:04,500 --> 00:00:07,500\r\nSecond subtitle\r\n'
    );
  });

  it('returns empty string for empty array', () => {
    expect(formatSrt([])).toBe('');
  });

  it('handles single subtitle', () => {
    const subs = [{ index: 1, startMs: 0, endMs: 3000, text: 'Only one' }];
    const result = formatSrt(subs);
    expect(result).toBe('1\r\n00:00:00,000 --> 00:00:03,000\r\nOnly one\r\n');
  });
});

describe('generateSrt', () => {
  it('produces valid SRT from text input', () => {
    const text = 'Hello world\nGoodbye world';
    const result = generateSrt(text, testSettings);

    expect(result).toContain('1\r\n');
    expect(result).toContain('2\r\n');
    expect(result).toContain('Hello world');
    expect(result).toContain('Goodbye world');
    expect(result).toContain('-->');
  });

  it('works with default settings', () => {
    const result = generateSrt('Test line', DEFAULT_SETTINGS);
    expect(result).toContain('01:00:00,000');
    expect(result).toContain('Test line');
  });
});
