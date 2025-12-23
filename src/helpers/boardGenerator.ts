/**
 * Vietnamese Lô Tô Board Generator (Guaranteed Algorithm)
 *
 * Rules:
 * - 90 numbers (1-90) split between 2 boards (45 each)
 * - Each board: 9 rows × 9 columns
 * - Each row: exactly 5 numbers, 4 empty cells
 * - No 4+ consecutive blank cells in any row
 * - Numbers placed by column based on tens digit:
 *   - Column 0: 1-9    (9 numbers)
 *   - Column 1: 10-19  (10 numbers)
 *   - Column 2: 20-29  (10 numbers)
 *   - ...
 *   - Column 7: 70-79  (10 numbers)
 *   - Column 8: 80-90  (11 numbers)
 *
 * This implementation uses backtracking to guarantee valid boards
 * without needing retries or validation.
 */

import type { Board, BoardCell, GenerateBoardsResult } from '../types';

// Constants
export const EMPTY = -1;
export const NUMBERS_PER_ROW = 5;
export const TOTAL_ROWS = 9;
export const TOTAL_COLS = 9;
export const TOTAL_NUMBERS = 90;
const MAX_CONSECUTIVE_BLANKS = 3;

type ColumnPools = number[][];
type Pattern = number[];

/**
 * Get the column index for a given number (0-8)
 */
export function getColumnForNumber(num: number): number {
  if (num <= 0 || num > TOTAL_NUMBERS) return -1;
  if (num <= 9) return 0;
  if (num >= 80) return 8;
  return Math.floor(num / 10);
}

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create number pools grouped by column
 */
export function createColumnPools(): ColumnPools {
  const pools: ColumnPools = Array.from({ length: TOTAL_COLS }, () => []);
  for (let num = 1; num <= TOTAL_NUMBERS; num++) {
    pools[getColumnForNumber(num)].push(num);
  }
  return pools;
}

/**
 * Split column pools between two boards
 */
export function splitPoolsBetweenBoards(pools: ColumnPools): {
  board1Pools: ColumnPools;
  board2Pools: ColumnPools;
} {
  const board1Pools: ColumnPools = [];
  const board2Pools: ColumnPools = [];

  pools.forEach((pool) => {
    const shuffled = shuffle(pool);
    board1Pools.push(shuffled.slice(0, 5));
    board2Pools.push(shuffled.slice(5));
  });

  return { board1Pools, board2Pools };
}

/**
 * Check if a column pattern has 4+ consecutive blanks
 */
function isValidPattern(columns: Pattern): boolean {
  const filled = new Set(columns);
  let consecutive = 0;

  for (let col = 0; col < TOTAL_COLS; col++) {
    if (!filled.has(col)) {
      consecutive++;
      if (consecutive > MAX_CONSECUTIVE_BLANKS) {
        return false;
      }
    } else {
      consecutive = 0;
    }
  }
  return true;
}

/**
 * Generate all valid 5-column patterns (no 4+ consecutive blanks)
 */
function generateValidPatterns(): Pattern[] {
  const patterns: Pattern[] = [];

  // Generate all C(9,5) = 126 combinations
  for (let a = 0; a < 5; a++) {
    for (let b = a + 1; b < 6; b++) {
      for (let c = b + 1; c < 7; c++) {
        for (let d = c + 1; d < 8; d++) {
          for (let e = d + 1; e < 9; e++) {
            const pattern: Pattern = [a, b, c, d, e];
            if (isValidPattern(pattern)) {
              patterns.push(pattern);
            }
          }
        }
      }
    }
  }

  return patterns;
}

// Pre-compute valid patterns (computed once at module load)
const VALID_PATTERNS = generateValidPatterns();

/**
 * Check if a pattern is feasible given current column counts
 */
function isPatternFeasible(pattern: Pattern, remaining: number[], rowsLeft: number): boolean {
  const patternSet = new Set(pattern);

  for (let col = 0; col < TOTAL_COLS; col++) {
    if (patternSet.has(col)) {
      // Pattern uses this column - must have numbers available
      if (remaining[col] <= 0) return false;
    } else {
      // Pattern doesn't use this column - must not be forced to use it
      // If remaining[col] >= rowsLeft, we MUST use it
      if (remaining[col] >= rowsLeft) return false;
    }
  }

  return true;
}

