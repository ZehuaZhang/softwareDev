/*
Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

 

Example 1:


Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 20
*/

function generateMatrix(n) {
    const result = new Array(n).fill(0).map(() => Array(n).fill(0));
    for (let num = 0, left = 0, right = n - 1, top = 0, bottom = n - 1;
        left <= right && top <= bottom;
        ++left, --right, ++top, --bottom) {
        
        for (let j = left; j <= right; ++j) {
            result[top][j] = ++num;
        }
        for (let i = top + 1; i < bottom; ++i) {
            result[i][right] = ++num;
        }
        for (let j = right; top < bottom && j >= left; --j) {
            result[bottom][j] = ++num;
        }
        for (let i = bottom - 1; left < right && i > top; --i) {
            result[i][left] = ++num;
        }
    }
    return result;
}