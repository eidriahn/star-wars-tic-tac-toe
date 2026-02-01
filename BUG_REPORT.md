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
