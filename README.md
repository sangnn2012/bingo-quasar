# Bingo Lô Tô

Vietnamese Lô Tô (Bingo) game built with Vue 3, Quasar Framework, and TypeScript.

## Features

- Generates two complementary bingo boards using all 90 numbers (1-90)
- Customizable tile colors and mark icons
- Responsive design for mobile and desktop
- Click tiles to mark called numbers

## Screenshots

The game generates valid Lô Tô boards with:

- 9 rows × 9 columns per board
- Exactly 5 numbers per row
- Numbers sorted ascending in each column

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Strict mode enabled
- **Quasar Framework** v2 - UI components
- **Vite** - Build tooling
- **Vitest** - Unit testing (46 tests)

## Project Structure

```
src/
├── components/
│   ├── SettingsDialog/   # Color/icon picker dialog
│   └── Tile/             # Individual bingo cell
├── composables/
│   ├── useGameState.ts   # Board state management
│   └── useUISettings.ts  # UI customization
├── helpers/
│   └── boardGenerator.ts # Board generation algorithm
└── pages/
    └── Index.vue         # Main game page
```

## Board Generation Algorithm

The algorithm uses backtracking to generate valid boards:

1. Numbers 1-90 are split between two boards (45 each)
2. Each column contains numbers from its decade (col 0: 1-9, col 1: 10-19, etc.)
3. Each row has exactly 5 numbers and 4 blanks
4. No row has 4+ consecutive blank cells
5. Numbers are sorted ascending within each column

## Development

```bash
npm run dev          # Start dev server
npm run lint         # Lint code
npm run lint:fix     # Fix lint issues
npm run format       # Format with Prettier
npm run test         # Run tests
npm run test:watch   # Watch mode
```

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features.

## License

MIT
