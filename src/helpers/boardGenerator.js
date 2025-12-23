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

// Constants
export const EMPTY = -1;
export const NUMBERS_PER_ROW = 5;
export const TOTAL_ROWS = 9;
export const TOTAL_COLS = 9;
export const TOTAL_NUMBERS = 90;
const MAX_CONSECUTIVE_BLANKS = 3;

/**
 * Get the column index for a given number (0-8)
 * @param {number} num - Number between 1-90
 * @returns {number} Column index (0-8)
 */
export function getColumnForNumber(num) {
  if (num <= 0 || num > TOTAL_NUMBERS) return -1;
  if (num <= 9) return 0;
  if (num >= 80) return 8;
  return Math.floor(num / 10);
}

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create number pools grouped by column
 * @returns {Array<Array<number>>} Array of 9 arrays, each containing numbers for that column
 */
export function createColumnPools() {
  const pools = Array.from({ length: TOTAL_COLS }, () => []);
  for (let num = 1; num <= TOTAL_NUMBERS; num++) {
    pools[getColumnForNumber(num)].push(num);
  }
  return pools;
}

/**
 * Split column pools between two boards
 * @param {Array<Array<number>>} pools - Column pools (9 arrays)
 * @returns {{ board1Pools: Array, board2Pools: Array }}
 */
export function splitPoolsBetweenBoards(pools) {
  const board1Pools = [];
  const board2Pools = [];

  pools.forEach(pool => {
    const shuffled = shuffle(pool);
    board1Pools.push(shuffled.slice(0, 5));
    board2Pools.push(shuffled.slice(5));
  });

  return { board1Pools, board2Pools };
}

/**
 * Check if a column pattern has 4+ consecutive blanks
 * @param {Array<number>} columns - Selected column indices (length 5)
 * @returns {boolean} True if pattern is valid (no 4+ consecutive blanks)
 */
function isValidPattern(columns) {
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
 * @returns {Array<Array<number>>} Array of valid column patterns
 */
function generateValidPatterns() {
  const patterns = [];

  // Generate all C(9,5) = 126 combinations
  for (let a = 0; a < 5; a++) {
    for (let b = a + 1; b < 6; b++) {
      for (let c = b + 1; c < 7; c++) {
        for (let d = c + 1; d < 8; d++) {
          for (let e = d + 1; e < 9; e++) {
            const pattern = [a, b, c, d, e];
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
 * @param {Array<number>} pattern - Column pattern to check
 * @param {Array<number>} remaining - Remaining count per column
 * @param {number} rowsLeft - Rows remaining to fill
 * @returns {boolean} True if pattern is feasible
 */
function isPatternFeasible(pattern, remaining, rowsLeft) {
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
 *
 * @param {Array<Array<number>>} columnPools - Numbers available per column
 * @returns {Array<Array<{num: number, tick: boolean}>>} 9x9 board
 */
export function generateSingleBoard(columnPools) {
  const pools = columnPools.map(pool => [...pool]);
  const remaining = pools.map(pool => pool.length);

  // Board state: which columns are filled for each row
  const rowPatterns = new Array(TOTAL_ROWS).fill(null);

  /**
   * Backtracking solver
   * @param {number} row - Current row to fill
   * @returns {boolean} True if solution found
   */
  function solve(row) {
    if (row === TOTAL_ROWS) {
      // All rows filled successfully
      return true;
    }

    const rowsLeft = TOTAL_ROWS - row;

    // Get feasible patterns for this row
    const feasiblePatterns = VALID_PATTERNS.filter(pattern =>
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
  const board = Array.from({ length: TOTAL_ROWS }, () =>
    Array.from({ length: TOTAL_COLS }, () => ({ num: EMPTY, tick: false }))
  );

  for (let row = 0; row < TOTAL_ROWS; row++) {
    for (const col of rowPatterns[row]) {
      const num = pools[col].pop();
      board[row][col] = { num, tick: false };
    }
  }

  return board;
}

/**
 * Sort numbers within each column across the entire board (ascending top to bottom)
 * @param {Array<Array<{num: number, tick: boolean}>>} board - Board to sort
 * @returns {Array<Array<{num: number, tick: boolean}>>} Sorted board
 */
export function sortColumnsWithinSections(board) {
  for (let col = 0; col < TOTAL_COLS; col++) {
    const numbersInColumn = [];
    for (let row = 0; row < TOTAL_ROWS; row++) {
      if (board[row][col].num !== EMPTY) {
        numbersInColumn.push({
          num: board[row][col].num,
          row: row
        });
      }
    }

    numbersInColumn.sort((a, b) => a.num - b.num);
    const rowPositions = numbersInColumn.map(item => item.row).sort((a, b) => a - b);

    for (let i = 0; i < numbersInColumn.length; i++) {
      board[rowPositions[i]][col].num = numbersInColumn[i].num;
    }
  }

  return board;
}

/**
 * Validate that a board has exactly 5 numbers per row
 * @param {Array<Array<{num: number}>>} board - Board to validate
 * @returns {boolean} True if valid
 */
export function validateBoard(board) {
  for (let row = 0; row < board.length; row++) {
    const count = board[row].filter(cell => cell.num !== EMPTY).length;
    if (count !== NUMBERS_PER_ROW) {
      return false;
    }
  }
  return true;
}

/**
 * Generate both Lô Tô boards (guaranteed valid, no retries needed)
 * @returns {{ board1: Array, board2: Array, isValid: boolean }}
 */
export function generateBoards() {
  // Step 1: Create column pools and shuffle
  const pools = createColumnPools().map(pool => shuffle(pool));

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
