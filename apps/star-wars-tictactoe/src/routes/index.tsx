import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { AuthService } from '@star-wars-tictactoe/auth';

export const useCheckAuth = routeLoader$(async ({ cookie, redirect }) => {
  const isAuth = await AuthService.isAuthenticated(cookie);
  if (isAuth) {
    throw redirect(302, '/game-setup');
  } else {
    throw redirect(302, '/login');
  }
});

export default component$(() => {
  return <div>Redirecting...</div>;
});

export const head: DocumentHead = {
  title: 'Star Wars Tic Tac Toe',
  meta: [
    {
      name: 'description',
      content: 'A Star Wars themed Tic Tac Toe game built with Qwik',
    },
  ],
};