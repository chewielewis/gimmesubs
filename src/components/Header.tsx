export function Header(): React.JSX.Element {
  return (
    <header className="text-center py-6">
      <h1 className="text-3xl font-bold text-cyan-400 tracking-tight">
        gimmesubs
      </h1>
      <p className="text-slate-400 mt-1 text-sm">
        Plain text to SubRip (.srt) — paste, configure, download
      </p>
    </header>
  );
}
