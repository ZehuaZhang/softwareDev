/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.



Example 1:


Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1


Constraints:

1 <= n <= 9
*/

function solveNQueens(n) {
  const cols = Array(n).fill(false);
  const diags1 = Array(2 * n - 1).fill(false);
  const diags2 = Array(2 * n - 1).fill(false);
  let result = 0;
  const curr = [];
  dfs(0);
  return result;

  function dfs(row) {
    if (row == n) {
      ++result;
      return;
    }
    for (let i = 0; i < n; ++i) {
      if (!cols[i] && !diags1[row - i + n - 1] && !diags2[row + i]) {
        cols[i] = diags1[row - i + n - 1] = diags2[row + i] = true;
        dfs(row + 1);
        cols[i] = diags1[row - i + n - 1] = diags2[row + i] = false;
      }
    }
  }
}
