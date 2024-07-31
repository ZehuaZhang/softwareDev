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
  const iDgr = [...Array(m)].map(() => Array(n).fill(0));

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
          ++iDgr[x][y];
        }
      }
    }
  }

  let rslt = 0;

  const q: [number, number][] = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (!iDgr[i][j]) {
        q.push([i, j]);
      }
    }
  }

  while (q.length) {
    for (let l = q.length; l; --l) {
      const [i, j] = q.shift();
      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
          if (--iDgr[x][y] === 0) {
            q.push([x, y]);
          }
        }
      }
    }
    ++rslt;
  }

  return rslt;
}
