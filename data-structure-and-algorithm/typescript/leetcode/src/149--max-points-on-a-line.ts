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
  let result = 0;
  for (let i = 0; i < points.length; ++i) {
    const map = new Map<number, number>();
    const [x0, y0] = points[i];
    let same = 1;

    for (let j = i + 1; j < points.length; ++j) {
      const [x1, y1] = points[j];

      if (x0 === x1 && y0 === y1) {
        ++same;
      } else {
        let slope = Infinity;
        if (x0 !== x1) {
          slope = (y1 - y0) / (x1 - x0);
        }
        map.set(slope, (map.get(slope) || 0) + 1);
      }
    }

    result = Math.max(result, same);
    for (const cnt of map.values()) {
      result = Math.max(result, cnt + same);
    }
  }
  return result;
}
