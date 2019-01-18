/**
 * Spiral Matrix
 * 
 * Given a matrix of m x n elements (m rows, ncolumns), return all elements of the matrix in spiral order.
 * 
 * Example 1:
 * 
 * Input:
 * [
 *  [ 1, 2, 3 ],
 *  [ 4, 5, 6 ],
 *  [ 7, 8, 9 ]
 * ]
 * Output: [1,2,3,6,9,8,7,4,5]
 * Example 2:
 * 
 * Input:
 * [
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9,10,11,12]
 * ]
 * Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */

public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        if (matrix == null) {
            throw new NullPointerException();
        }

        List<Integer> result = new List<Integer>();
        if (matrix.length == 0 || matrix[0].length == 0) {
            return result;
        }

        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        while (true) {
            for (int j = left; j <= right; ++j) {
                result.add(matrix[top][j]);
            }
            if (++top > bottom) {
                break;
            }

            for (int i = top; i <= bottom; ++i) {
                result.add(matrix[i][right]);
            }
            if (--right < left) {
                break;
            }

            for (int j = right; j >= left; --j) {
                result.add(matrix[bottom][j]);
            }
            if (--down < up) {
                break;
            }

            for (int i = down; i >= up; --i) {
                result.add(matrix[i][left]);
            }
            if (++left > right) {
                break;
            }
        }

        return result;
    }
}
