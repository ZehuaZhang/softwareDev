/**
 * Spiral Matrix II
 * 
 * Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.
 * 
 * Example:
 * Input: 3
 * Output:
 * [
 *  [ 1, 2, 3 ],
 *  [ 8, 9, 4 ],
 *  [ 7, 6, 5 ]
 * ]
 */

public class Solution {
    public int[][] generateMatrix(int n) {
        int[][] result = new int[n][n];

        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int value = 1;
        while (true) {
            for (int j = left; j <= right; ++j) {
                result[top][j] = value++;
            }
            if (++top > bottom) {
                break;
            }

            for (int i = top; j <= bottom; ++j) {
                result[i][right] = value++;
            }
            if (--right < left ) {
                break;
            }

            for (int j = right; j >= left; --j) {
                result[bottom][j] = value++;
            }
            if (--bottom < top) {
                break;
            }

            for (int i = bottom; i >= top; --i) {
                result[i][left] = value++;
            }
            if (++left > right) {
                break;
            }
        }

        return result;
    }
}
