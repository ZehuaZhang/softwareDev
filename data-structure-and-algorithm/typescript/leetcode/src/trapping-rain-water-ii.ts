/*
Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.



Example 1:


Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small pounds 1 and 3 units trapped.
The total volume of water trapped is 4.
Example 2:


Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10


Constraints:

m == heightMap.length
n == heightMap[i].length
1 <= m, n <= 200
0 <= heightMap[i][j] <= 2 * 104
*/

import {Heap} from './data-structure/Heap';

function trapRainWater(heightGrid: number[][]): number {
  const [rows, cols] = [heightGrid.length, heightGrid[0].length];
  const q = new Heap<number[]>(([x0, y0, z0], [x1, y1, z1]) => z0 - z1);
  const visited: boolean[][] = [...Array(rows)].map(() =>
    Array(cols).fill(false)
  );

  for (let i = 0; i < rows; ++i) {
    for (const [x, y] of [
      [i, 0],
      [i, cols - 1],
    ]) {
      q.push([x, y, heightGrid[x][y]]);
      visited[x][y] = true;
    }
  }

  for (let j = 1; j < cols - 1; ++j) {
    for (const [x, y] of [
      [0, j],
      [rows - 1, j],
    ]) {
      q.push([x, y, heightGrid[x][y]]);
      visited[x][y] = true;
    }
  }

  let result = 0;
  while (!q.isEmpty()) {
    const [x, y, h] = q.pop();
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited[nx][ny]) {
        result += Math.max(0, h - heightGrid[nx][ny]);
        q.push([nx, ny, Math.max(heightGrid[nx][ny], h)]);
        visited[nx][ny] = true;
      }
    }
  }
  return result;
}
