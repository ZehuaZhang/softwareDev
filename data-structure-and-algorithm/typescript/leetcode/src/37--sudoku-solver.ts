/*
37. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

 

Example 1:


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:


 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.
*/

function solveSudoku(board: string[][]): void {
  const [m, n] = [board.length, board[0].length];
  dfs();

  function dfs() {
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (board[i][j] === ".") {
          for (const c of ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
            if (isValid(i, j, c)) {
              board[i][j] = c;
              if (dfs()) {
                return true;
              }
              board[i][j] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function isValid(x: number, y: number, val: string) {
    for (let k = 0; k < 9; ++k) {
      const br = Math.trunc(x / 3) * 3 + Math.trunc(k / 3);
      const bc = Math.trunc(y / 3) * 3 + Math.trunc(k % 3);
      if (board[x][k] === val || board[k][y] === val || board[br][bc] === val) {
        return false;
      }
    }

    return true;
  }
}
