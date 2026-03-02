export interface Settings {
  fps: number;
  startTimecode: string; // SMPTE format HH:MM:SS:FF
  titleDuration: number; // seconds
  gapDuration: number; // seconds
  maxLineLength: number; // characters
  ignoreBlankLines: boolean;
}

export interface Subtitle {
  index: number;
  startMs: number;
  endMs: number;
  text: string;
}
