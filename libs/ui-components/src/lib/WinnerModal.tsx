import { component$, type PropFunction } from '@builder.io/qwik';
import { clsx } from 'clsx';
import type { Player } from '@star-wars-tictactoe/game-engine';

interface WinnerModalProps {
  winner: Player | 'draw' | null;
  winnerName?: string;
  onPlayAgain$: PropFunction<() => void>;
  onResetAll$: PropFunction<() => void>;
}

export const WinnerModal = component$<WinnerModalProps>(
  ({ winner, winnerName, onPlayAgain$, onResetAll$ }) => {
    if (!winner) return null;

    const isDraw = winner === 'draw';

    return (
      <div class="fixed inset-0 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <div class="relative max-w-md w-full animate-[scale-in_0.3s_ease-out]">
          <div
            class={clsx(
              'bg-linear-to-br rounded-2xl p-8 text-center',
              'border-4 shadow-2xl',
              {
                'from-blue-900/90 to-blue-600/90 border-blue-400':
                  winner === 'X',
                'from-red-900/90 to-red-600/90 border-red-400': winner === 'O',
                'from-gray-900/90 to-gray-600/90 border-gray-400': isDraw,
              }
            )}
          >
            {/* Title */}
            <h2 class="text-4xl font-bold mb-4 text-white">
              {isDraw ? 'DRAW!' : 'VICTORY!'}
            </h2>

            {/* Winner Info */}
            <div class="mb-6">
              {isDraw ? (
                <div>
                  <div
                    class="text-7xl font-bold font-mono mb-2 text-gray-400"
                    style="text-shadow: 0 0 15px #9e9e9e, 0 0 30px #9e9e9e"
                  >
                    =
                  </div>
                  <p class="text-xl text-gray-200">The Force is balanced!</p>
                </div>
              ) : (
                <div>
                  <div
                    class={clsx('text-8xl font-bold font-mono mb-2', {
                      'text-blue-400': winner === 'X',
                      'text-red-400': winner === 'O',
                    })}
                    style={{
                      textShadow:
                        winner === 'X'
                          ? '0 0 20px #4FC3F7, 0 0 40px #4FC3F7, 0 0 60px #0288D1'
                          : '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #b71c1c',
                    }}
                  >
                    {winner}
                  </div>
                  <p class="text-2xl text-white font-bold mb-2">
                    {winnerName || (winner === 'X' ? 'Jedi' : 'Sith')} Wins!
                  </p>
                  <p class="text-gray-200">
                    {winner === 'X'
                      ? 'The light side prevails!'
                      : 'The dark side is victorious!'}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div class="flex gap-3 justify-center">
              <button
                onClick$={onPlayAgain$}
                class="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Play Again
              </button>
              <button
                onClick$={onResetAll$}
                class="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Reset Scores
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
