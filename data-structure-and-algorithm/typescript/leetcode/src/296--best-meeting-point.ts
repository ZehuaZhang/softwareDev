/*
296. Best Meeting Point

A group of two or more people wants to meet and minimize the total travel distance. You are given a 2D grid of values 0 or 1, where each 1 marks the home of someone in the group. The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

Example:

Input: 

1 - 0 - 0 - 0 - 1
|   |   |   |   |
0 - 0 - 0 - 0 - 0
|   |   |   |   |
0 - 0 - 1 - 0 - 0

Output: 6 

Explanation: Given three people living at (0,0), (0,4), and (2,2):
             The point (0,2) is an ideal meeting point, as the total travel distance 
             of 2+2+2=6 is minimal. So return 6.

Hint:

Try to solve it in one dimension first. How can this solution apply to the two dimension case?
*/

function minTotalDistance(grid: number[][]) {
  const [m, n] = [grid.length, grid[0].length];
  const pos: [number, number][] = [];
  const rows: number[] = [];
  const cols: number[] = [];
  
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === 1) {
        pos.push([i, j]);
        rows.push(i);
      }
    }
  }

  for (let j = 0; j < n; ++j) {
    for (let i = 0; i < m; ++i) {
      if (grid[i][j] === 1) {
        cols.push(j);
      }
    }
  }

  const k = pos.length;
  const [medR, medC] = [rows[Math.trunc(k / 2)], cols[Math.trunc(k / 2)]];

  let rslt = 0;
  for (const [i, j] of pos) {
    rslt += Math.abs(i - medR) + Math.abs(j - medC);
  }
  return rslt;
}
