import { component$, useComputed$ } from '@builder.io/qwik';
import type { Board } from '@star-wars-tictactoe/game-engine';

interface GameStatusProps {
  board: Board;
  currentPlayer: 'X' | 'O';
}

export const GameStatus = component$<GameStatusProps>(({ board, currentPlayer }) => {
  const boardCopy = board;

  const movesLeft = useComputed$(() => {
    return boardCopy.filter(cell => cell === null).length;
  });

  const gameProgress = useComputed$(() => {
    const totalCells = 9;
    const filledCells = totalCells - movesLeft.value;
    return Math.round((filledCells / totalCells) * 100);
  });

  return (
    <div class="bg-black/50 backdrop-blur-md rounded-xl p-3 border-2 border-purple-500/30 mb-4">
      <div class="text-center">
        <h3 class="text-sm font-bold text-purple-400 mb-2">Game Status</h3>
        <div class="text-xs text-gray-300 space-y-1">
          <div>Current Turn: <span class={currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}>{currentPlayer}</span></div>
          <div>Moves Remaining: <span class="text-yellow-400">{movesLeft.value}</span></div>
          <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={`width: ${gameProgress.value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});