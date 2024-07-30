/*
85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

 

Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1
 

Constraints:

rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'.
*/

function maximalRectangle(matrix: string[][]): number {
  const [m, n] = [matrix.length, matrix[0].length];
  const hghts = Array(n).fill(0);
  let rslt = 0;

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      hghts[j] = matrix[i][j] === "1" ? hghts[j] + 1 : 0;
    }
    rslt = Math.max(rslt, hist());
  }

  return rslt;

  function hist() {
    const h = [...hghts, 0];
    const idx: number[] = [];
    let area = 0;

    for (let i = 0; i < h.length; ) {
      if (!idx.length || h[i] > h[idx[idx.length - 1]]) {
        idx.push(i++);
      } else {
        const l = h[idx.pop()];
        const w = idx.length ? i - idx[idx.length - 1] - 1 : i;
        area = Math.max(area, l * w);
      }
    }

    return area;
  }
}
