import { describe, it, expect } from 'vitest';
import { smpteToMs, msToSrtTimecode, validateTimecode } from './timecode.ts';

describe('smpteToMs', () => {
  it('converts 01:00:00:00 at 23.976 fps', () => {
    expect(smpteToMs('01:00:00:00', 23.976)).toBe(3_600_000);
  });

  it('converts 00:00:00:00 to 0', () => {
    expect(smpteToMs('00:00:00:00', 24)).toBe(0);
  });

  it('converts frames correctly at 24 fps', () => {
    // 12 frames at 24fps = 500ms
    expect(smpteToMs('00:00:00:12', 24)).toBe(500);
  });

  it('converts frames correctly at 23.976 fps', () => {
    // 1 frame at 23.976fps ≈ 41.708ms
    const result = smpteToMs('00:00:00:01', 23.976);
    expect(result).toBe(42); // rounded
  });

  it('converts a full timecode with all components', () => {
    // 1h + 30m + 15s + 12 frames at 30fps (12/30 = 400ms)
    expect(smpteToMs('01:30:15:12', 30)).toBe(5_415_400);
  });

  it('clamps frames exceeding fps', () => {
    // At 24fps, frame 24 should clamp to 23
    const clamped = smpteToMs('00:00:00:24', 24);
    const frame23 = smpteToMs('00:00:00:23', 24);
    expect(clamped).toBe(frame23);
  });

  it('throws on invalid format', () => {
    expect(() => smpteToMs('01:00:00', 24)).toThrow('Invalid SMPTE timecode');
  });

  it('throws on non-numeric values', () => {
    expect(() => smpteToMs('aa:bb:cc:dd', 24)).toThrow('Non-numeric');
  });
});

describe('msToSrtTimecode', () => {
  it('converts 0ms', () => {
    expect(msToSrtTimecode(0)).toBe('00:00:00,000');
  });

  it('converts 1000ms', () => {
    expect(msToSrtTimecode(1000)).toBe('00:00:01,000');
  });

  it('converts 3600000ms (1 hour)', () => {
    expect(msToSrtTimecode(3_600_000)).toBe('01:00:00,000');
  });

  it('converts complex ms value', () => {
    // 1h + 2m + 3s + 456ms = 3723456ms
    expect(msToSrtTimecode(3_723_456)).toBe('01:02:03,456');
  });

  it('handles negative values as 0', () => {
    expect(msToSrtTimecode(-100)).toBe('00:00:00,000');
  });

  it('pads single digits correctly', () => {
    expect(msToSrtTimecode(5)).toBe('00:00:00,005');
  });
});

describe('validateTimecode', () => {
  it('returns null for valid timecode', () => {
    expect(validateTimecode('01:00:00:00', 24)).toBeNull();
  });

  it('rejects wrong format', () => {
    expect(validateTimecode('1:0:0:0', 24)).toBe('Format must be HH:MM:SS:FF');
  });

  it('rejects minutes > 59', () => {
    expect(validateTimecode('01:60:00:00', 24)).toBe('Minutes must be 0-59');
  });

  it('rejects seconds > 59', () => {
    expect(validateTimecode('01:00:60:00', 24)).toBe('Seconds must be 0-59');
  });

  it('rejects frames >= fps', () => {
    expect(validateTimecode('01:00:00:24', 24)).toContain('Frames must be');
  });

  it('allows max valid frame', () => {
    expect(validateTimecode('01:00:00:23', 24)).toBeNull();
  });
});
