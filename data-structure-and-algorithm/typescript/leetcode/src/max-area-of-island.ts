/*
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.



Example 1:


Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
*/

function maxAreaOfIsland(grid) {
  let result = 0;
  const visited = [...Array(grid.length)].map(() =>
    Array(grid[0].length).fill(false)
  );
  for (let i = 0; i < grid.length; ++i)
    for (let j = 0; j < grid[0].length; ++j)
      if (grid[i][j] === 1 && !visited[i][j]) {
        result = Math.max(result, dfs(grid, i, j, visited));
      }
  return result;
}

function dfs(grid, i, j, visited) {
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[0].length ||
    visited[i][j] ||
    !grid[i][j]
  ) {
    return 0;
  }

  let area = 1;
  visited[i][j] = true;
  for (const [dx, dy] of [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const [x, y] = [dx + i, dy + j];
    area += dfs(grid, x, y, visited);
  }
  return area;
}
