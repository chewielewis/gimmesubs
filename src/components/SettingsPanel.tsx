import type { Settings } from '../types/index.ts';
import { FPS_OPTIONS } from '../lib/defaults.ts';
import { validateTimecode } from '../lib/timecode.ts';

interface SettingsPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps): React.JSX.Element {
  const timecodeError = validateTimecode(settings.startTimecode, settings.fps);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-slate-300">Settings</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="fps" className="text-xs text-slate-400">
          FPS
        </label>
        <select
          id="fps"
          value={settings.fps}
          onChange={(e) => onChange({ ...settings, fps: Number(e.target.value) })}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {FPS_OPTIONS.map((fps) => (
            <option key={fps} value={fps}>
              {fps}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="start-tc" className="text-xs text-slate-400">
          Start Timecode (HH:MM:SS:FF)
        </label>
        <input
          id="start-tc"
          type="text"
          value={settings.startTimecode}
          onChange={(e) => onChange({ ...settings, startTimecode: e.target.value })}
          className={`bg-slate-800 text-slate-100 border rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            timecodeError ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {timecodeError && (
          <p className="text-xs text-red-400">{timecodeError}</p>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.autoDuration}
          onChange={(e) => onChange({ ...settings, autoDuration: e.target.checked })}
          className="accent-cyan-500 w-4 h-4"
        />
        <span className="text-xs text-slate-400">Auto duration (based on line length)</span>
      </label>

      {settings.autoDuration ? (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="cps" className="text-xs text-slate-400">
              Reading Speed (chars/sec)
            </label>
            <input
              id="cps"
              type="number"
              min={5}
              max={30}
              step={1}
              value={settings.charsPerSecond}
              onChange={(e) => onChange({ ...settings, charsPerSecond: Number(e.target.value) })}
              className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="min-duration" className="text-xs text-slate-400">
              Minimum Duration (sec)
            </label>
            <input
              id="min-duration"
              type="number"
              min={0.5}
              max={10}
              step={0.1}
              value={settings.minDuration}
              onChange={(e) => onChange({ ...settings, minDuration: Number(e.target.value) })}
              className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <label htmlFor="duration" className="text-xs text-slate-400">
            Title Duration (sec)
          </label>
          <input
            id="duration"
            type="number"
            min={0.1}
            max={30}
            step={0.1}
            value={settings.titleDuration}
            onChange={(e) => onChange({ ...settings, titleDuration: Number(e.target.value) })}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="gap" className="text-xs text-slate-400">
          Gap Between Titles (sec)
        </label>
        <input
          id="gap"
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={settings.gapDuration}
          onChange={(e) => onChange({ ...settings, gapDuration: Number(e.target.value) })}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="max-line" className="text-xs text-slate-400">
          Max Line Length (chars)
        </label>
        <input
          id="max-line"
          type="number"
          min={10}
          max={80}
          step={1}
          value={settings.maxLineLength}
          onChange={(e) => onChange({ ...settings, maxLineLength: Number(e.target.value) })}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.ignoreBlankLines}
          onChange={(e) => onChange({ ...settings, ignoreBlankLines: e.target.checked })}
          className="accent-cyan-500 w-4 h-4"
        />
        <span className="text-xs text-slate-400">Ignore blank lines</span>
      </label>
    </div>
  );
}
