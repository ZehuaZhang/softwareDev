/*
221. Maximal Square

Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.



Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
Example 2:


Input: matrix = [["0","1"],["1","0"]]
Output: 1
Example 3:

Input: matrix = [["0"]]
Output: 0


Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is '0' or '1'.
*/

function maximalSquare(matrix: string[][]): number {
  const [m, n] = [matrix.length, matrix[0].length];
  const h: number[] = Array(n).fill(0);

  let rslt = 0;

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      h[j] = matrix[i][j] === '1' ? h[j] + 1 : 0;
    }
    rslt = Math.max(rslt, cal());
  }

  return rslt;

  function cal() {
    const l = [...h, 0];
    const idx: number[] = [];
    let area = 0;

    for (let i = 0; i < l.length; ) {
      if (idx.length === 0 || l[i] > l[idx[idx.length - 1]]) {
        idx.push(i++);
      } else {
        const hght = l[idx.pop()];
        const w = idx.length ? i - idx[idx.length - 1] - 1 : i;
        const e = Math.min(hght, w);
        area = Math.max(area, e * e);
      }
    }

    return area;
  }
}
