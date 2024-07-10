/*
149. Max Points on a Line

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

 

Example 1:


Input: points = [[1,1],[2,2],[3,3]]
Output: 3
Example 2:


Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
 

Constraints:

1 <= points.length <= 300
points[i].length == 2
-104 <= xi, yi <= 104
All the points are unique.
*/

function maxPoints(points: number[][]): number {
  const n = points.length;
  let rslt = 0;
  for (let i = 0; i < n; ++i) {
      const [x1, y1] = points[i];
      let same = 1;
      let map = new Map<number, number>();
      for (let j = i + 1; j < n; ++j) {
          const [x2, y2] = points[j];
          if (x1 === x2 && y1 === y2) {
              ++same;
          } else {
              let slope = x1 === x2 ? Infinity : (y2 - y1) / (x2 - x1);
              map.set(slope, (map.get(slope) || 0) + 1);
          }
      }

      rslt = Math.max(rslt, same);
      for (const cnt of map.values()) {
          rslt = Math.max(rslt, cnt + same);
      }
  }

  return rslt;
}

