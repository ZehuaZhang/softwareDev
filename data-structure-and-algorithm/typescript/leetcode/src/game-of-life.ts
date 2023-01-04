/*
289. Game of Life

According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.



Example 1:


Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
Example 2:


Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]


Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 25
board[i][j] is 0 or 1.


Follow up:

Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?
*/

function gameOfLife(board: number[][]): void {
  const [rows, cols] = [board.length, board[0].length];
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let count = 0;
      // Count live cells in 3x3 block.
      for (let x = Math.max(i - 1, 0); x < Math.min(i + 2, rows); ++x) {
        for (let y = Math.max(j - 1, 0); y < Math.min(j + 2, cols); ++y) {
          count += board[x][y] & 1;
        }
      }
      // if (count == 4 && board[i][j]) means:
      //     Any live cell with three live neighbors lives.
      // if (count == 3) means:
      //     Any live cell with two live neighbors.
      //     Any dead cell with exactly three live neighbors lives.
      // to summarize, consider #2, & #3 scenarios where next state of board element lives
      if ((count === 4 && board[i][j] & 1) || count === 3) {
        board[i][j] |= 2; // Mark as live.
      }
    }
  }
  // Update to the next state
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      board[i][j] >>= 1;
    }
  }
}
