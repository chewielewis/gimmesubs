interface PreviewProps {
  srtContent: string;
  subtitleCount: number;
}

export function Preview({ srtContent, subtitleCount }: PreviewProps): React.JSX.Element {
  const displayContent = srtContent.replace(/\r\n/g, '\n');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-300">SRT Preview</h2>
        {subtitleCount > 0 && (
          <span className="text-xs text-slate-500">{subtitleCount} subtitle{subtitleCount !== 1 ? 's' : ''}</span>
        )}
      </div>
      <pre className="bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap leading-[1.4] h-[14lh]">
        {displayContent || <span className="text-slate-500">SRT output will appear here...</span>}
      </pre>
    </div>
  );
}
