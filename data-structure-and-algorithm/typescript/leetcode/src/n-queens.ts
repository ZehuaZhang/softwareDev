/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.



Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]


Constraints:

1 <= n <= 9
*/

function solveNQueens(n) {
  const cols = Array(n).fill(false);
  const diags1 = Array(2 * n - 1).fill(false);
  const diags2 = Array(2 * n - 1).fill(false);
  const result = [];
  const curr = [];
  dfs(0, curr, result);
  return result;

  function dfs(row, curr, result) {
    if (row == n) {
      result.push(
        curr.map(col => {
          const array = [...'.'.repeat(n)];
          array[col] = 'Q';
          return array.join('');
        })
      );
      return;
    }
    for (let i = 0; i < n; ++i) {
      if (!cols[i] && !diags1[row - i + n - 1] && !diags2[row + i]) {
        curr.push(i);
        cols[i] = diags1[row - i + n - 1] = diags2[row + i] = true;
        dfs(row + 1, curr, result);
        curr.pop();
        cols[i] = diags1[row - i + n - 1] = diags2[row + i] = false;
      }
    }
  }
}
