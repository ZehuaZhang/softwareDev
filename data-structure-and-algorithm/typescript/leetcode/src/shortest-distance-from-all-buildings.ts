/*
You want to build a house on an empty land which reaches all buildings in the shortest amount of distance. You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:

Each 0 marks an empty land which you can pass by freely.
Each 1 marks a building which you cannot pass through.
Each 2 marks an obstacle which you cannot pass through.
Example:

Input: [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]

1 - 0 - 2 - 0 - 1
|   |   |   |   |
0 - 0 - 0 - 0 - 0
|   |   |   |   |
0 - 0 - 1 - 0 - 0

Output: 7

Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2),
the point (1,2) is an ideal empty land to build a house, as the total
travel distance of 3+3+1=7 is minimal. So return 7.
Note:
There will be at least one building. If it is not possible to build such house according to the above rules, return -1.
*/

function shortestDistance(grid) {
  const [rows, cols] = [grid.length, grid[0].length];
  let count = 0;
  const dist = [...Array(rows)].map(() => Array(cols).fill(0));
  const cnts = [...Array(rows)].map(() => Array(cols).fill(0));
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1) {
        ++count;
        bfs(grid, i, j, dist, cnts);
      }
    }
  }
  let result = Infinity;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (dist[i][j] < result && cnts[i][j] === count) {
        result = dist[i][j];
      }
    }
  }

  return result === Infinity ? -1 : result;
}

function bfs(grid, i, j, dist, cnts) {
  const [rows, cols] = [grid.length, grid[0].length];
  const visited = [...Array(rows)].map(() => Array(cols).fill(false));
  let q = [[i, j]];
  visited[i][j] = true;
  let curr = 1;
  for (; q.length; ++curr) {
    const next = [];
    for (const [x, y] of q) {
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const [nx, ny] = [x + dx, y + dy];
        if (
          0 <= nx &&
          nx < rows &&
          0 <= ny &&
          ny < cols &&
          !grid[nx][ny] &&
          !visited[nx][ny]
        ) {
          dist[nx][ny] += curr;
          ++cnts[nx][ny];
          next.push([nx, ny]);
          visited[nx][ny] = true;
        }
      }
    }
    q = next;
  }
}
