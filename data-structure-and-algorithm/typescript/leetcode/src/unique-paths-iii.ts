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

function uniquePathsIII(grid: number[][]): number {
  const [rows, cols] = [grid.length, grid[0].length];
  const visited = [...Array(rows)].map(() => Array(cols).fill(false));
  let [x0, y0] = [0, 0];
  let count = 1;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1) {
        x0 = i;
        y0 = j;
      } else if (grid[i][j] === 0) {
        ++count;
      }
    }
  }

  let result = 0;
  uniquePathsIIIDFS(x0, y0, count);
  return result;

  function uniquePathsIIIDFS(x: number, y: number, count: number): void {
    if (grid[x][y] === 2 && count === 0) {
      ++result;
      return;
    }

    visited[x][y] = true;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const [x1, y1] = [x + dx, y + dy];
      if (
        x1 >= 0 &&
        x1 < rows &&
        y1 >= 0 &&
        y1 < cols &&
        grid[x1][y1] !== -1 &&
        !visited[x1][y1]
      ) {
        uniquePathsIIIDFS(x1, y1, count - 1);
      }
    }
    visited[x][y] = false;
  }
}
