import { useRef } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps): React.JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File): Promise<void> {
    const name = file.name.toLowerCase();

    if (name.endsWith('.txt')) {
      onChange(await file.text());
    } else if (name.endsWith('.docx')) {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.default.extractRawText({ arrayBuffer });
      onChange(result.value);
    } else if (name.endsWith('.doc')) {
      onChange('Error: .doc (legacy Word) is not supported. Please save as .docx or .txt first.');
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      e.target.value = '';
    }
  }

  function handleDrop(e: React.DragEvent): void {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="text-input" className="text-sm font-medium text-slate-300">
          Paste your text
        </label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
        >
          Upload .txt / .docx
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        placeholder={"Paste lyrics or subtitle text here...\n\nEach line becomes a subtitle.\nBlank lines add a pause.\n\nOr drag & drop a .txt / .docx file."}
        className="w-full h-64 lg:h-96 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg p-4 font-mono text-sm resize-y placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        spellCheck={false}
      />
    </div>
  );
}
