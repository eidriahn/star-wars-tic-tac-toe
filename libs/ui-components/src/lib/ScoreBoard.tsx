import { component$ } from '@builder.io/qwik';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export const ScoreBoard = component$<ScoreBoardProps>(({ scores }) => {
  return (
    <div class="bg-black/50 backdrop-blur-md rounded-xl p-4 border-2 border-yellow-500/30">
      <h2 class="text-center text-xl font-bold text-yellow-400 mb-3">
        SCORE BOARD
      </h2>

      <div class="flex justify-around items-center w-full">
        <div class="text-center">
          <div
            class="text-5xl font-bold font-mono mb-1 text-blue-400"
            style="text-shadow: 0 0 10px #4FC3F7, 0 0 20px #4FC3F7"
          >
            X
          </div>
          <div class="text-blue-400 text-2xl font-bold">{scores.X}</div>
          <div class="text-xs text-gray-400 mt-1">JEDI</div>
        </div>

        <div class="text-center">
          <div
            class="text-4xl font-bold font-mono mb-1 text-gray-400"
            style="text-shadow: 0 0 10px #9e9e9e"
          >
            =
          </div>
          <div class="text-gray-300 text-2xl font-bold">{scores.draws}</div>
          <div class="text-xs text-gray-400 mt-1">DRAWS</div>
        </div>

        <div class="text-center">
          <div
            class="text-5xl font-bold font-mono mb-1 text-red-400"
            style="text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000"
          >
            O
          </div>
          <div class="text-red-400 text-2xl font-bold">{scores.O}</div>
          <div class="text-xs text-gray-400 mt-1">SITH</div>
        </div>
      </div>
    </div>
  );
});
