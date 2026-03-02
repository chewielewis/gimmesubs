import type { Settings } from '../types/index.ts';

export const FPS_OPTIONS = [23.976, 24, 25, 29.97, 30, 59.94, 60] as const;

export const DEFAULT_SETTINGS: Settings = {
  fps: 23.976,
  startTimecode: '01:00:00:00',
  titleDuration: 3.0,
  gapDuration: 0.5,
  maxLineLength: 42,
  ignoreBlankLines: false,
};
