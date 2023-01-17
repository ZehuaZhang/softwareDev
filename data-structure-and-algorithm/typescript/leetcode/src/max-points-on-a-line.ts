/*
149. Max Points on a Line
Difficulty: Hard

Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

Time:  O(n^2)
Space: O(n)
*/

function maxPoints(points: number[][]): number {
  let result = 0;
  for (let i = 0; i < points.length; ++i) {
    const slopeCountMap = new Map<number, number>();
    const [x0, y0] = points[i];
    let startPointCnt = 1;

    for (let j = i + 1; j < points.length; ++j) {
      const [x1, y1] = points[j];
      if (x0 === x1 && y0 === y1) {
        ++startPointCnt;
      } else {
        let slope = Infinity;
        if (x0 - x1 !== 0) {
          slope = (y0 - y1) / (x0 - x1);
        }
        slopeCountMap.set(slope, (slopeCountMap.get(slope) || 0) + 1);
      }
    }
    result = Math.max(result, startPointCnt);
    for (const count of slopeCountMap.values()) {
      result = Math.max(result, count + startPointCnt);
    }
  }
  return result;
}
