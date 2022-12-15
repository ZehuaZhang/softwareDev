/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.



Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

function numIslands(grid: string[][]): number {
  const [rows, cols] = [grid.length, grid[0].length];
  const visited: boolean[][] = [...Array(rows)].map(() =>
    Array(cols).fill(false)
  );
  let result = 0;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === '1' && !visited[i][j]) {
        numIslandsDFS(i, j);
        ++result;
      }
    }
  }
  return result;

  function numIslandsDFS(x: number, y: number) {
    if (
      x < 0 ||
      x >= rows ||
      y < 0 ||
      y >= cols ||
      grid[x][y] !== '1' ||
      visited[x][y]
    ) {
      return;
    }
    visited[x][y] = true;
    numIslandsDFS(x - 1, y);
    numIslandsDFS(x + 1, y);
    numIslandsDFS(x, y - 1);
    numIslandsDFS(x, y + 1);
  }
}
