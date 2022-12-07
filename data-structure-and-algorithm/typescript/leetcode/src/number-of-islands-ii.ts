/*
A 2d grid map of m rows and n columns is initially filled with water. We may perform an addLand operation which turns the water at position (row, col) into a land. Given a list of positions to operate, count the number of islands after each addLand operation. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example:

Given m = 3, n = 3, positions = [[0,0], [0,1], [1,2], [2,1]]. Initially, the 2d grid grid is filled with water. (Assume 0 represents water and 1 represents land).

0 0 0
0 0 0
0 0 0
Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.

1 0 0
0 0 0   Number of islands = 1
0 0 0
Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.

1 1 0
0 0 0   Number of islands = 1
0 0 0
Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.

1 1 0
0 0 1   Number of islands = 2
0 0 0
Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.

1 1 0
0 0 1   Number of islands = 3
0 1 0
We return the result as an array: [1, 1, 2, 3]
*/

function numIslands2(m, n, positions) {
  const result = [];
  let count = 0;
  const islands = new Map();

  for (const [x, y] of positions) {
    const cId = getId(x, y, n);
    islands.set(cId, cId);
    ++count;

    for (const d of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      const [dx, dy] = d;
      const neighbour = [x + dx, y + dy];
      const [nx, ny] = neighbour;
      const nId = getId(nx, ny, n);

      if (
        nx >= 0 &&
        nx < m &&
        ny >= 0 &&
        ny < n &&
        islands.has(nId) &&
        find(cId, islands) !== find(nId, islands)
      ) {
        union(cId, nId, islands);
        --count;
      }
    }
    result.push(count);
  }
  return result;
}

function getId(row, col, n) {
  return row * n + col;
}

function find(x, map) {
  while (map.get(x) !== x) {
    x = map.get(x);
  }
  return x;
}

function union(x, y, map) {
  const rx = find(x, map);
  const ry = find(y, map);
  map.set(ry, rx);
}
