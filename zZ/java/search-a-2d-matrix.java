/**
 * Search a 2D Matrix
 * 
 * Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
 * 
 * Integers in each row are sorted from left to right.
 * The first integer of each row is greater than the last integer of the previous row.
 * 
 * For example,
 * Consider the following matrix:
 * 
 * [
 *   [1,   3,  5,  7],
 *   [10, 11, 16, 20],
 *   [23, 30, 34, 50]
 * ]
 * Given target = 3, return true. 
 */

public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null) {
            throw new NullPointerException();
        }

        if (matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }

        if (target < matrix[0][0] || target > matrix[matrix.length - 1][matrix[0].length - 1]) {
            return false;
        }

        for (int left = 0, right = matrix.length * matrix[0].length - 1; left <= right;) {
            int middle = left + (right - left) / 2;
            int middleValue = matrix[middle / matrix[0].length][middle % matrix[0].length];
            if (middleValue == target) {
                return true;
            } else if (middleValue < target) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        return false;
    }
}
