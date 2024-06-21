/*
542. 01 Matrix

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

 

Example 1:


Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
Example 2:


Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
*/

function updateMatrix(mat: number[][]): number[][] {
  const [m, n] = [mat.length, mat[0].length];
  const rslt: number[][] = [...Array(m)].map(() => Array(n).fill(Infinity));

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (mat[i][j] === 0) {
        rslt[i][j] = 0;
      } else {
        if (i > 0) {
          rslt[i][j] = Math.min(rslt[i - 1][j] + 1, rslt[i][j]);
        }
        if (j > 0) {
          rslt[i][j] = Math.min(rslt[i][j - 1] + 1, rslt[i][j]);
        }
      }
    }
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i < m - 1) {
        rslt[i][j] = Math.min(rslt[i + 1][j] + 1, rslt[i][j]);
      }
      if (j < n - 1) {
        rslt[i][j] = Math.min(rslt[i][j + 1] + 1, rslt[i][j]);
      }
    }
  }

  return rslt;
}
