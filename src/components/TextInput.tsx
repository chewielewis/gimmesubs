interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="text-input" className="text-sm font-medium text-slate-300">
        Paste your text
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Paste lyrics or subtitle text here...\n\nEach line becomes a subtitle.\nBlank lines add a pause."}
        className="w-full h-64 lg:h-96 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg p-4 font-mono text-sm resize-y placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        spellCheck={false}
      />
    </div>
  );
}
