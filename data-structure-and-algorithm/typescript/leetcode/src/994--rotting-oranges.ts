/*
Rotting Oranges

You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
*/

function orangesRotting(grid: number[][]): number {
  const [m, n] = [grid.length, grid[0].length];
  let ttl = 0;
  let q: [number, number][] = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j]) {
        ++ttl;
      }
      if (grid[i][j] === 2) {
        q.push([i, j]);
      }
    }
  }

  let cnt = 0,
    rslt = 0;
  while (q.length) {
    cnt += q.length;
    const next: [number, number][] = [];
    for (const [i, j] of q) {
      for (const [dx, dy] of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [x, y] = [i + dx, j + dy];
        if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] === 1) {
          grid[x][y] = 2;
          next.push([x, y]);
        }
      }
    }
    if (next.length) {
      ++rslt;
    }
    q = next;
  }
  return ttl === cnt ? rslt : -1;
}
