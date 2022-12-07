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

function trapRainWater(height) {
  if (height.length === 0) {
    return 0;
  }
  const q = new Heap(Infinity, (a, b) => a[2] - b[2]);
  const visited = Array(height.length)
    .fill(0)
    .map(() => Array(height[0].length).fill(false));

  for (let i = 0; i < height.length; ++i) {
    for (const [left, right] of [
      [i, 0],
      [i, height[0].length - 1],
    ]) {
      q.push([left, right, height[left][right]]);
      visited[left][right] = true;
    }
  }

  for (let j = 1; j < height[0].length - 1; ++j) {
    for (const [left, right] of [
      [0, j],
      [height.length - 1, j],
    ]) {
      q.push([left, right, height[left][right]]);
      visited[left][right] = true;
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
      const nx = x + dx,
        ny = y + dy;
      if (
        nx >= 0 &&
        nx < height.length &&
        ny >= 0 &&
        ny < height[0].length &&
        !visited[nx][ny]
      ) {
        result += Math.max(0, h - height[nx][ny]);
        q.push([nx, ny, Math.max(height[nx][ny], h)]);
        visited[nx][ny] = true;
      }
    }
  }
  return result;
}
