import { Board, Player } from './types';
import { GameEngine } from './game-logic';

export class AIPlayer {
  /**
   * Get the best move for the AI using minimax algorithm
   */
  static getBestMove(
    board: Board,
    aiPlayer: Player,
    difficulty: 'easy' | 'medium' | 'hard' = 'hard'
  ): number {
    const availableMoves = GameEngine.getAvailableMoves(board);

    if (availableMoves.length === 0) {
      return -1;
    }

    if (difficulty === 'easy') {
      return this.getRandomMove(availableMoves);
    }

    if (difficulty === 'medium') {
      if (Math.random() < 0.5) {
        return this.getRandomMove(availableMoves);
      }
    }

    const opponent = aiPlayer === 'X' ? 'O' : 'X';
    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = aiPlayer;
      const score = this.minimax(
        newBoard,
        0,
        false,
        aiPlayer,
        opponent,
        -Infinity,
        Infinity
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  /**
   * Get a random move from available moves
   */
  private static getRandomMove(availableMoves: number[]): number {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  /**
   * Minimax algorithm with alpha-beta pruning
   */
  private static minimax(
    board: Board,
    depth: number,
    isMaximizing: boolean,
    aiPlayer: Player,
    humanPlayer: Player,
    alpha: number,
    beta: number
  ): number {
    const winner = GameEngine.checkWinner(board);

    // Terminal states
    if (winner === aiPlayer) return 10 - depth;
    if (winner === humanPlayer) return depth - 10;
    if (GameEngine.isBoardFull(board)) return 0;

    const availableMoves = GameEngine.getAvailableMoves(board);

    if (isMaximizing) {
      let maxScore = -Infinity;

      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = aiPlayer;
        const score = this.minimax(
          newBoard,
          depth + 1,
          false,
          aiPlayer,
          humanPlayer,
          alpha,
          beta
        );
        maxScore = Math.max(score, maxScore);
        alpha = Math.max(alpha, score);

        if (beta <= alpha) {
          break; // Alpha-beta pruning
        }
      }

      return maxScore;
    } else {
      let minScore = Infinity;

      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = humanPlayer;
        const score = this.minimax(
          newBoard,
          depth + 1,
          true,
          aiPlayer,
          humanPlayer,
          alpha,
          beta
        );
        minScore = Math.min(score, minScore);
        beta = Math.min(beta, score);

        if (beta <= alpha) {
          break; // Alpha-beta pruning
        }
      }

      return minScore;
    }
  }

  /**
   * Make a strategic first move
   */
  static getOpeningMove(board: Board): number {
    const availableMoves = GameEngine.getAvailableMoves(board);

    // If board is empty, take center or corner
    if (availableMoves.length === 9) {
      const preferredMoves = [4, 0, 2, 6, 8]; // Center, then corners
      return preferredMoves[Math.floor(Math.random() * 2)]; // Center or random corner
    }

    // If center is available, take it
    if (board[4] === null) {
      return 4;
    }

    // Otherwise, take a corner
    const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Fallback to any available move
    return availableMoves[0];
  }
}
