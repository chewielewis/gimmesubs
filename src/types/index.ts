export interface Settings {
  fps: number;
  startTimecode: string; // SMPTE format HH:MM:SS:FF
  titleDuration: number; // seconds (used when autoDuration is off)
  autoDuration: boolean; // calculate duration from line length
  charsPerSecond: number; // reading speed for auto duration
  minDuration: number; // minimum duration in seconds for auto mode
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
