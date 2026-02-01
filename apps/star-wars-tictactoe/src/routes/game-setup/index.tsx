import { component$, useSignal, $ } from '@builder.io/qwik';
import {
  routeLoader$,
  useNavigate,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { AuthService } from '@star-wars-tictactoe/auth';

export const useCurrentUser = routeLoader$(async ({ cookie, redirect }) => {
  const user = await AuthService.getCurrentUser(cookie);
  if (!user) {
    throw redirect(302, '/login');
  }
  return user;
});

export default component$(() => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const selectedDifficulty = useSignal<'easy' | 'medium' | 'hard'>('medium');
  const isStarting = useSignal(false);

  const startGame = $(async () => {
    isStarting.value = true;
    // Navigate to game with difficulty as query parameter
    await navigate(`/game?difficulty=${selectedDifficulty.value}`);
  });

  return (
    <div class="min-h-screen p-4 flex items-center justify-center">
      <div class="stars"></div>

      <div class="max-w-md w-full">
        {/* Header */}
        <header class="text-center mb-8">
          <h1 class="text-5xl font-bold text-yellow-400 mb-2">STAR WARS</h1>
          <h2 class="text-2xl text-white mb-4">Tic Tac Toe</h2>
        </header>

        {/* Setup Card */}
        <div class="bg-black/70 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-500/30">
          {/* Welcome Message */}
          <div class="text-center mb-8">
            <p class="text-xl text-white mb-2">
              Welcome,{' '}
              <span class="text-yellow-400 font-bold">{user.value.name}</span>
            </p>
            <p class="text-gray-300">Prepare to face the Dark Side</p>
          </div>

          {/* Opponent Preview */}
          <div class="bg-black/50 rounded-xl p-4 mb-6 border border-red-500/30">
            <div class="flex items-center gap-4">
              <img
                src="https://ui-avatars.com/api/?name=Darth+AI&background=ff0000&color=fff"
                alt="Darth AI"
                class="w-16 h-16 rounded-full border-2 border-red-500"
              />
              <div>
                <h3 class="text-lg font-bold text-red-400">Darth AI</h3>
                <p class="text-sm text-gray-400">Your opponent awaits...</p>
              </div>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div class="mb-8">
            <h3 class="text-lg font-bold text-yellow-400 mb-4 text-center">
              Select Difficulty
            </h3>
            <div class="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick$={() => (selectedDifficulty.value = level)}
                  class={`relative py-4 px-3 rounded-lg font-bold text-sm transition-all transform hover:scale-105 ${
                    selectedDifficulty.value === level
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50 scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                  }`}
                  disabled={isStarting.value}
                >
                  <div class="text-xs opacity-75 mb-1">
                    {level === 'easy' && 'Padawan'}
                    {level === 'medium' && 'Knight'}
                    {level === 'hard' && 'Master'}
                  </div>
                  <div class="text-base">{level.toUpperCase()}</div>
                  {selectedDifficulty.value === level && (
                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span class="text-black text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p class="text-center text-sm text-gray-400 mt-3">
              {selectedDifficulty.value === 'easy' &&
                'The AI will make random moves'}
              {selectedDifficulty.value === 'medium' &&
                'The AI will play strategically'}
              {selectedDifficulty.value === 'hard' &&
                'The AI is nearly unbeatable'}
            </p>
          </div>

          {/* Action Buttons */}
          <div class="flex flex-col gap-3">
            <button
              onClick$={startGame}
              disabled={isStarting.value}
              class={`py-4 font-bold rounded-lg transition-all transform hover:scale-105 text-lg ${
                isStarting.value
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg shadow-yellow-500/30'
              }`}
            >
              {isStarting.value ? 'Starting...' : 'Start Game'}
            </button>

            <a
              href="/logout"
              class="py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all text-center"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Game Setup - Star Wars Tic Tac Toe',
  meta: [
    {
      name: 'description',
      content: 'Set up your Star Wars Tic Tac Toe game',
    },
  ],
};
