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

import {Queue} from './data-structure/Queue';

function shortestDistance(grid: number[][]) {
  const [rows, cols] = [grid.length, grid[0].length];
  let count = 0;
  const distList = [...Array(rows)].map(() => Array(cols).fill(0));
  const countList = [...Array(rows)].map(() => Array(cols).fill(0));
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1) {
        ++count;
        shortestDistanceBfs(i, j);
      }
    }
  }
  let result = Infinity;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (distList[i][j] < result && countList[i][j] === count) {
        result = distList[i][j];
      }
    }
  }

  return result === Infinity ? -1 : result;

  function shortestDistanceBfs(i: number, j: number): void {
    const visited = [...Array(rows)].map(() => Array(cols).fill(false));
    const queue = new Queue<number[]>();
    queue.push([i, j]);
    visited[i][j] = true;
    for (let dist = 1; !queue.isEmpty(); ++dist) {
      for (let {size} = queue; size; --size) {
        const [x, y] = queue.pop();
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
            distList[nx][ny] += dist;
            ++countList[nx][ny];
            queue.push([nx, ny]);
            visited[nx][ny] = true;
          }
        }
      }
    }
  }
}
