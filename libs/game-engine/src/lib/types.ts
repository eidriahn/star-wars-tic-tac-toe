export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  isGameOver: boolean;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export interface GameMove {
  index: number;
  player: Player;
}

export interface PlayerInfo {
  id: string;
  name: string;
  avatar?: string;
  isAI?: boolean;
  symbol: Player;
}