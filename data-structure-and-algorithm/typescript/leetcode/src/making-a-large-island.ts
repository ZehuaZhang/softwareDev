/*
You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.



Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.


Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] is either 0 or 1.
*/

function largestIsland(grid: number[][]): number {
  const [rows, cols] = [grid.length, grid[0].length];
  const parentList = [...Array(rows * cols)].map((_, i) => i);
  const areaList = [...Array(rows * cols)].fill(1);
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j]) {
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const [x, y] = [i + dx, j + dy];
          if (isValid(grid, x, y)) {
            union(id(i, j), id(x, y));
          }
        }
      }
    }
  }

  let result = Math.max(...areaList);
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 0) {
        let curr = 1;
        const visited = new Set<number>();
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const [x, y] = [i + dx, j + dy];
          if (isValid(grid, x, y)) {
            const root = find(id(x, y));
            if (!visited.has(root)) {
              curr += areaList[root];
              visited.add(root);
            }
          }
        }
        result = Math.max(result, curr);
      }
    }
  }
  return result;

  function id(i: number, j: number): number {
    return i * cols + j;
  }

  function isValid(grid: number[][], i: number, j: number): boolean {
    return i >= 0 && i < rows && j >= 0 && j < cols;
  }

  function find(x: number): number {
    while (x !== parentList[x]) {
      x = parentList[x];
    }
    return x;
  }

  function union(x: number, y: number): void {
    const xr = find(x);
    const yr = find(y);
    if (xr !== yr) {
      parentList[xr] = yr;
      areaList[yr] += areaList[xr];
    }
  }
}
