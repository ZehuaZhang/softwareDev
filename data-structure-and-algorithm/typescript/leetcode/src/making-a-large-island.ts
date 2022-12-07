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

function largestIsland(grid) {
  const parent = [...Array(grid.length * grid[0].length)].map((_, i) => i);
  const area = [...Array(grid.length * grid[0].length)].fill(1);
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j]) {
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const [x, y] = [i + dx, j + dy];
          if (isValid(grid, x, y) && grid[x][y]) {
            union(parent, area, id(grid, i, j), id(grid, x, y));
          }
        }
      }
    }
  }

  let result = Math.max(...area);
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      if (!grid[i][j]) {
        let curr = 1;
        const visited = new Set();
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const [x, y] = [i + dx, j + dy];
          if (isValid(grid, x, y) && grid[x][y]) {
            const root = find(parent, id(grid, x, y));
            if (!visited.has(root)) {
              curr += area[root];
              visited.add(root);
            }
          }
        }
        result = Math.max(result, curr);
      }
    }
  }
  return result;
}

function id(grid, i, j) {
  return i * grid[0].length + j;
}

function isValid(grid, i, j) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

function find(parent, x) {
  if (x === parent[x]) {
    return x;
  }
  return (parent[x] = find(parent, parent[x]));
}

function union(parent, area, x, y) {
  const xr = find(parent, x);
  const yr = find(parent, y);
  if (xr !== yr) {
    parent[xr] = yr;
    area[yr] += area[xr];
  }
}
