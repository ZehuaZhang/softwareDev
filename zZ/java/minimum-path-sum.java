/**
 * Minimum Path Sum
 * 
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
 * 
 * Note: You can only move either down or right at any point in time.
 */

public class Solution {
    public int minPathSum(int[][] grid) {
        if (grid == null) {
            throw new NullPointerException();
        }

        if (grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int m = grid.length, n = grid[0].length;

        int[][] minPathSum = new int[m][n];
        minPathSum[0][0] = grid[0][0];

        for (int i = 1; i < m; ++i) {
            minPathSum[i][0] += grid[i][0] + minPathSum[i - 1][0]; 
        }
        for (int j = 1; j < n; ++j) {
            minPathSum[0][j] += grid[0][j] + minPathSum[0][j - 1];
        }
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                minPathSum[i][j] += grid[i][j] + Math.min(minPathSum[i][j - 1], minPathSum[i - 1][j]);
            }
        }
        return minPathSum[m - 1][n - 1];
    }
}
