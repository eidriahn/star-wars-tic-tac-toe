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
