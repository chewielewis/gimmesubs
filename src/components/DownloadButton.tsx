import { useState } from 'react';

interface DownloadButtonProps {
  srtContent: string;
  disabled: boolean;
}

export function DownloadButton({ srtContent, disabled }: DownloadButtonProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  function handleDownload(): void {
    const blob = new Blob([srtContent], { type: 'text/srt;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.srt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy(): void {
    navigator.clipboard.writeText(srtContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownload}
        disabled={disabled}
        className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        Download .srt
      </button>
      <button
        onClick={handleCopy}
        disabled={disabled}
        className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-200 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
