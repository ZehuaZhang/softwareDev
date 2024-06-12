/*
79. Word Search

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
*/

function exist(board: string[][], word: string): boolean {
  const [m, n] = [board.length, board[0].length];
  const visited = [...Array(m)].map(() => Array(n).fill(false));
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (dfs(0, i, j)) {
        return true;
      }
    }
  }
  return false;

  function dfs(idx: number, x: number, y: number) {
    if (idx === word.length) {
      return true;
    }

    if (
      x < 0 ||
      x >= m ||
      y < 0 ||
      y >= n ||
      visited[x][y] ||
      board[x][y] !== word[idx]
    ) {
      return false;
    }

    visited[x][y] = true;
    let result = false;

    for (const [dx, dy] of [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]) {
      if (dfs(idx + 1, x + dx, y + dy)) {
        result = true;
        break;
      }
    }

    visited[x][y] = false;
    return result;
  }
}
