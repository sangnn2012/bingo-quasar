# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese Lô Tô (Bingo) game built with Quasar Framework (Vue 3), Vite, and TypeScript. The game generates two complementary bingo boards that together use all 90 numbers (1-90).

## Commands

```bash
npm run dev          # Start dev server with hot reload (opens browser)
npm run build        # Type-check and production build to dist/spa
npm run lint         # Lint .ts, .js, .vue files
npm run lint:fix     # Lint and auto-fix issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Tech Stack

- **Vue 3** with Composition API (`<script setup lang="ts">`)
- **TypeScript** with strict mode
- **Quasar Framework** v2 (UI components)
- **Vite** for build tooling
- **Vitest** for testing
- **ESLint + Prettier** for linting/formatting
- **Husky + lint-staged** for pre-commit hooks

## Architecture

### Board Generation Algorithm (`src/helpers/boardGenerator.ts`)

The core algorithm generates valid Lô Tô boards using backtracking:

- **Board structure**: 9 rows × 9 columns, each row has exactly 5 numbers and 4 blanks
- **Column mapping**: Numbers map to columns by tens digit (1-9→col0, 10-19→col1, ..., 80-90→col8)
- **Per-board column distribution**:
  - Columns 1-7: exactly 5 numbers each
  - Columns 0 & 8: combined total of 10 numbers (either 4+6 or 5+5 to reach 45 total)
  - Both boards together use all 90 numbers exactly once
- **Constraint**: No row can have 4+ consecutive blank cells
- **Guaranteed valid**: Uses backtracking with pre-computed valid patterns (no retries needed)

Key exports:

- `generateBoards()` - Returns `{ board1, board2, isValid }` with complete game state
- `EMPTY = -1` - Sentinel value for blank cells

### Types (`src/types/index.ts`)

```typescript
interface BoardCell {
  num: number;
  tick: boolean;
}
type Board = BoardCell[][];
interface GenerateBoardsResult {
  board1: Board;
  board2: Board;
  isValid: boolean;
}
```

### Component Structure

```
src/
├── pages/Index.vue          # Main game page with color/icon picker dialog
├── components/
│   └── Tile/Index.vue       # Individual cell (handles display + click to mark)
├── helpers/
│   ├── boardGenerator.ts    # Board generation algorithm
│   └── boardGenerator.test.ts
├── types/
│   └── index.ts             # TypeScript type definitions
└── layouts/MainLayout.vue
```

### Game State

- `board1`, `board2`: 9×9 arrays of `BoardCell` objects
- `mainColor`: Background color for empty cells
- `mainIcon`: Material icon name for marked cells
- Clicking a numbered tile toggles its `tick` state
