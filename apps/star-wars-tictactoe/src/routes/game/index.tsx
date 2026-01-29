import { component$, useSignal, useStore, useVisibleTask$, useTask$, $, noSerialize } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead, useLocation } from '@builder.io/qwik-city';
import { AuthService } from '@star-wars-tictactoe/auth';
import { GameEngine, AIPlayer, type PlayerInfo } from '@star-wars-tictactoe/game-engine';
import {
  GameBoard,
  PlayerCard,
  ScoreBoard,
  WinnerModal,
  GameStatus
} from '@star-wars-tictactoe/ui-components';

export const useGameData = routeLoader$(async ({ cookie, redirect, query }) => {
  const user = await AuthService.getCurrentUser(cookie);
  if (!user) {
    throw redirect(302, '/login');
  }

  // Get difficulty from query params, default to medium if not provided
  const difficulty = (query.get('difficulty') || 'medium') as 'easy' | 'medium' | 'hard';

  return { user, difficulty };
});

export default component$(() => {
  const gameData = useGameData();
  const gameState = useStore(GameEngine.createInitialState());
  const playerX = useSignal<PlayerInfo>({
    id: gameData.value.user.id,
    name: gameData.value.user.name,
    avatar: gameData.value.user.avatar,
    symbol: 'X',
    isAI: false,
  });
  const playerO = useSignal<PlayerInfo>(noSerialize({
    id: 'ai',
    name: 'Darth AI',
    avatar: 'https://ui-avatars.com/api/?name=Darth+AI&background=ff0000&color=fff',
    symbol: 'O',
    isAI: true,
  }) as PlayerInfo);
  const difficulty = gameData.value.difficulty;
  const isProcessing = useSignal(false);

  const capturedDifficulty = difficulty;

  const makeMove = $(async (index: number) => {
    if (isProcessing.value || gameState.isGameOver) return;

    const newState = GameEngine.makeMove(gameState, index);
    if (!newState) return;

    gameState.board = newState.board;
    gameState.currentPlayer = newState.currentPlayer;
    gameState.winner = newState.winner;
    gameState.isGameOver = newState.isGameOver;
    if (newState.winner) {
      gameState.scores[newState.winner] += 1;
    }

    // Check if game is over after player move
    if (newState.isGameOver) return;

    // AI makes a move
    isProcessing.value = true;

    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const aiMove = AIPlayer.getBestMove(
      newState.board,
      'O',
      capturedDifficulty
    );

    if (aiMove !== -1) {
      const aiState = GameEngine.makeMove(newState, aiMove);
      if (aiState) {
        gameState.board = aiState.board;
        gameState.currentPlayer = aiState.currentPlayer;
        gameState.winner = aiState.winner;
        gameState.isGameOver = aiState.isGameOver;
      }
    }

    isProcessing.value = false;
  });

  const resetGame = $(() => {
    const newState = GameEngine.resetGame(gameState);
    Object.assign(gameState, newState);
  });

  const resetAll = $(() => {
    const newState = GameEngine.resetAll();
    Object.assign(gameState, newState);
  });

  const winningCells = useSignal<number[] | null>(null);

  useTask$(({ track }) => {
    track(() => gameState.board);
    const board = gameState.board;
    winningCells.value = GameEngine.getWinningCells(board.value || board);
  });

  return (
    <div class="min-h-screen p-4">
      <div class="stars"></div>

      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <header class="text-center mb-8">
          <h1 class="text-5xl font-bold text-yellow-400 mb-2">
            STAR WARS
          </h1>
          <h2 class="text-2xl text-white">
            Tic Tac Toe
          </h2>
        </header>

        {/* Game Layout */}
        <div class="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Player */}
          <div class="space-y-4">
            <PlayerCard
              player={playerX.value}
              score={gameState.scores.X}
              isCurrentTurn={gameState.currentPlayer === 'X' && !gameState.isGameOver}
              side="left"
            />

            {/* Difficulty Display */}
            <div class="bg-black/50 backdrop-blur-md rounded-xl p-4 border-2 border-yellow-500/30">
              <h3 class="text-sm font-bold text-yellow-400 mb-1">AI Difficulty</h3>
              <div class="text-lg font-bold text-white uppercase">{difficulty}</div>
              <p class="text-xs text-gray-400 mt-1">
                {difficulty === 'easy' && 'Random moves'}
                {difficulty === 'medium' && 'Strategic play'}
                {difficulty === 'hard' && 'Nearly unbeatable'}
              </p>
            </div>
          </div>

          {/* Game Board */}
          <div class="space-y-4">
            <GameStatus
              board={gameState.board}
              currentPlayer={gameState.currentPlayer}
            />

            <GameBoard
              board={gameState.board}
              onCellClick$={makeMove}
              winningCells={winningCells.value}
              disabled={isProcessing.value || gameState.isGameOver || gameState.currentPlayer === 'O'}
              currentPlayer={gameState.currentPlayer}
            />

            <ScoreBoard scores={gameState.scores} />

            {/* Action Buttons */}
            <div class="flex gap-3">
              <button
                onClick$={resetGame}
                class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                New Game
              </button>
              <a
                href="/game-setup"
                class="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-colors text-center"
              >
                Change Difficulty
              </a>
            </div>
            <a
              href="/login"
              class="block py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors text-center"
            >
              Logout
            </a>
          </div>

          {/* Right Player (AI) */}
          <div>
            <PlayerCard
              player={playerO.value}
              score={gameState.scores.O}
              isCurrentTurn={gameState.currentPlayer === 'O' && !gameState.isGameOver}
              side="right"
            />
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerModal
        winner={gameState.winner}
        winnerName={
          gameState.winner === 'X'
            ? playerX.value.name
            : gameState.winner === 'O'
            ? playerO.value.name
            : undefined
        }
        onPlayAgain$={resetGame}
        onResetAll$={resetAll}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Play - Star Wars Tic Tac Toe',
  meta: [
    {
      name: 'description',
      content: 'Play Star Wars Tic Tac Toe against the AI',
    },
  ],
};