export interface BoardCell {
  num: number;
  tick: boolean;
}

export type Board = BoardCell[][];

export interface GenerateBoardsResult {
  board1: Board;
  board2: Board;
  isValid: boolean;
}
