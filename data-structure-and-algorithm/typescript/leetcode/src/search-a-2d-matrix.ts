/*
74. Search a 2D Matrix
Difficulty: Medium

Write an efficient algorithm that searches for a value in an rows x cols matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
For example,

Consider the following matrix:

[
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
Given target = 3, return true.

Time:  O(log(rows * cols))
Space: O(1)
*/

function searchMatrix(matrix: number[][], target: number): boolean {
  const [rows, cols] = [matrix.length, matrix[0].length];

  for (let left = 0, right = rows * cols; left < right; ) {
    const mid = left + Math.trunc((right - left) / 2);
    const value = matrix[Math.trunc(mid / cols)][mid % cols];
    if (value === target) {
      return true;
    } else if (value > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return false;
}
