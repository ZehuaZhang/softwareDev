/*
2536. Increment Submatrices by One
Medium

You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.

You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:

Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for for all row1i <= x <= row2i and col1i <= y <= col2i.
Return the matrix mat after performing every query.



Example 1:


Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).
Example 2:


Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
- In the first query we add 1 to every element in the matrix.


Constraints:

1 <= n <= 500
1 <= queries.length <= 104
0 <= row1i <= row2i < n
0 <= col1i <= col2i < n
*/

import {runTestCaseList} from './util/test';

class RangeQueryMatrix {
  numList: number[][];
  bitList: number[][];
  rows: number;
  cols: number;
  constructor(matrix: number[][]) {
    [this.rows, this.cols] = [matrix.length + 1, matrix[0].length + 1];
    this.numList = [...Array(this.rows)].map(() => Array(this.cols).fill(0));
    this.bitList = [...Array(this.rows)].map(() => Array(this.cols).fill(0));
    for (let i = 0; i < this.rows - 1; ++i) {
      for (let j = 0; j < this.cols - 1; ++j) {
        this.update(i, j, matrix[i][j]);
      }
    }
  }

  update(row: number, col: number, data: number): void {
    const diff = data - this.numList[row + 1][col + 1];
    this.updateDelta(row, col, diff);
  }

  updateDelta(row: number, col: number, delta: number): void {
    for (let i = row + 1; i < this.rows; i += this.leastBit(i)) {
      for (let j = col + 1; j < this.cols; j += this.leastBit(j)) {
        this.bitList[i][j] += delta;
      }
    }
    this.numList[row + 1][col + 1] += delta;
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return (
      this.getSum(row2, col2) -
      this.getSum(row1 - 1, col2) -
      this.getSum(row2, col1 - 1) +
      this.getSum(row1 - 1, col1 - 1)
    );
  }

  getSum(row: number, col: number): number {
    let result = 0;
    for (let i = row + 1; i > 0; i -= this.leastBit(i)) {
      for (let j = col + 1; j > 0; j -= this.leastBit(j)) {
        result += this.bitList[i][j];
      }
    }
    return result;
  }

  leastBit(num: number): number {
    return num & -num;
  }
}

function rangeAddQueries(size: number, queries: number[][]): number[][] {
  const matrix = [...Array(size)].map(() => Array(size).fill(0));
  for (const [row0, col0, row1, col1] of queries) {
    for (let i = row0; i <= row1; ++i) {
      ++matrix[i][col0];
      if (col1 + 1 < size) {
        --matrix[i][col1 + 1];
      }
    }
  }

  for (let i = 0; i < size; ++i) {
    for (let j = 1; j < size; ++j) {
      matrix[i][j] += matrix[i][j - 1];
    }
  }

  return matrix;
}

// tests

const testInputListCollection = [
  [
    3,
    [
      [1, 1, 2, 2],
      [0, 0, 1, 1],
    ],
  ],
];

const expectedResultList = [
  [
    [1, 1, 0],
    [1, 2, 1],
    [0, 1, 1],
  ],
];

runTestCaseList(testInputListCollection, expectedResultList, rangeAddQueries);
