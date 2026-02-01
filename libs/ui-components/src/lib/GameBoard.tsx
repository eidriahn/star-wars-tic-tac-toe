import { component$, useSignal } from '@builder.io/qwik';
import { clsx } from 'clsx';
import type { Board, Player } from '@star-wars-tictactoe/game-engine';

interface GameBoardProps {
  board: Board;
  onCellClick$: (index: number) => void;
  winningCells?: number[] | null;
  disabled?: boolean;
  currentPlayer?: Player;
}

export const GameBoard = component$<GameBoardProps>(
  ({
    board,
    onCellClick$,
    winningCells,
    disabled = false,
    currentPlayer = 'X',
  }) => {
    const hoveredCell = useSignal<number | null>(null);

    return (
      <div class="relative w-full max-w-md mx-auto">
        <div class="game-board grid grid-cols-3 gap-3 p-5 bg-black/60 rounded-2xl backdrop-blur-lg border-2 border-yellow-500/40 shadow-2xl">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick$={() => {
                if (!disabled && !cell) {
                  onCellClick$(index % 9);
                }
              }}
              onMouseEnter$={() => {
                if (!disabled && !cell) {
                  hoveredCell.value = index;
                }
              }}
              onMouseLeave$={() => {
                hoveredCell.value = null;
              }}
              disabled={disabled || !!cell}
              class={clsx(
                'game-cell aspect-square rounded-xl transition-all duration-300',
                'flex items-center justify-center text-4xl font-bold',
                'border-2 bg-linear-to-br from-white/5 to-white/10 backdrop-blur-sm',
                'shadow-inner',
                {
                  'border-blue-400/60 hover:border-yellow-400 hover:scale-105 hover:bg-white/20 cursor-pointer':
                    !cell && !disabled,
                  'border-gray-600 cursor-not-allowed opacity-50': disabled,
                  'border-blue-400 bg-blue-900/20': cell === 'X',
                  'border-red-400 bg-red-900/20': cell === 'O',
                  'winning-cell': winningCells?.includes(index),
                }
              )}
              style={{
                boxShadow: winningCells?.includes(index)
                  ? '0 0 20px #ffd700, inset 0 0 15px rgba(255, 215, 0, 0.3)'
                  : cell
                  ? `inset 0 0 15px ${
                      cell === 'X'
                        ? 'rgba(79, 195, 247, 0.2)'
                        : 'rgba(255, 23, 68, 0.2)'
                    }`
                  : 'inset 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* Hover Preview */}
              {!cell && hoveredCell.value === index && !disabled && (
                <span
                  class={clsx(
                    'text-7xl font-bold font-mono opacity-30 animate-pulse',
                    {
                      'text-blue-400': currentPlayer === 'X',
                      'text-red-400': currentPlayer === 'O',
                    }
                  )}
                >
                  {currentPlayer}
                </span>
              )}

              {/* Actual Cell Content */}
              {cell && (
                <span
                  class={clsx(
                    'lightsaber-glow text-7xl font-bold font-mono transition-all duration-300 animate-[fadeIn_0.3s_ease-out]',
                    {
                      'text-blue-400': cell === 'X',
                      'text-red-400': cell === 'O',
                    }
                  )}
                  style={{
                    textShadow:
                      cell === 'X'
                        ? '0 0 10px #4FC3F7, 0 0 20px #4FC3F7, 0 0 30px #4FC3F7, 0 0 40px #0288D1'
                        : '0 0 10px #ff1744, 0 0 20px #ff1744, 0 0 30px #ff1744, 0 0 40px #b71c1c',
                  }}
                >
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
