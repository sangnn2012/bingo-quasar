/**
 * Vietnamese Lô Tô Board Generator
 *
 * Rules:
 * - 90 numbers (1-90) split between 2 boards (45 each)
 * - Each board: 9 rows × 9 columns
 * - Each row: exactly 5 numbers, 4 empty cells
 * - Numbers placed by column based on tens digit:
 *   - Column 0: 1-9    (9 numbers)
 *   - Column 1: 10-19  (10 numbers)
 *   - Column 2: 20-29  (10 numbers)
 *   - ...
 *   - Column 7: 70-79  (10 numbers)
 *   - Column 8: 80-90  (11 numbers)
 */

// Constants
export const EMPTY = -1;
export const NUMBERS_PER_ROW = 5;
export const TOTAL_ROWS = 9;
export const TOTAL_COLS = 9;
export const TOTAL_NUMBERS = 90;

/**
 * Get the column index for a given number (0-8)
 * @param {number} num - Number between 1-90
 * @returns {number} Column index (0-8)
 */
export function getColumnForNumber(num) {
  if (num <= 0 || num > TOTAL_NUMBERS) return -1;
  if (num <= 9) return 0;
  if (num >= 80) return 8; // 80-90 all go to column 8
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
 * Distribution ensures each board gets 45 numbers:
 * - Board1: [5,5,5,5,5,5,5,5,5] = 45
 * - Board2: [4,5,5,5,5,5,5,5,6] = 45
 *
 * @param {Array<Array<number>>} pools - Column pools (9 arrays)
 * @returns {{ board1Pools: Array, board2Pools: Array }}
 */
export function splitPoolsBetweenBoards(pools) {
  const board1Pools = [];
  const board2Pools = [];

  pools.forEach((pool, colIndex) => {
    const shuffled = shuffle(pool);

    if (colIndex === 0) {
      // Column 0 has 9 numbers: 5 to board1, 4 to board2
      board1Pools.push(shuffled.slice(0, 5));
      board2Pools.push(shuffled.slice(5));
    } else if (colIndex === 8) {
      // Column 8 has 11 numbers: 5 to board1, 6 to board2
      board1Pools.push(shuffled.slice(0, 5));
      board2Pools.push(shuffled.slice(5));
    } else {
      // Columns 1-7 have 10 numbers: 5 to each
      board1Pools.push(shuffled.slice(0, 5));
      board2Pools.push(shuffled.slice(5));
    }
  });

  return { board1Pools, board2Pools };
}

/**
 * Check if a selection of columns results in 4+ consecutive blank cells
 * @param {Array<number>} selected - Selected column indices
 * @param {number} maxConsecutive - Maximum allowed consecutive blanks (default 3)
 * @returns {boolean} True if there are too many consecutive blanks
 */
function hasConsecutiveBlanks(selected, maxConsecutive = 3) {
  const filled = new Set(selected);
  let consecutive = 0;

  for (let col = 0; col < TOTAL_COLS; col++) {
    if (!filled.has(col)) {
      consecutive++;
      if (consecutive > maxConsecutive) {
        return true;
      }
    } else {
      consecutive = 0;
    }
  }
  return false;
}

/**
 * Generate a single board from column pools with randomized blank positions
 *
 * Algorithm:
 * 1. For each row, determine which columns MUST be used (remaining >= rowsLeft)
 * 2. Randomly select from remaining available columns
 * 3. Ensure no 4+ consecutive blank cells in any row
 * 4. Place one number from each selected column
 *
 * @param {Array<Array<number>>} columnPools - Numbers available per column
 * @returns {Array<Array<{num: number, tick: boolean}>>} 9x9 board
 */
export function generateSingleBoard(columnPools) {
  // Create working copy of pools
  const pools = columnPools.map(pool => [...pool]);
  const remaining = pools.map(pool => pool.length);

  // Initialize empty board
  const board = Array.from({ length: TOTAL_ROWS }, () =>
    Array.from({ length: TOTAL_COLS }, () => ({ num: EMPTY, tick: false }))
  );

  for (let row = 0; row < TOTAL_ROWS; row++) {
    const rowsLeft = TOTAL_ROWS - row;

    // Categorize columns
    const mustPick = []; // Columns that MUST be used (remaining >= rowsLeft)
    const canPick = [];  // Columns that CAN be used (remaining > 0)

    for (let col = 0; col < TOTAL_COLS; col++) {
      if (remaining[col] >= rowsLeft) {
        mustPick.push(col);
      } else if (remaining[col] > 0) {
        canPick.push(col);
      }
    }

    // Start with must-pick columns
    let selected = [...mustPick];

    // Shuffle canPick for randomization
    const shuffledCanPick = shuffle(canPick);

    // Try to find a selection that avoids 4+ consecutive blanks
    const maxAttempts = 10;
    let bestSelection = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const trySelected = [...mustPick];
      const tryCanPick = attempt === 0 ? shuffledCanPick : shuffle(canPick);

      // Fill up to NUMBERS_PER_ROW
      let canPickIndex = 0;
      while (trySelected.length < NUMBERS_PER_ROW && canPickIndex < tryCanPick.length) {
        trySelected.push(tryCanPick[canPickIndex]);
        canPickIndex++;
      }

      // Check if this selection avoids consecutive blanks
      if (!hasConsecutiveBlanks(trySelected)) {
        bestSelection = trySelected;
        break;
      }

      // Keep first attempt as fallback
      if (attempt === 0) {
        bestSelection = trySelected;
      }
    }

    selected = bestSelection;

    // Place numbers in selected columns
    for (const col of selected) {
      const num = pools[col].pop();
      board[row][col] = { num, tick: false };
      remaining[col]--;
    }
  }

  return board;
}

/**
 * Sort numbers within each column across the entire board (ascending top to bottom)
 * This is a traditional Lô Tô requirement for readability
 * @param {Array<Array<{num: number, tick: boolean}>>} board - Board to sort
 * @returns {Array<Array<{num: number, tick: boolean}>>} Sorted board
 */
export function sortColumnsWithinSections(board) {
  // For each column across the entire board
  for (let col = 0; col < TOTAL_COLS; col++) {
    // Collect all numbers and their row positions in this column
    const numbersInColumn = [];
    for (let row = 0; row < TOTAL_ROWS; row++) {
      if (board[row][col].num !== EMPTY) {
        numbersInColumn.push({
          num: board[row][col].num,
          row: row
        });
      }
    }

    // Sort numbers ascending
    numbersInColumn.sort((a, b) => a.num - b.num);

    // Get the row positions (sorted by row index)
    const rowPositions = numbersInColumn.map(item => item.row).sort((a, b) => a - b);

    // Place sorted numbers back into sorted row positions
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
 * Generate both Lô Tô boards
 * @returns {{ board1: Array, board2: Array, isValid: boolean }}
 */
export function generateBoards() {
  // Step 1: Create column pools and shuffle
  const pools = createColumnPools().map(pool => shuffle(pool));

  // Step 2: Split pools between boards
  const { board1Pools, board2Pools } = splitPoolsBetweenBoards(pools);

  // Step 3: Generate each board
  let board1 = generateSingleBoard(board1Pools);
  let board2 = generateSingleBoard(board2Pools);

  // Step 4: Sort numbers within columns (ascending top to bottom in each 3-row section)
  board1 = sortColumnsWithinSections(board1);
  board2 = sortColumnsWithinSections(board2);

  // Step 5: Validate
  const isValid = validateBoard(board1) && validateBoard(board2);

  return { board1, board2, isValid };
}
