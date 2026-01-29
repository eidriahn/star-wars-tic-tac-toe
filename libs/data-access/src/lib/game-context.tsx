import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  Slot,
  type Signal,
  $,
  useContext,
} from '@builder.io/qwik';
import { GameEngine, type GameState, type PlayerInfo } from '@star-wars-tictactoe/game-engine';

export interface GameContextState {
  gameState: GameState;
  playerX: PlayerInfo | null;
  playerO: PlayerInfo | null;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const GameContext = createContextId<Signal<GameContextState>>('game-context');

export const GameProvider = component$(() => {
  const state = useSignal<GameContextState>({
    gameState: GameEngine.createInitialState(),
    playerX: null,
    playerO: null,
    difficulty: 'medium',
  });

  useContextProvider(GameContext, state);

  return <Slot />;
});

export const useGameContext = () => {
  const context = useContext(GameContext);

  const makeMove = $((index: number) => {
    const currentState = context.value;
    const newGameState = GameEngine.makeMove(currentState.gameState, index);

    if (newGameState) {
      context.value = {
        ...currentState,
        gameState: newGameState,
      };
      return true;
    }
    return false;
  });

  const resetGame = $(() => {
    const currentState = context.value;
    context.value = {
      ...currentState,
      gameState: GameEngine.resetGame(currentState.gameState),
    };
  });

  const resetAll = $(() => {
    const currentState = context.value;
    context.value = {
      ...currentState,
      gameState: GameEngine.resetAll(),
    };
  });

  const setPlayers = $((playerX: PlayerInfo, playerO: PlayerInfo) => {
    context.value = {
      ...context.value,
      playerX,
      playerO,
    };
  });

  const setDifficulty = $((difficulty: 'easy' | 'medium' | 'hard') => {
    context.value = {
      ...context.value,
      difficulty,
    };
  });

  return {
    state: context,
    makeMove,
    resetGame,
    resetAll,
    setPlayers,
    setDifficulty,
  };
};