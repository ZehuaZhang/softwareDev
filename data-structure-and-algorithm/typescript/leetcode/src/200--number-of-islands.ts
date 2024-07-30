/*
200. Number of Islands

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
  const [m, n] = [grid.length, grid[0].length];
  const seen = [...Array(m)].map(() => Array(n).fill(false));
  let rslt = 0;

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === "1" && !seen[i][j]) {
        dfs(i, j);
        ++rslt;
      }
    }
  }

  return rslt;

  function dfs(x: number, y: number) {
    if (
      x < 0 ||
      x >= m ||
      y < 0 ||
      y >= n ||
      seen[x][y] ||
      grid[x][y] !== "1"
    ) {
      return;
    }

    seen[x][y] = true;
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      dfs(x + dx, y + dy);
    }
  }
}
