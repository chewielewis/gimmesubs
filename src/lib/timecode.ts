/**
 * Parse a SMPTE timecode string (HH:MM:SS:FF) to milliseconds.
 */
export function smpteToMs(timecode: string, fps: number): number {
  const parts = timecode.split(':');
  if (parts.length !== 4) {
    throw new Error(`Invalid SMPTE timecode: "${timecode}". Expected HH:MM:SS:FF`);
  }

  const [hours, minutes, seconds, frames] = parts.map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(frames)) {
    throw new Error(`Invalid SMPTE timecode: "${timecode}". Non-numeric values`);
  }

  if (hours < 0 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    throw new Error(`Invalid SMPTE timecode: "${timecode}". Values out of range`);
  }

  const clampedFrames = Math.min(frames, Math.ceil(fps) - 1);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const frameMs = (clampedFrames / fps) * 1000;

  return Math.round(totalSeconds * 1000 + frameMs);
}

/**
 * Convert milliseconds to SRT timecode format (HH:MM:SS,mmm).
 */
export function msToSrtTimecode(ms: number): string {
  const totalMs = Math.max(0, Math.round(ms));

  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const seconds = Math.floor((totalMs % 60_000) / 1000);
  const millis = totalMs % 1000;

  return (
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0') +
    ',' +
    String(millis).padStart(3, '0')
  );
}

/**
 * Validate a SMPTE timecode string. Returns an error message or null if valid.
 */
export function validateTimecode(timecode: string, fps: number): string | null {
  const pattern = /^\d{2}:\d{2}:\d{2}:\d{2}$/;
  if (!pattern.test(timecode)) {
    return 'Format must be HH:MM:SS:FF';
  }

  const [hours, minutes, seconds, frames] = timecode.split(':').map(Number);

  if (hours > 23) return 'Hours must be 0-23';
  if (minutes > 59) return 'Minutes must be 0-59';
  if (seconds > 59) return 'Seconds must be 0-59';
  if (frames >= Math.ceil(fps)) return `Frames must be 0-${Math.ceil(fps) - 1} at ${fps} FPS`;

  return null;
}
