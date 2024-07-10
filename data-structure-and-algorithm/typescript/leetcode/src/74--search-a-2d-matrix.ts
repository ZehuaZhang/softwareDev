/*
74. Search a 2D Matrix

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
*/

function searchMatrix(matrix: number[][], target: number): boolean {
  const [m, n] = [matrix.length, matrix[0].length];
  for (let l = 0, r = m * n - 1; l <= r;) {
      const mid = l + Math.trunc((r - l) / 2);
      const [x, y] = [Math.trunc(mid / n), mid % n];
      if (matrix[x][y] === target) {
          return true;
      } else if (matrix[x][y] > target) {
          r = mid - 1;
      } else {
          l = mid + 1;
      }
  }

  return false;
};
