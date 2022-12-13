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

import {Queue} from './data-structure/Queue';

function longestIncreasingPath(matrix: number[][]): number {
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

  let queue = new Queue<number[]>();
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (inDegree[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  let result = 0;
  for (; queue.size; ++result) {
    const next = new Queue<number[]>();
    for (const [i, j] of queue.toArray()) {
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
    queue = next;
  }
  return result;
}

function longestIncreasingPathDFS(matrix: number[][]): number {
  const [rows, cols] = [matrix.length, matrix[0].length];
  const cache = [...Array(rows)].map(() => Array(cols).fill(0));
  let result = 0;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      const length = longestIncreasingPathDfsHelper(i, j);
      result = Math.max(result, length);
    }
  }
  return result;

  function longestIncreasingPathDfsHelper(i: number, j: number): number {
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
        x < rows &&
        y >= 0 &&
        y < cols &&
        matrix[x][y] > matrix[i][j]
      ) {
        const length = 1 + longestIncreasingPathDfsHelper(x, y);
        max = Math.max(max, length);
      }
    }
    cache[i][j] = max;
    return max;
  }
}
