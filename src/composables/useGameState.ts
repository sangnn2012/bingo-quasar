import { ref, onMounted } from 'vue';
import { generateBoards } from 'src/helpers/boardGenerator';
import type { Board } from 'src/types';

/**
 * Composable for managing bingo game board state
 */
export function useGameState() {
  const board1 = ref<Board>([]);
  const board2 = ref<Board>([]);

  /**
   * Initialize both game boards using the deterministic algorithm
   */
  function initializeBoards(): void {
    const result = generateBoards();

    if (!result.isValid) {
      console.warn('Board generation produced invalid boards');
    }

    board1.value = result.board1;
    board2.value = result.board2;
  }

  /**
   * Toggle the tick state of a tile
   */
  function toggleTile(board: Board, rowIndex: number, cellIndex: number): void {
    board[rowIndex][cellIndex].tick = !board[rowIndex][cellIndex].tick;
  }

  onMounted(() => {
    initializeBoards();
  });

  return {
    board1,
    board2,
    initializeBoards,
    toggleTile,
  };
}
