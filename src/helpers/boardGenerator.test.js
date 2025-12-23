import { describe, it, expect } from 'vitest';
import {
  generateBoards,
  generateSingleBoard,
  sortColumnsWithinSections,
  getColumnForNumber,
  createColumnPools,
  splitPoolsBetweenBoards,
  shuffle,
  validateBoard,
  EMPTY,
  NUMBERS_PER_ROW,
  TOTAL_ROWS,
  TOTAL_COLS,
  TOTAL_NUMBERS
} from './boardGenerator.js';

describe('getColumnForNumber', () => {
  it('should return correct column for numbers 1-9', () => {
    for (let num = 1; num <= 9; num++) {
      expect(getColumnForNumber(num)).toBe(0);
    }
  });

  it('should return correct column for numbers 10-79', () => {
    for (let num = 10; num <= 79; num++) {
      expect(getColumnForNumber(num)).toBe(Math.floor(num / 10));
    }
  });

  it('should return column 8 for numbers 80-90', () => {
    for (let num = 80; num <= 90; num++) {
      expect(getColumnForNumber(num)).toBe(8);
    }
  });

  it('should return -1 for invalid numbers', () => {
    expect(getColumnForNumber(0)).toBe(-1);
    expect(getColumnForNumber(-1)).toBe(-1);
    expect(getColumnForNumber(91)).toBe(-1);
  });
});

describe('shuffle', () => {
  it('should return array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).length).toBe(arr.length);
  });

  it('should contain all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    arr.forEach(num => expect(shuffled).toContain(num));
  });

  it('should not modify original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffle(arr);
    expect(arr).toEqual(original);
  });
});

describe('createColumnPools', () => {
  it('should create 9 pools', () => {
    const pools = createColumnPools();
    expect(pools.length).toBe(TOTAL_COLS);
  });

  it('should have correct number of elements per pool', () => {
    const pools = createColumnPools();
    expect(pools[0].length).toBe(9);  // 1-9
    for (let i = 1; i <= 7; i++) {
      expect(pools[i].length).toBe(10); // 10-19, 20-29, ..., 70-79
    }
    expect(pools[8].length).toBe(11); // 80-90
  });

  it('should contain all numbers 1-90', () => {
    const pools = createColumnPools();
    const allNumbers = pools.flat().sort((a, b) => a - b);
    expect(allNumbers.length).toBe(TOTAL_NUMBERS);
    for (let i = 1; i <= TOTAL_NUMBERS; i++) {
      expect(allNumbers[i - 1]).toBe(i);
    }
  });
});

describe('splitPoolsBetweenBoards', () => {
  it('should split pools into two boards', () => {
    const pools = createColumnPools();
    const { board1Pools, board2Pools } = splitPoolsBetweenBoards(pools);

    expect(board1Pools.length).toBe(TOTAL_COLS);
    expect(board2Pools.length).toBe(TOTAL_COLS);
  });

  it('should give each board 45 numbers total', () => {
    const pools = createColumnPools();
    const { board1Pools, board2Pools } = splitPoolsBetweenBoards(pools);

    const board1Total = board1Pools.reduce((sum, pool) => sum + pool.length, 0);
    const board2Total = board2Pools.reduce((sum, pool) => sum + pool.length, 0);

    expect(board1Total).toBe(45);
    expect(board2Total).toBe(45);
  });

  it('should not have duplicate numbers between boards', () => {
    const pools = createColumnPools();
    const { board1Pools, board2Pools } = splitPoolsBetweenBoards(pools);

    const board1Numbers = new Set(board1Pools.flat());
    const board2Numbers = new Set(board2Pools.flat());

    board1Numbers.forEach(num => {
      expect(board2Numbers.has(num)).toBe(false);
    });
  });
});

