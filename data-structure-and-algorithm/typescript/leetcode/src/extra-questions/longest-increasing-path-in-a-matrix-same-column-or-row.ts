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

class Queue<T> {
  private list: T[];

  constructor() {
    this.list = [];
  }

  get size(): number {
    return this.list.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  push(data: T): void {
    this.list.push(data);
  }

  pop(): T {
    return this.list.shift()!;
  }
}

function longestIncreasingPath(matrix: number[][]): number {
  const [rows, cols] = [matrix.length, matrix[0].length];
  const inDegree = [...Array(rows)].map(() => Array(cols).fill(0));
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      for (let x = 0; x < rows; ++x) {
        if (matrix[x][j] > matrix[i][j]) {
          ++inDegree[x][j];
        }
      }
      for (let y = 0; y < cols; ++y) {
        if (matrix[i][y] > matrix[i][j]) {
          ++inDegree[i][y];
        }
      }
    }
  }

  const queue = new Queue<[number, number]>();
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (inDegree[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  let result = 0;
  for (; !queue.isEmpty(); ++result) {
    for (let {size} = queue; size; --size) {
      const [i, j] = queue.pop();
      for (let x = 0; x < rows; ++x) {
        if (matrix[x][j] > matrix[i][j]) {
          if (--inDegree[x][j] === 0) {
            queue.push([x, j]);
          }
        }
      }
      for (let y = 0; y < cols; ++y) {
        if (matrix[i][y] > matrix[i][j]) {
          if (--inDegree[i][y] === 0) {
            queue.push([i, y]);
          }
        }
      }
    }
  }
  return result;
}
