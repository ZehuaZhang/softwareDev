/**
 * Set Matrix Zeroes
 * 
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place.
 * 
 * click to show follow up.
 * 
 * Follow up:
 * Did you use extra space?
 * A straight forward solution using O(mn) space is probably a bad idea.
 * A simple improvement uses O(m + n) space, but still not the best solution.
 * Could you devise a constant space solution?
 */

public class Solution {
    public void setZeroes(int[][] matrix) {
        if (matrix == null) {
            throw new NullPointerException();
        }

        if (matrix.length == 0 || matrix[0].length == 0) {
            return;
        }

        // determine zero exists in first row, and first column
        boolean doesFirstColHaveZero = false, doesFirstRowHaveZero = false;
        for (int i = 0; i < matrix.length; ++i) {
            if (matrix[i][0] == 0) {
                doesFirstColHaveZero = true;
                break;
            }
        }

        for (int j = 0; j < matrix[0].length; ++j) {
            if (matrix[0][j] == 0) {
                doesFirstRowHaveZero = true;
                break;
            }
        }

        // shadow zero onto first row, and column from rows, and columns starting second which have zero
        for (int i = 1; i < matrix.length; ++i) {
            for (int j = 1; j < matrix[0].length; ++j) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                }
            }
        }

        // fill zeroes onto rows and columns starting second, based on shadowing
        for (int i = 1; i < matrix.length; ++i) {
            for (int j = 1; j < matrix[0].length; ++j) {
                if (matrix[0][j] == 0 || matrix[i][0] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // fill first row, and column if they originally have zero
        if (doesFirstColHaveZero) {
            for (int i = 0; i < matrix.length; ++i) {
                matrix[i][0] = 0;
            }
        }

        if (doesFirstRowHaveZero) {
            for (int j = 0; j < matrix[0].length; ++j) {
                matrix[0][j] = 0;
            }
        }
    }
}