describe('generateSingleBoard', () => {
  const pools = createColumnPools();
  const { board1Pools } = splitPoolsBetweenBoards(pools);

  it('should create a 9x9 board', () => {
    const board = generateSingleBoard(board1Pools);
    expect(board.length).toBe(TOTAL_ROWS);
    board.forEach(row => expect(row.length).toBe(TOTAL_COLS));
  });

  it('should have exactly 5 numbers per row', () => {
    const board = generateSingleBoard(board1Pools);
    board.forEach(row => {
      const numberCount = row.filter(cell => cell.num !== EMPTY).length;
      expect(numberCount).toBe(NUMBERS_PER_ROW);
    });
  });

  it('should attempt to avoid 4+ consecutive blanks (best effort)', () => {
    // This test verifies the function tries to avoid consecutive blanks
    // The hard guarantee is at generateBoards level with retries
    let successCount = 0;
    const trials = 10;

    for (let i = 0; i < trials; i++) {
      const freshPools = createColumnPools();
      const { board1Pools: testPools } = splitPoolsBetweenBoards(freshPools);
      const board = generateSingleBoard(testPools);

      let hasIssue = false;
      board.forEach(row => {
        let consecutive = 0;
        row.forEach(cell => {
          if (cell.num === EMPTY) {
            consecutive++;
            if (consecutive > 3) hasIssue = true;
          } else {
            consecutive = 0;
          }
        });
      });

      if (!hasIssue) successCount++;
    }

    // Should succeed most of the time (at least 70%)
    expect(successCount).toBeGreaterThanOrEqual(Math.floor(trials * 0.7));
  });

  it('should place numbers in correct columns', () => {
    const board = generateSingleBoard(board1Pools);
    board.forEach(row => {
      row.forEach((cell, colIdx) => {
        if (cell.num !== EMPTY) {
          expect(getColumnForNumber(cell.num)).toBe(colIdx);
        }
      });
    });
  });
});

describe('sortColumnsWithinSections', () => {
  it('should sort numbers ascending within each column', () => {
    const pools = createColumnPools();
    const { board1Pools } = splitPoolsBetweenBoards(pools);
    let board = generateSingleBoard(board1Pools);
    board = sortColumnsWithinSections(board);

    for (let col = 0; col < TOTAL_COLS; col++) {
      const numbersInCol = [];
      for (let row = 0; row < TOTAL_ROWS; row++) {
        if (board[row][col].num !== EMPTY) {
          numbersInCol.push(board[row][col].num);
        }
      }

      // Check numbers are sorted ascending
      for (let i = 1; i < numbersInCol.length; i++) {
        expect(numbersInCol[i]).toBeGreaterThan(numbersInCol[i - 1]);
      }
    }
  });
});

describe('validateBoard', () => {
  it('should return true for valid board', () => {
    const pools = createColumnPools();
    const { board1Pools } = splitPoolsBetweenBoards(pools);
    const board = generateSingleBoard(board1Pools);
    expect(validateBoard(board)).toBe(true);
  });

  it('should return false for invalid board', () => {
    const invalidBoard = Array.from({ length: TOTAL_ROWS }, () =>
      Array.from({ length: TOTAL_COLS }, () => ({ num: EMPTY, tick: false }))
    );
    expect(validateBoard(invalidBoard)).toBe(false);
  });
});

describe('generateBoards', () => {
  it('should generate two valid boards', () => {
    const { board1, board2, isValid } = generateBoards();
    expect(isValid).toBe(true);
    expect(validateBoard(board1)).toBe(true);
    expect(validateBoard(board2)).toBe(true);
  });

  it('should use all 90 numbers across both boards', () => {
    const { board1, board2 } = generateBoards();
    const allNumbers = new Set();

    [board1, board2].forEach(board => {
      board.forEach(row => {
        row.forEach(cell => {
          if (cell.num !== EMPTY) {
            allNumbers.add(cell.num);
          }
        });
      });
    });

    expect(allNumbers.size).toBe(TOTAL_NUMBERS);
  });

  it('should not have duplicate numbers between boards', () => {
    const { board1, board2 } = generateBoards();
    const board1Numbers = new Set();
    const board2Numbers = new Set();

    board1.forEach(row => {
      row.forEach(cell => {
        if (cell.num !== EMPTY) board1Numbers.add(cell.num);
      });
    });

    board2.forEach(row => {
      row.forEach(cell => {
        if (cell.num !== EMPTY) board2Numbers.add(cell.num);
      });
    });

    board1Numbers.forEach(num => {
      expect(board2Numbers.has(num)).toBe(false);
    });
  });

  it('should have columns sorted ascending', () => {
    const { board1, board2 } = generateBoards();

    [board1, board2].forEach(board => {
      for (let col = 0; col < TOTAL_COLS; col++) {
        const nums = [];
        for (let row = 0; row < TOTAL_ROWS; row++) {
          if (board[row][col].num !== EMPTY) {
            nums.push(board[row][col].num);
          }
        }
        for (let i = 1; i < nums.length; i++) {
          expect(nums[i]).toBeGreaterThan(nums[i - 1]);
        }
      }
    });
  });

  it('should not have 4+ consecutive blanks in any row', () => {
    for (let test = 0; test < 10; test++) {
      const { board1, board2 } = generateBoards();

      [board1, board2].forEach(board => {
        board.forEach(row => {
          let consecutive = 0;
          row.forEach(cell => {
            if (cell.num === EMPTY) {
              consecutive++;
              expect(consecutive).toBeLessThanOrEqual(3);
            } else {
              consecutive = 0;
            }
          });
        });
      });
    }
  });
});
