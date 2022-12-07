/*
On a 2-dimensional grid, there are 4 types of squares:

1 represents the starting square.  There is exactly one starting square.
2 represents the ending square.  There is exactly one ending square.
0 represents empty squares we can walk over.
-1 represents obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.



Example 1:

Input: [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths:
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
Example 2:

Input: [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths:
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
Example 3:

Input: [[0,1],[2,0]]
Output: 0
Explanation:
There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.


Note:

1 <= grid.length * grid[0].length <= 20
*/

function uniquePathsIII(grid) {
  const [m, n] = [grid.length, grid[0].length];
  const visited = Array(m)
    .fill(0)
    .map(() => Array(n).fill(false));
  let x0, y0;
  let count = 1;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === 1) {
        x0 = i;
        y0 = j;
      } else if (grid[i][j] === 0) {
        ++count;
      }
    }
  }

  const result = [0];
  uniquePathsIIIDFS(grid, x0, y0, count, visited, result);
  return result[0];
}

function uniquePathsIIIDFS(grid, x, y, count, visited, result) {
  const [m, n] = [grid.length, grid[0].length];
  if (grid[x][y] === 2 && count === 0) {
    ++result[0];
    return;
  }

  visited[x][y] = true;
  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const x1 = x + dx;
    const y1 = y + dy;
    if (
      x1 >= 0 &&
      x1 < m &&
      y1 >= 0 &&
      y1 < n &&
      grid[x1][y1] !== -1 &&
      !visited[x1][y1]
    ) {
      uniquePathsIIIDFS(grid, x1, y1, count - 1, visited, result);
    }
  }
  visited[x][y] = false;
  return result;
}
