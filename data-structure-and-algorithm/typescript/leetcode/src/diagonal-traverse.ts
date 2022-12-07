/*
Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.



Example 1:


Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]
Example 2:

Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]


Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
-105 <= mat[i][j] <= 105
*/

function findDiagonalOrder(mat) {
  const [rows, cols] = [mat.length, mat[0].length];
  const result = [];
  for (let row = 0, col = 0, i = 0; i < rows * cols; ++i) {
    result.push(mat[row][col]);

    if ((row + col) % 2) {
      // moving down
      if (row == rows - 1) {
        ++col;
      } else if (col) {
        ++row;
        --col;
      } else {
        ++row;
      }
    } else {
      // moving up
      if (col === cols - 1) {
        ++row;
      } else if (row) {
        --row;
        ++col;
      } else {
        ++col;
      }
    }
  }
  return result;
}
