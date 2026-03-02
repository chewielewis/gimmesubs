import type { Settings, Subtitle } from '../types/index.ts';
import { smpteToMs, msToSrtTimecode } from './timecode.ts';
import { wrapLine } from './textSplitter.ts';

/**
 * Parse input text and generate subtitle entries with timing.
 */
export function generateSubtitles(text: string, settings: Settings): Subtitle[] {
  const lines = text.split('\n');
  const subtitles: Subtitle[] = [];

  let currentMs = smpteToMs(settings.startTimecode, settings.fps);
  const durationMs = settings.titleDuration * 1000;
  const gapMs = settings.gapDuration * 1000;
  let index = 1;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (trimmed === '') {
      if (!settings.ignoreBlankLines) {
        // Blank line = intentional pause
        currentMs += gapMs;
      }
      continue;
    }

    const wrappedText = wrapLine(trimmed, settings.maxLineLength);

    subtitles.push({
      index,
      startMs: currentMs,
      endMs: currentMs + durationMs,
      text: wrappedText,
    });

    currentMs += durationMs + gapMs;
    index++;
  }

  return subtitles;
}

/**
 * Format a single subtitle entry as an SRT block.
 */
function formatSrtEntry(subtitle: Subtitle): string {
  const start = msToSrtTimecode(subtitle.startMs);
  const end = msToSrtTimecode(subtitle.endMs);
  return `${subtitle.index}\r\n${start} --> ${end}\r\n${subtitle.text}`;
}

/**
 * Generate a complete SRT file string from subtitles.
 */
export function formatSrt(subtitles: Subtitle[]): string {
  if (subtitles.length === 0) return '';
  return subtitles.map(formatSrtEntry).join('\r\n\r\n') + '\r\n';
}

/**
 * Full pipeline: text + settings -> SRT string.
 */
export function generateSrt(text: string, settings: Settings): string {
  const subtitles = generateSubtitles(text, settings);
  return formatSrt(subtitles);
}
