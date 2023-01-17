/*
221. Maximal Square
Medium

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

import {Stack} from './data-structure/Stack';
import {runTestCaseList} from './util/test';

function maximalSquare(matrix: string[][]): number {
  const [rows, cols] = [matrix.length, matrix[0].length];
  const heights: number[] = Array(cols).fill(0);
  let result = 0;

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    }
    result = Math.max(result, largestSquareAreaInHistogram());
  }
  return result;

  function largestSquareAreaInHistogram(): number {
    const list = [...heights, 0];
    const idx = new Stack<number>();
    let area = 0;

    for (let i = 0; i < list.length; ) {
      if (idx.isEmpty() || list[i] > list[idx.peek()]) {
        idx.push(i++);
      } else {
        const height = list[idx.pop()];
        const len = idx.isEmpty() ? i : i - idx.peek() - 1;
        const size = Math.min(height, len);
        area = Math.max(area, size * size);
      }
    }
    return area;
  }
}

// tests

const testInputListCollection = [
  [
    [
      ['1', '0', '0', '1', '1', '0', '1', '1'],
      ['1', '0', '0', '0', '0', '1', '0', '0'],
      ['0', '1', '1', '1', '0', '0', '1', '1'],
      ['0', '0', '0', '1', '0', '0', '0', '1'],
      ['0', '0', '0', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '0', '0', '1', '0', '1', '1', '0'],
      ['0', '1', '1', '0', '1', '1', '1', '0'],
    ],
  ],
];

const expectedResultList = [4];

runTestCaseList(testInputListCollection, expectedResultList, maximalSquare);
