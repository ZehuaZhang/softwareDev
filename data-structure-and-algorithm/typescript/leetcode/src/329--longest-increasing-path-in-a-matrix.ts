/*
Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).



Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1


Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 231 - 1
*/

function longestIncreasingPath(matrix: number[][]): number {
  const [m, n] = [matrix.length, matrix[0].length];
  const inDegree = [...Array(m)].map(() => Array(n).fill(0));
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
          ++inDegree[x][y];
        }
      }
    }
  }

  let q: [number, number][] = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (inDegree[i][j] === 0) {
        q.push([i, j]);
      }
    }
  }

  let result = 0;
  for (; q.length; ++result) {
    const next: [number, number][] = [];
    for (const [i, j] of q) {
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < m && y >= 0 && y < n) {
          if (matrix[x][y] > matrix[i][j]) {
            if (--inDegree[x][y] === 0) {
              next.push([x, y]);
            }
          }
        }
      }
    }
    q = next;
  }
  return result;
}
