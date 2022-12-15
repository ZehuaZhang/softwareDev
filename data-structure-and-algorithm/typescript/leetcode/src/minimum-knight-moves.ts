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

import {Queue} from './data-structure/Queue';

function minKnightMoves(x: number, y: number): number {
  if (!x && !y) {
    return 0;
  }
  const visited = new Set<string>();
  const queue = new Queue<number[]>();
  queue.push([0, 0]);
  visited.add(id(0, 0));
  let result = 0;
  for (; !queue.isEmpty(); ++result) {
    for (let {size} = queue; size; --size) {
      const [x0, y0] = queue.pop();
      if (x0 === x && y === y0) {
        return result;
      }

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
        const [x1, y1] = [x0 + dx, y0 + dy];
        if (!visited.has(id(x1, y1))) {
          visited.add(id(x1, y1));
          queue.push([x1, y1]);
        }
      }
    }
  }
  return -1;

  function id(x: number, y: number): string {
    return `${x}.${y}`;
  }
}
