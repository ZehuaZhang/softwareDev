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

function maxAreaOfIsland(grid: number[][]): number {
  const [rows, cols] = [grid.length, grid[0].length];
  const visited = [...Array(rows)].map(() => Array(cols).fill(false));
  let result = 0;
  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j)
      if (grid[i][j] === 1 && !visited[i][j]) {
        result = Math.max(result, maxAreaOfIslandDfs(i, j));
      }
  return result;

  function maxAreaOfIslandDfs(i: number, j: number): number {
    if (
      i < 0 ||
      i >= rows ||
      j < 0 ||
      j >= cols ||
      visited[i][j] ||
      grid[i][j] === 0
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
      area += maxAreaOfIslandDfs(x, y);
    }
    return area;
  }
}
