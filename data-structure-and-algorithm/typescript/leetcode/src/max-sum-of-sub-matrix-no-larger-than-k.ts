/*
363. Max Sum of Rectangle No Larger Than K
Difficulty: Hard

Given a non-empty 2D matrix and an integer k,
find the max sum of a rectangle in the matrix such that its sum is no larger than k.

Example:
Given matrix = [
  [1,  0, 1],
  [0, -2, 3]
]
k = 2
The answer is 2. Because the sum of rectangle [[0, 1], [-2, 3]] is 2 and 2 is the max number no larger than k (k = 2).

Note:
The rectangle inside the matrix must have an area > 0.
What if the number of rows is much larger than the number of columns?

Time:  O(min(rows, cols)^2 * max(rows, cols) * log(max(rows, cols)))
Space: O(max(rows, cols))
*/

import {runTestCaseList} from './util/test';

function maxSumSubmatrix(matrix: number[][], target: number): number {
  const [rows, cols] = [matrix.length, matrix[0].length];
  let result = -Infinity;

  for (let i = 0; i < cols; ++i) {
    const sumList = Array(rows).fill(0);
    for (let j = i; j < cols; ++j) {
      for (let row = 0; row < rows; ++row) {
        sumList[row] += matrix[row][j];
      }
      let sum = 0;
      const array = [0];
      for (const rowSum of sumList) {
        sum += rowSum;
        const idx = findGreaterEqual(array, sum - target);
        if (idx < array.length) {
          result = Math.max(result, sum - array[idx]);
        }
        array.push(sum);
        array.sort();
      }
    }
  }
  return result;

  function findGreaterEqual(nums: number[], target: number): number {
    let [left, right] = [0, nums.length - 1];
    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2);
      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}

// tests

const testInputListCollection = [
  [
    [
      [5, -4, -3, 4],
      [-3, -4, 4, 5],
      [5, 1, 5, -4],
    ],
    8,
  ],
];

const expectedResultList = [8];

runTestCaseList(testInputListCollection, expectedResultList, maxSumSubmatrix);
