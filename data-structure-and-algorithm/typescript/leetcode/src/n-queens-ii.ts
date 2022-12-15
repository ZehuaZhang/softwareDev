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

function solveNQueensII(size: number): number {
  const colList: boolean[] = Array(size).fill(false);
  const diagList1: boolean[] = Array(2 * size - 1).fill(false);
  const diagList2: boolean[] = Array(2 * size - 1).fill(false);
  let result = 0;
  solveNQueensIIDfs(0);
  return result;

  function solveNQueensIIDfs(row: number): void {
    if (row === size) {
      ++result;
      return;
    }
    for (let i = 0; i < size; ++i) {
      if (
        !colList[i] &&
        !diagList1[row - i + size - 1] &&
        !diagList2[row + i]
      ) {
        colList[i] = diagList1[row - i + size - 1] = diagList2[row + i] = true;
        solveNQueensIIDfs(row + 1);
        colList[i] = diagList1[row - i + size - 1] = diagList2[row + i] = false;
      }
    }
  }
}
