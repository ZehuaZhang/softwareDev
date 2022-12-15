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

function solveNQueens(size: number): string[][] {
  const colList: boolean[] = Array(size).fill(false);
  const diagList1: boolean[] = Array(2 * size - 1).fill(false);
  const diagList2: boolean[] = Array(2 * size - 1).fill(false);
  const result: string[][] = [];
  const path: number[] = [];
  solveNQueensDfs(0, path);
  return result;

  function solveNQueensDfs(row: number, path: number[]): void {
    if (row === size) {
      result.push(
        path.map(col => {
          const array = [...'.'.repeat(size)];
          array[col] = 'Q';
          return array.join('');
        })
      );
      return;
    }
    for (let i = 0; i < size; ++i) {
      if (
        !colList[i] &&
        !diagList1[row - i + size - 1] &&
        !diagList2[row + i]
      ) {
        path.push(i);
        colList[i] = diagList1[row - i + size - 1] = diagList2[row + i] = true;
        solveNQueensDfs(row + 1, path);
        path.pop();
        colList[i] = diagList1[row - i + size - 1] = diagList2[row + i] = false;
      }
    }
  }
}
