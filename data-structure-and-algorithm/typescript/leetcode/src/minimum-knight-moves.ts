/*
In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.



Return the minimum number of steps needed to move the knight to the square [x, y].  It is guaranteed the answer exists.



Example 1:

Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]
Example 2:

Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]


Constraints:

|x| + |y| <= 300
*/

function minKnightMoves(x, y) {
  if (!x && !y) {
    return 0;
  }
  const visited = new Set();
  const id = (x, y) => `${x}.${y}`;
  let q = [];
  q.push([0, 0]);
  visited.add(id(0, 0));
  let result = 1;
  for (; q.length; ++result) {
    const next = [];
    for (const [i, j] of q) {
      for (const [dx, dy] of [
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
      ]) {
        const [nx, ny] = [i + dx, j + dy];
        if (!visited.has(id(nx, ny))) {
          if (x === nx && y === ny) {
            return result;
          }
          visited.add(id(nx, ny));
          next.push([nx, ny]);
        }
      }
    }
    q = next;
  }
  return -1;
}
