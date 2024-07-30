/*
52. N-Queens II

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

function totalNQueens(n: number): number {
  const cols = Array(n).fill(false);
  const diag1 = Array(2 * n - 1).fill(false);
  const diag2 = Array(2 * n - 1).fill(false);

  let rslt = 0;

  dfs(0);

  return rslt;

  function dfs(row: number) {
    if (row === n) {
      return ++rslt;
    }

    for (let i = 0; i < n; ++i) {
      if (!cols[i] && !diag1[row + i] && !diag2[i - row + n - 1]) {
        cols[i] = diag1[row + i] = diag2[i - row + n - 1] = true;
        dfs(row + 1);
        cols[i] = diag1[row + i] = diag2[i - row + n - 1] = false;
      }
    }
  }
}
