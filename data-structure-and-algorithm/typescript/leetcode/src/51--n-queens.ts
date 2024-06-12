/*
51. N-Queens

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

function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const col: boolean[] = Array(n).fill(false);
  const diag1: boolean[] = Array(2 * n - 1).fill(false);
  const diag2: boolean[] = Array(2 * n - 1).fill(false);

  dfs([]);

  return result;

  function dfs(path: number[]) {
    const row = path.length;
    if (row === n) {
      result.push(
        path.map(c => {
          const arr = [...'.'.repeat(n)];
          arr[c] = 'Q';
          return arr.join('');
        })
      );
      return;
    }

    for (let i = 0; i < n; ++i) {
      if (!col[i] && !diag1[row - i + n - 1] && !diag2[row + i]) {
        col[i] = diag1[row - i + n - 1] = diag2[row + i] = true;
        path.push(i);
        dfs(path);
        path.pop();
        col[i] = diag1[row - i + n - 1] = diag2[row + i] = false;
      }
    }
  }
}
