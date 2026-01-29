import { component$, useSignal, $ } from '@builder.io/qwik';
import {
  routeAction$,
  Form,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { AuthService } from '@star-wars-tictactoe/auth';

export const useCheckAuth = routeLoader$(async ({ cookie, redirect }) => {
  const isAuth = await AuthService.isAuthenticated(cookie);
  if (isAuth) {
    throw redirect(302, '/game-setup');
  }
  return {};
});

export const useLoginAction = routeAction$(
  async (data, { cookie, fail, redirect }) => {
    const user = await AuthService.login(
      {
        username: data.username,
        password: data.password,
      },
      cookie
    );

    if (!user) {
      return fail(401, {
        message: 'Invalid credentials. Try luke/force123 or vader/darkside123',
      });
    }

    throw redirect(302, '/game-setup');
  },
  zod$({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  })
);

export default component$(() => {
  const action = useLoginAction();
  const showHint = useSignal(false);

  return (
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="stars"></div>

      <div class="w-full max-w-md">
        <div class="bg-black/60 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-500/30">
          {/* Title */}
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-yellow-400 mb-2">STAR WARS</h1>
            <h2 class="text-2xl text-white">Tic Tac Toe</h2>
            <p class="text-gray-400 mt-2">
              Join the battle between Jedi and Sith
            </p>
          </div>

          {/* Login Form */}
          <Form action={action} class="space-y-6 max-w-3xs mx-auto">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {action.value?.message && (
              <div class="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                {action.value.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {action.isRunning ? 'Logging in...' : 'Enter the Galaxy'}
            </button>
          </Form>

          {/* Hint Button */}
          <div class="mt-6 text-center">
            <button
              type="button"
              onClick$={() => (showHint.value = !showHint.value)}
              class="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Need help? Show available users
            </button>

            {showHint.value && (
              <div class="mt-4 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <h3 class="text-sm font-bold text-blue-300 mb-2">
                  Demo Users:
                </h3>
                <ul class="text-xs text-gray-300 space-y-1 text-left">
                  <li>
                    • <span class="text-white">luke</span> / force123 (Jedi)
                  </li>
                  <li>
                    • <span class="text-white">vader</span> / darkside123 (Sith)
                  </li>
                  <li>
                    • <span class="text-white">leia</span> / rebel123 (Rebel)
                  </li>
                  <li>
                    • <span class="text-white">yoda</span> / dothereisnotry
                    (Master)
                  </li>
                  <li>
                    • <span class="text-white">han</span> / solo123 (Smuggler)
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div class="mt-6 text-center text-gray-500 text-xs">
          May the Force be with you
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Login - Star Wars Tic Tac Toe',
  meta: [
    {
      name: 'description',
      content: 'Login to play Star Wars Tic Tac Toe',
    },
  ],
};
