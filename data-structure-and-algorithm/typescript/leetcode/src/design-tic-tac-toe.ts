/*
Design a Tic-tac-toe game that is played between two players on a n x n grid.

You may assume the following rules:

A move is guaranteed to be valid and is placed on an empty block.
Once a winning condition is reached, no more moves is allowed.
A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.
Example:
Given n = 3, assume that player 1 is "X" and player 2 is "O" in the board.

TicTacToe toe = new TicTacToe(3);

toe.move(0, 0, 1); -> Returns 0 (no one wins)
|X| | |
| | | |    // Player 1 makes a move at (0, 0).
| | | |

toe.move(0, 2, 2); -> Returns 0 (no one wins)
|X| |O|
| | | |    // Player 2 makes a move at (0, 2).
| | | |

toe.move(2, 2, 1); -> Returns 0 (no one wins)
|X| |O|
| | | |    // Player 1 makes a move at (2, 2).
| | |X|

toe.move(1, 1, 2); -> Returns 0 (no one wins)
|X| |O|
| |O| |    // Player 2 makes a move at (1, 1).
| | |X|

toe.move(2, 0, 1); -> Returns 0 (no one wins)
|X| |O|
| |O| |    // Player 1 makes a move at (2, 0).
|X| |X|

toe.move(1, 0, 2); -> Returns 0 (no one wins)
|X| |O|
|O|O| |    // Player 2 makes a move at (1, 0).
|X| |X|

toe.move(2, 1, 1); -> Returns 1 (player 1 wins)
|X| |O|
|O|O| |    // Player 1 makes a move at (2, 1).
|X|X|X|
Follow up:
Could you do better than O(n2) per move() operation?
*/

class TicTacToe {
  constructor(size) {
    this.size = size;
    this.rows = createArray(0, 2, size);
    this.cols = createArray(0, 2, size);
    this.diag1 = createArray(0, 2);
    this.diag2 = createArray(0, 2);
  }

  move(row, col, player) {
    ++this.rows[player - 1][row];
    ++this.cols[player - 1][col];
    if (row === col) {
      ++this.diag1[player - 1];
    }
    if (row + col === this.size - 1) {
      ++this.diag2[player - 1];
    }
    if (
      this.rows[player - 1][row] === this.size ||
      this.cols[player - 1][col] === this.size ||
      this.diag2[player - 1] === this.size ||
      this.diag1[player - 1] === this.size
    ) {
      return player;
    }

    return 0;
  }
}

function createArray(value, ...dimensions) {
  if (dimensions.length === 1) {
    return Array(dimensions[0]).fill(value);
  }

  return Array.from({length: dimensions[0]}, () =>
    createArray(value, ...dimensions.slice(1))
  );
}
