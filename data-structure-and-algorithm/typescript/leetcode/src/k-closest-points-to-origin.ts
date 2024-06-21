/*
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).



Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.


Constraints:

1 <= k <= points.length <= 104
-104 < xi, yi < 104
*/

function kClosest(points: number[][], k: number): number[][] {
  const n = points.length;
  let l = 0,
    r = n - 1;
  while (l <= r) {
    const rI = l + Math.trunc(Math.random() * (r - l + 1));
    const pI = partition(rI);

    if (pI === k - 1) {
      break;
    } else if (pI > k - 1) {
      r = pI - 1;
    } else {
      l = pI + 1;
    }
  }
  return points.slice(0, k);

  function partition(p: number) {
    swap(p, r);

    let i = l;
    let j = r - 1;
    while (i <= j) {
      while (i <= j && compare(i, r) < 0) {
        ++i;
      }
      while (i <= j && compare(j, r) > 0) {
        --j;
      }
      if (i <= j) {
        swap(i, j);
        ++i;
        --j;
      }
    }

    swap(i, r);
    return i;
  }

  function swap(a: number, b: number): void {
    const tmp = points[a];
    points[a] = points[b];
    points[b] = tmp;
  }

  function compare(a: number, b: number): number {
    const [x1, y1] = points[a];
    const [x2, y2] = points[b];
    return x1 * x1 + y1 * y1 - x2 * x2 - y2 * y2;
  }
}
