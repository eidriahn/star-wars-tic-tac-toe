import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { AuthService } from '@star-wars-tictactoe/auth';

export const useLogout = routeLoader$(async ({ cookie, redirect }) => {
  AuthService.logout(cookie);

  throw redirect(302, '/login');
});

export default component$(() => {
  return <div>Logging out...</div>;
});
