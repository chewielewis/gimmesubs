interface PreviewProps {
  srtContent: string;
}

export function Preview({ srtContent }: PreviewProps): React.JSX.Element {
  const displayContent = srtContent.replace(/\r\n/g, '\n');

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-slate-300">SRT Preview</h2>
      <pre className="bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap leading-[1.4] h-[14lh]">
        {displayContent || <span className="text-slate-500">SRT output will appear here...</span>}
      </pre>
    </div>
  );
}
