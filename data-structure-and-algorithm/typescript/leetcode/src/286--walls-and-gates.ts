/*
286. Walls and Gates

You are given a m x n 2D grid initialized with these three possible values.

-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 2 31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

For example, given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF

After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4
*/

function wallsAndGates(rooms: number[][]) {
  const [m, n] = [rooms.length, rooms[0].length];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (!rooms[i][j]) {
        dfs(i, j, 0);
      }
    }
  }

  function dfs(i: number, j: number, val: number) {
    if (i < 0 || i >= m || j < 0 || j >= n || rooms[i][j] < val) {
      return;
    }

    rooms[i][j] = val;
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      dfs(i + dx, j + dy, val + 1);
    }
  }
}