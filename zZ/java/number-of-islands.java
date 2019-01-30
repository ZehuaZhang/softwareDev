/**
 * Number of Islands
 * 
 * Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * Example 1:
 * 
 * 11110
 * 11010
 * 11000
 * 00000
 * Answer: 1
 * 
 * Example 2:
 * 
 * 11000
 * 11000
 * 00100
 * 00011
 * Answer: 3
 */

public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null) {
            throw new NullPointerException();
        }

        if (grid.length == 0 || grid[0].length == 0) {
            return 0;
        } 

        int result = 0;
        boolean[][] visited = new boolean[grid.length][gird[0].length];
        for (int i = 0; i < grid.length; ++i) {
            for (int j = 0; j < grid[0].length; ++j) {
                if (!visited[i][j] && grid[i][j] == 1) {
                    numIslandsHelper(i, j, visited, grid);
                    ++result;
                }
            }
        }

        return result;
    }

    private void numIslandsHelper(int x, int y, boolean[][] visited, char[][] grid) {
        visited[x][y] = true;

        int[][] dirs = new dirs[][] {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] dir : dirs) {
            int nextX = x + dir[0];
            int nextY = y + dir[1];
            if (nextX >= 0 && nextX < grid.length && nextY >= 0 && nextY < grid[0].length && !visited[nextX][nextY] && grid[nextX][nextY] == 1) {
                numIslandsHelper(nextX, nextY, visited, grid);
            }
        }
    }
}
