# gimmesubs

Single-page static tool: paste plain text, configure timing, download .srt files for Premiere Pro.

## Tech Stack

- Vite 7 + React 19 + TypeScript (strict)
- Tailwind CSS v4 (dark theme, slate-900 bg)
- Vitest for unit tests
- pnpm package manager
- GitHub Pages deploy via Actions

## Architecture

- **No backend, no router, no state lib** — just `useState` + `useMemo`
- All state lives in `App.tsx`
- Core logic in `src/lib/` (pure functions, fully tested)
- Components in `src/components/` (presentational)

## Key Files

- `src/lib/timecode.ts` — SMPTE ↔ ms ↔ SRT timecode conversion
- `src/lib/textSplitter.ts` — Word-boundary line wrapping
- `src/lib/srt.ts` — SRT generation orchestrator
- `src/lib/defaults.ts` — Default settings values
- `src/types/index.ts` — Settings, Subtitle interfaces

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Type-check + build
- `pnpm test` — Run Vitest
- `pnpm test:watch` — Vitest in watch mode

## Conventions

- SRT output uses `\r\n` line endings for Premiere compatibility
- Start timecode is SMPTE format (HH:MM:SS:FF)
- Blank input lines = intentional pauses (gap added, no subtitle entry)
- Lines exceeding max length wrap at word boundaries
- UTF-8 Blob encoding for downloads

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml` → builds → deploys to GitHub Pages.
Vite base path is `/gimmesubs/`.
