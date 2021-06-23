/*
Given an m x n matrix, return all elements of the matrix in spiral order.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:


Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100
*/

function spiralOrder(matrix) {
    const result = [];
    for (let left = 0, right = matrix[0].length - 1, top = 0, bottom = matrix.length - 1;
        left <= right && top <= bottom;
        ++left, --right, ++top, --bottom) {

        for (let j = left; j <= right; ++j) {
            result.push(matrix[top][j]);
        }
        for (let i = top + 1; i < bottom; ++i) {
            result.push(matrix[i][right]);
        }
        for (let j = right; top < bottom && j >= left; --j) {
            result.push(matrix[bottom][j]);
        }
        for (let i = bottom - 1; left < right && i > top; --i) {
            result.push(matrix[i][left]);
        }
    }
    return result;
}