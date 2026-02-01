### 1

- When clicking a square on the board, the wrong square is selected.

- The bug was caused by the onClick event listener on the squares of the board passing the wrong parameter to the onCellClick function, specifically increasing the index by 3.

```
  onClick$={() => {
                if (!disabled && !cell) {
                  onCellClick$((index + 3) % 9);
                }
              }}
```

- The fix is to remove the `+3` from the code.

### 2

- When the opponent wins, the score stays the same.

- The bug was caused by the make move function inside [this](apps/star-wars-tictactoe/src/routes/game/index.tsx) page route not checking whether the ai is the winner of the current move.
  **Note** the function can be improved.

- The fix was to add a check whether the `aiState` is the winner and if so, increase the score of the appropriate player.

### 3

- When there is a draw, the scores stay the same.

- The bug is caused by passing the wrong key to the parameter lookup when determining the scores of the `gameState`

```
  if (newState.winner) {
      gameState.scores[newState.winner] += 1;
    }
```

**_TypeScript note_** Property 'draw' does not exist on type '{ X: number; O: number; draws: number; }'. Did you mean 'draws'

- This can be fixed in two ways, by changing the key of the gameScores object from `draws` to `draw` or by changing the possible `winner` keys to `Player | 'draws'`, or what I think is best, making a ternary and piping the correct string to the scores. I think this is best because the types appropriately describe the entities, `gameState.scores.draws` is semantically correct as is `winner` as 'draw'.
