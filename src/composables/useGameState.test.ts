import { describe, it, expect, vi } from 'vitest';
import { useGameState } from './useGameState';
import { EMPTY } from 'src/helpers/boardGenerator';

// Mock onMounted to prevent it from running in tests
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    onMounted: vi.fn((fn) => fn()), // Execute immediately for testing
  };
});

describe('useGameState', () => {
  it('initializes both boards on mount', () => {
    const { board1, board2 } = useGameState();

    expect(board1.value.length).toBe(9);
    expect(board2.value.length).toBe(9);
  });

  it('boards have 9 columns each', () => {
    const { board1, board2 } = useGameState();

    board1.value.forEach((row) => expect(row.length).toBe(9));
    board2.value.forEach((row) => expect(row.length).toBe(9));
  });

  it('each row has exactly 5 numbers', () => {
    const { board1, board2 } = useGameState();

    [board1.value, board2.value].forEach((board) => {
      board.forEach((row) => {
        const numberCount = row.filter((cell) => cell.num !== EMPTY).length;
        expect(numberCount).toBe(5);
      });
    });
  });

  it('toggleTile flips the tick state', () => {
    const { board1, toggleTile } = useGameState();

    // Find a cell with a number
    let testRow = -1;
    let testCol = -1;
    for (let r = 0; r < 9 && testRow === -1; r++) {
      for (let c = 0; c < 9; c++) {
        if (board1.value[r][c].num !== EMPTY) {
          testRow = r;
          testCol = c;
          break;
        }
      }
    }

    expect(testRow).toBeGreaterThan(-1);
    const initialTick = board1.value[testRow][testCol].tick;

    toggleTile(board1.value, testRow, testCol);
    expect(board1.value[testRow][testCol].tick).toBe(!initialTick);

    toggleTile(board1.value, testRow, testCol);
    expect(board1.value[testRow][testCol].tick).toBe(initialTick);
  });

  it('initializeBoards can regenerate boards', () => {
    const { board1, board2, initializeBoards } = useGameState();

    // Regenerate boards
    initializeBoards();

    // Boards should be valid (may or may not be different due to randomization)
    expect(board1.value.length).toBe(9);
    expect(board2.value.length).toBe(9);

    // Each board should have 45 numbers total
    const countNumbers = (board: typeof board1.value) =>
      board.flat().filter((cell) => cell.num !== EMPTY).length;

    expect(countNumbers(board1.value)).toBe(45);
    expect(countNumbers(board2.value)).toBe(45);
  });

  it('all cells start with tick = false', () => {
    const { board1, board2 } = useGameState();

    [board1.value, board2.value].forEach((board) => {
      board.forEach((row) => {
        row.forEach((cell) => {
          expect(cell.tick).toBe(false);
        });
      });
    });
  });
});
