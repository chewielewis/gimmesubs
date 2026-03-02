/**
 * Wrap a line of text at word boundaries to fit within maxLength characters.
 * Returns the wrapped text with newlines inserted at word boundaries.
 * Never breaks mid-word - if a single word exceeds maxLength, it gets its own line.
 */
export function wrapLine(line: string, maxLength: number): string {
  const trimmed = line.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  const words = trimmed.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine === '') {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxLength) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join('\n');
}
