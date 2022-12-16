/*
On a 2 dimensional grid with rows rows and cols columns, we start at (rStart, cStart) facing east.

Here, the north-west corner of the grid is at the first row and column, and the south-east corner of the grid is at the last row and column.

Now, we walk in a clockwise spiral shape to visit every position in this grid.

Whenever we would move outside the boundary of the grid, we continue our walk outside the grid (but may return to the grid boundary later.)

Eventually, we reach all rows * cols spaces of the grid.

Return a list of coordinates representing the positions of the grid in the order they were visited.



Example 1:

Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]




Example 2:

Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]




Note:

1 <= rows <= 100
1 <= cols <= 100
0 <= rStart < rows
0 <= cStart < cols
*/

function spiralMatrixIII(
  rows: number,
  cols: number,
  row0: number,
  col0: number
): number[][] {
  const result: number[][] = [[row0, col0]];
  let [x, y] = [0, 1];
  let prev = 0;
  for (let k = 0; result.length < rows * cols; ++k) {
    for (let i = 0; i < Math.trunc(k / 2) + 1; ++i) {
      row0 += x;
      col0 += y;
      if (row0 >= 0 && row0 < rows && col0 >= 0 && col0 < cols) {
        result.push([row0, col0]);
      }
    }
    prev = x;
    x = y;
    y = -prev;
  }
  return result;
}
