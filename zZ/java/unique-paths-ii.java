/**
 * Unique Paths II 
 * 
 * Follow up for "Unique Paths":
 * 
 * Now consider if some obstacles are added to the grids. How many unique paths would there be?
 * 
 * An obstacle and empty space is marked as 1 and 0 respectively in the grid.
 * 
 * For example,
 * 
 * There is one obstacle in the middle of a 3x3 grid as illustrated below.
 * 
 * [
 *   [0,0,0],
 *   [0,1,0],
 *   [0,0,0]
 * ]
 * The total number of unique paths is 2.
 * 
 * Note: m and n will be at most 100.
 */

public class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        if (obstacleGrid == null) {
            throw new NullPointerException();
        }

        if (obstacleGrid.length == 0 || obstacleGrid[0].length == 0) {
            return 0;
        }

        if (obstacleGrid[0][0] = 1) {
            return 0;
        }

        int[] uniquePath = new int[n];
        uniquePath[0] = 1;

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (obstacleGrid[i][j] == 1) {
                    uniquePath[j] = 0;
                } else if (j > 0) {
                    uniquePath[j] += uniquePath[j - 1];
                }
            }
        }

        return uniquePath[n - 1];
    }
}
