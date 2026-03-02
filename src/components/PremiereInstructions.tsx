export function PremiereInstructions(): React.JSX.Element {
  return (
    <details className="group border border-slate-700 rounded-lg">
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-300 hover:text-slate-100 select-none">
        How to Import into Premiere Pro
      </summary>
      <div className="px-4 pb-4 text-sm text-slate-400 space-y-4">
        <section>
          <h3 className="text-slate-300 font-medium mb-1">
            Method 1 — Text Panel (recommended)
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Download/save the .srt file</li>
            <li>Open your sequence in Premiere Pro</li>
            <li>
              Open the <strong className="text-slate-300">Text</strong> panel
              (Window &gt; Text)
            </li>
            <li>
              Click{' '}
              <strong className="text-slate-300">
                "Import captions from file"
              </strong>
              , select your .srt file
            </li>
            <li>
              A Caption Track dialog appears — choose your start point:
              <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                <li>
                  <strong className="text-slate-300">Source Timecode</strong> —
                  uses timecodes from the .srt file
                </li>
                <li>
                  <strong className="text-slate-300">Playhead Position</strong>{' '}
                  — starts subtitles at current playhead
                </li>
                <li>
                  <strong className="text-slate-300">Timeline Start</strong> —
                  starts subtitles at beginning of sequence
                </li>
              </ul>
            </li>
            <li>
              Click OK — captions appear on their own dedicated caption track
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-slate-300 font-medium mb-1">
            Method 2 — Drag and Drop
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Drag the .srt file into the{' '}
              <strong className="text-slate-300">Project</strong> panel (or File
              &gt; Import)
            </li>
            <li>
              Drag the imported caption asset from the Project panel onto your
              timeline
            </li>
            <li>Same Caption Track dialog appears for start point selection</li>
          </ol>
        </section>

        <section>
          <h3 className="text-slate-300 font-medium mb-1">
            Styling subtitles
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Open{' '}
              <strong className="text-slate-300">Properties</strong> panel
              (Window &gt; Properties) or{' '}
              <strong className="text-slate-300">Essential Graphics</strong>{' '}
              panel
            </li>
            <li>
              Select caption entries on the timeline to modify font, size,
              alignment, background color
            </li>
            <li>
              Save formatting as a preset via{' '}
              <strong className="text-slate-300">
                Track Style &gt; Create Style
              </strong>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-slate-300 font-medium mb-1">
            Enabling caption display
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Click the <strong className="text-slate-300">wrench icon</strong>{' '}
              on the Program Monitor toolbar
            </li>
            <li>
              Enable{' '}
              <strong className="text-slate-300">
                Closed Captions Display
              </strong>{' '}
              to see subtitles in preview
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-slate-300 font-medium mb-1">Troubleshooting</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              .srt not in import dialog? Set file filter to "All Supported
              Files"
            </li>
            <li>
              Captions not visible? Enable Closed Captions Display (wrench icon)
            </li>
            <li>
              Garbled characters? Ensure file is UTF-8 (gimmesubs always outputs
              UTF-8)
            </li>
            <li>
              Match your sequence start timecode with the start TC you set here
            </li>
          </ul>
        </section>
      </div>
    </details>
  );
}
