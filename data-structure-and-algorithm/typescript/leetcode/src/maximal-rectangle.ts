/*
85. Maximal Rectangle
Difficulty: Hard

Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1 and return its area.

For example, given the following matrix:

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Return 6.

Time:  O(rows * cols)
Space: O(cols)
*/

import {Stack} from './data-structure/Stack';
import {runTestCaseList} from './util/test';

function maximalRectangle(matrix: string[][]): number {
  const [rows, cols] = [matrix.length, matrix[0].length];
  const heights: number[] = Array(cols).fill(0);
  let result = 0;

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    }
    result = Math.max(result, largestRectangleAreaInHistogram());
  }
  return result;

  function largestRectangleAreaInHistogram(): number {
    const list = [...heights, 0];
    const idx = new Stack<number>();
    let area = 0;

    for (let i = 0; i < list.length; ) {
      if (idx.isEmpty() || list[i] > list[idx.peek()]) {
        idx.push(i++);
      } else {
        const height = list[idx.pop()];
        const len = idx.isEmpty() ? i : i - idx.peek() - 1;
        area = Math.max(area, height * len);
      }
    }
    return area;
  }
}

// tests

const testInputListCollection = [
  [
    [
      ['1', '0', '1', '0', '0'],
      ['1', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '1', '0'],
    ],
  ],
];

const expectedResultList = [6];

runTestCaseList(testInputListCollection, expectedResultList, maximalRectangle);
