import { Board, Player, GameState } from './types';

// Winning combinations for tic-tac-toe
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

export class GameEngine {
  /**
   * Create an empty board
   */
  static createBoard(): Board {
    return Array(9).fill(null);
  }

  /**
   * Create initial game state
   */
  static createInitialState(): GameState {
    return {
      board: this.createBoard(),
      currentPlayer: 'X',
      winner: null,
      isGameOver: false,
      scores: {
        X: 0,
        O: 0,
        draws: 0,
      },
    };
  }

  /**
   * Make a move on the board
   */
  static makeMove(state: GameState, index: number): GameState | null {
    // Check if the move is valid
    if (state.board[index] !== null || state.isGameOver) {
      return null;
    }

    // Create new board with the move
    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    // Check for winner
    const winner = this.checkWinner(newBoard);
    console.log(`🚀 => winner:`, winner);
    const isDraw = !winner && this.isBoardFull(newBoard);
    const isGameOver = !!winner || isDraw;

    // Update scores
    const newScores = { ...state.scores };
    if (winner && winner !== null) {
      newScores[winner] = newScores[winner] + 1;
    } else if (isDraw) {
      newScores.draws = newScores.draws + 1;
    }

    return {
      board: newBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner || (isDraw ? 'draw' : null),
      isGameOver,
      scores: newScores,
    };
  }

  /**
   * Check if there's a winner
   */
  static checkWinner(board: Board): Player | null {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }
    return null;
  }

  /**
   * Check if the board is full
   */
  static isBoardFull(board: Board): boolean {
    return board.every((cell) => cell !== null);
  }

  /**
   * Get available moves
   */
  static getAvailableMoves(board: Board): number[] {
    return board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);
  }

  /**
   * Reset the game board while keeping scores
   */
  static resetGame(state: GameState): GameState {
    return {
      board: this.createBoard(),
      currentPlayer: 'X',
      winner: null,
      isGameOver: false,
      scores: state.scores,
    };
  }

  /**
   * Reset everything including scores
   */
  static resetAll(): GameState {
    return this.createInitialState();
  }

  /**
   * Get winning cells if there's a winner
   */
  static getWinningCells(board: Board): number[] | null {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combination;
      }
    }
    return null;
  }
}
