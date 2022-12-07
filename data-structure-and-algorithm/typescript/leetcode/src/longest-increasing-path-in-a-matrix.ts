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

function longestIncreasingPath(matrix) {
  const [rows, cols] = [matrix.length, matrix[0].length];
  const inDegree = [...Array(rows)].map(() => Array(cols).fill(0));
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
          if (matrix[x][y] > matrix[i][j]) {
            ++inDegree[x][y];
          }
        }
      }
    }
  }

  console.log(inDegree);

  let q = [];
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (!inDegree[i][j]) {
        q.push([i, j]);
      }
    }
  }

  let result = 0;
  for (; q.length; ++result) {
    const next = [];
    for (const [i, j] of q) {
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
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

function longestIncreasingPathDFS(matrix) {
  const cache = [...Array(matrix.length)]
    .map(() => Array(matrix[0].length))
    .fill(0);
  let result = 0;
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < n; ++j) {
      const length = dfs(matrix, i, j, cache);
      result = Math.max(result, length);
    }
  }
  return result;
}

function dfs(matrix, i, j, cache) {
  if (cache[i][j]) {
    return cache[i][j];
  }
  let max = 1;
  for (const [dx, dy] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const [x, y] = [i + dx, j + dy];
    if (
      x >= 0 &&
      x < matrix.length &&
      y >= 0 &&
      y < matrix[0].length &&
      matrix[x][y] > matrix[i][j]
    ) {
      const length = 1 + dfs(matrix, x, y, cache);
      max = Math.max(max, length);
    }
  }
  cache[i][j] = max;
  return max;
}