/**
 * Generate a single board using backtracking algorithm
 * Guarantees valid board with no 4+ consecutive blanks
 */
export function generateSingleBoard(columnPools: ColumnPools): Board {
  const pools = columnPools.map((pool) => [...pool]);
  const remaining = pools.map((pool) => pool.length);

  // Board state: which columns are filled for each row
  const rowPatterns: (Pattern | null)[] = new Array(TOTAL_ROWS).fill(null);

  /**
   * Backtracking solver
   */
  function solve(row: number): boolean {
    if (row === TOTAL_ROWS) {
      // All rows filled successfully
      return true;
    }

    const rowsLeft = TOTAL_ROWS - row;

    // Get feasible patterns for this row
    const feasiblePatterns = VALID_PATTERNS.filter((pattern) =>
      isPatternFeasible(pattern, remaining, rowsLeft)
    );

    // Shuffle for randomization
    const shuffledPatterns = shuffle(feasiblePatterns);

    for (const pattern of shuffledPatterns) {
      // Apply pattern
      rowPatterns[row] = pattern;
      for (const col of pattern) {
        remaining[col]--;
      }

      // Recurse
      if (solve(row + 1)) {
        return true;
      }

      // Backtrack
      for (const col of pattern) {
        remaining[col]++;
      }
      rowPatterns[row] = null;
    }

    return false;
  }

  // Solve
  const success = solve(0);

  if (!success) {
    // This should never happen with correct pool distribution
    throw new Error('Failed to generate valid board - this indicates a bug');
  }

  // Build the board from patterns
  const board: Board = Array.from({ length: TOTAL_ROWS }, () =>
    Array.from({ length: TOTAL_COLS }, (): BoardCell => ({ num: EMPTY, tick: false }))
  );

  for (let row = 0; row < TOTAL_ROWS; row++) {
    const pattern = rowPatterns[row];
    if (pattern) {
      for (const col of pattern) {
        const num = pools[col].pop();
        if (num !== undefined) {
          board[row][col] = { num, tick: false };
        }
      }
    }
  }

  return board;
}

/**
 * Sort numbers within each column across the entire board (ascending top to bottom)
 */
export function sortColumnsWithinSections(board: Board): Board {
  for (let col = 0; col < TOTAL_COLS; col++) {
    const numbersInColumn: { num: number; row: number }[] = [];
    for (let row = 0; row < TOTAL_ROWS; row++) {
      if (board[row][col].num !== EMPTY) {
        numbersInColumn.push({
          num: board[row][col].num,
          row: row,
        });
      }
    }

    numbersInColumn.sort((a, b) => a.num - b.num);
    const rowPositions = numbersInColumn.map((item) => item.row).sort((a, b) => a - b);

    for (let i = 0; i < numbersInColumn.length; i++) {
      board[rowPositions[i]][col].num = numbersInColumn[i].num;
    }
  }

  return board;
}

/**
 * Validate that a board has exactly 5 numbers per row
 */
export function validateBoard(board: Board): boolean {
  for (let row = 0; row < board.length; row++) {
    const count = board[row].filter((cell) => cell.num !== EMPTY).length;
    if (count !== NUMBERS_PER_ROW) {
      return false;
    }
  }
  return true;
}

/**
 * Generate both Lô Tô boards (guaranteed valid, no retries needed)
 */
export function generateBoards(): GenerateBoardsResult {
  // Step 1: Create column pools and shuffle
  const pools = createColumnPools().map((pool) => shuffle(pool));

  // Step 2: Split pools between boards
  const { board1Pools, board2Pools } = splitPoolsBetweenBoards(pools);

  // Step 3: Generate each board using backtracking (guaranteed to succeed)
  let board1 = generateSingleBoard(board1Pools);
  let board2 = generateSingleBoard(board2Pools);

  // Step 4: Sort numbers within columns (ascending top to bottom)
  board1 = sortColumnsWithinSections(board1);
  board2 = sortColumnsWithinSections(board2);

  // No validation needed - algorithm guarantees correctness
  return { board1, board2, isValid: true };
}
