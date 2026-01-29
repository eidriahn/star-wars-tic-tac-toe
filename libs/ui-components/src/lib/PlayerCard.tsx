import { component$ } from '@builder.io/qwik';
import { clsx } from 'clsx';
import type { PlayerInfo } from '@star-wars-tictactoe/game-engine';

interface PlayerCardProps {
  player: PlayerInfo;
  score: number;
  isCurrentTurn: boolean;
  side: 'left' | 'right';
}

export const PlayerCard = component$<PlayerCardProps>(({
  player,
  score,
  isCurrentTurn,
  side
}) => {
  return (
    <div
      class={clsx(
        'relative p-4 rounded-xl backdrop-blur-md transition-all duration-500',
        'border-2',
        {
          'bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(0,191,255,0.5)]': player.symbol === 'X' && isCurrentTurn,
          'bg-red-500/20 border-red-400 shadow-[0_0_30px_rgba(255,0,0,0.5)]': player.symbol === 'O' && isCurrentTurn,
          'bg-black/30 border-gray-600': !isCurrentTurn,
          'text-right': side === 'right',
        }
      )}
    >
      {/* Turn Indicator */}
      {isCurrentTurn && (
        <div class="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <span class="text-xs px-2 py-1 bg-yellow-500 text-black rounded-full font-bold animate-pulse">
            YOUR TURN
          </span>
        </div>
      )}

      <div class={clsx('flex items-center gap-4', { 'flex-row-reverse': side === 'right' })}>
        {/* Avatar */}
        <div class="relative">
          <img
            src={player.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`}
            alt={player.name}
            width={60}
            height={60}
            class="rounded-full border-2 border-white/20"
          />
          {player.isAI && (
            <span class="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              AI
            </span>
          )}
        </div>

        {/* Player Info */}
        <div class="flex-1">
          <h3 class="text-lg font-bold text-white mb-1">
            {player.name}
          </h3>
          <div class="flex items-center gap-2">
            <span
              class={clsx(
                'text-3xl font-bold font-mono',
                {
                  'text-blue-400': player.symbol === 'X',
                  'text-red-400': player.symbol === 'O',
                }
              )}
              style={{
                textShadow: player.symbol === 'X'
                  ? '0 0 8px #4FC3F7, 0 0 16px #4FC3F7'
                  : '0 0 8px #ff0000, 0 0 16px #ff0000'
              }}
            >
              {player.symbol}
            </span>
            <span class="text-sm text-gray-300">
              Score: <span class="font-bold text-white">{score}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});