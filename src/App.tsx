import { useState, useMemo } from 'react';
import type { Settings } from './types/index.ts';
import { DEFAULT_SETTINGS } from './lib/defaults.ts';
import { validateTimecode } from './lib/timecode.ts';
import { generateSrt } from './lib/srt.ts';
import { Header } from './components/Header.tsx';
import { TextInput } from './components/TextInput.tsx';
import { SettingsPanel } from './components/SettingsPanel.tsx';
import { Preview } from './components/Preview.tsx';
import { DownloadButton } from './components/DownloadButton.tsx';
import { ImportInstructions } from './components/PremiereInstructions.tsx';

export default function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const hasText = text.trim().length > 0;
  const hasValidTimecode = validateTimecode(settings.startTimecode, settings.fps) === null;

  const srtContent = useMemo(() => {
    if (!hasText || !hasValidTimecode) return '';
    return generateSrt(text, settings);
  }, [text, settings, hasText, hasValidTimecode]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TextInput value={text} onChange={setText} />
          </div>
          <div className="lg:col-span-2">
            <SettingsPanel settings={settings} onChange={setSettings} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <DownloadButton srtContent={srtContent} disabled={!hasText || !hasValidTimecode} />
          <Preview srtContent={srtContent} />
          <ImportInstructions />
        </div>
      </div>

      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>Created by <span className="text-slate-400">Tim Ellis</span></p>
        <p>Made for <span className="text-slate-400">7days</span></p>
        <p><a href="mailto:timandrewellis@gmail.com" className="text-slate-400 hover:text-cyan-400">timandrewellis@gmail.com</a></p>
      </footer>
    </div>
  );
}
