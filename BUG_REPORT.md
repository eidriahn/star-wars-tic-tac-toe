### 1

## What

- When clicking a square on the board, the wrong square is selected.

## Why

- The bug was caused by the onClick event listener on the squares of the board passing the wrong parameter to the onCellClick function, specifically increasing the index by 3.

```
  onClick$={() => {
                if (!disabled && !cell) {
                  onCellClick$((index + 3) % 9);
                }
              }}
```

## How to fix

- The fix is to remove the `+3` from the code.

### 2

## What

- When the opponent wins, the score stays the same.

## Why

- The bug was caused by the make move function inside [this](apps/star-wars-tictactoe/src/routes/game/index.tsx) page route not checking whether the ai is the winner of the current move.
  **Note** the function can be improved.

## How to fix

- The fix was to add a check whether the `aiState` is the winner and if so, increase the score of the appropriate player.

### 3

## What

- When there is a draw, the scores stay the same.

## Why

- The bug is caused by passing the wrong key to the parameter lookup when determining the scores of the `gameState`

```
  if (newState.winner) {
      gameState.scores[newState.winner] += 1;
    }
```

**_TypeScript note_** Property 'draw' does not exist on type '{ X: number; O: number; draws: number; }'. Did you mean 'draws'

## How to fix

- This can be fixed in two ways, by changing the key of the gameScores object from `draws` to `draw` or by changing the possible `winner` keys to `Player | 'draws'`, or what I think is best, making a ternary and piping the correct string to the scores. I think this is best because the types appropriately describe the entities, `gameState.scores.draws` is semantically correct as is `winner` as 'draw'.

### 4

## What

- The difficulty of the game does not follow the one set at the beggining

## Why

- The `getBestMove` function is broken, when the difficulty is medium, half of the time it returns a random move. When the it is hard or easy it returns random moves.

```

    if (difficulty === 'easy') {
    }

    if (difficulty === 'medium') {
      if (Math.random() < 0.5) {
        return this.getRandomMove(availableMoves);
      }
    }

    if (difficulty === 'hard') {
      return this.getRandomMove(availableMoves);
    }
```

## How to fix

- Make the function choose random moves when difficulty is `easy`, half the time random moves when difficulty is `medium` and choose the best move when difficulty is `hard`.

### 5

## Bug title

- Victory modal not shown when ai wins

## Description

- When the ai playes wins, the modal declaring their victory is not shown.

## Steps to reproduce

- Start a game
- Let the AI win
- No modal is shown when they win.

## Root cause analysis

- The issue stems from the `noSerialize` wrapper around `playerO` at [this](apps/star-wars-tictactoe/src/routes/game/index.tsx) component. Since the `noSerialize` function leads to the player being `undefined` on the client, the WinnerModal component doesn't execute properly.

## Solution implemented

- Removed the `noSerialize` wrapper function player0.

## File(s) modified

- apps/star-wars-tictactoe/src/routes/game/index.tsx

### 6

## Bug title

- User cannot logout

## Description

- When trying to logout, both during a game and during difficulty selection, the user is simply redirected to the login page.

## Steps to reproduce

- Click on `Back to Login` or `Logout` during the game.

## Root cause analysis

- Both logout buttons are <a> tags that have `/login` as their path, when the user is redirected, the loader that is set on that page checks whether the user is already logged in and if true redirects the user to the `/game-setup/` page.

## Solution implemented

- Two possible solutions are.
  - Change the loader of the `/login` page to logout users that are already authenticated.
  - Create a new path `/logout` that will logout the users and then redirect them.

I prefer the second approach because having an explicit `/logout` path is more robust, plus in the future its functionality can be extended, for example by adding a 'returnTo' parameter to specify the path we want to return to once logged out, for now the user will be redirected to the login page because of `routes/index.tsx`

## File(s) modified

- apps/star-wars-tictactoe/src/routes/game/index.tsx
- apps/star-wars-tictactoe/src/routes/game-setup/index.tsx
- apps/star-wars-tictactoe/src/routes/login/index.tsx
- apps/star-wars-tictactoe/src/routes/logout/index.tsx

## 7

## Bug title

- Ai Player card invisible on mobile

## Description

- When the website is viewed from mobile, the ai player card is at the bottom of the screen, the user is forced to scroll to view it, making the UX sub optimal.

## Steps to reproduce

View the app on mobile or with a restricted viewport in the browser.

## Root cause analysis

- The cause is the way the component are layed out in the grid at this apps/star-wars-tictactoe/src/routes/game/index.tsx component.

## Solution implemented

- Made some modification to how the grid is layed down so that the ai player card is among the top cards

## File(s) modified

- apps/star-wars-tictactoe/src/routes/game/index.tsx
