import { component$, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { GraphQLProvider } from '@star-wars-tictactoe/graphql-client';
import { AuthProvider } from '@star-wars-tictactoe/auth';
import { GameProvider } from '@star-wars-tictactoe/data-access';

import globalStyles from './global.css?inline';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <GraphQLProvider>
          <AuthProvider>
            <GameProvider>
              <RouterOutlet />
              <ServiceWorkerRegister />
            </GameProvider>
          </AuthProvider>
        </GraphQLProvider>
      </body>
    </QwikCityProvider>
  );
});
