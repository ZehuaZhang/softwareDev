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

function kClosest(points, k) {
    let left = 0, right = points.length - 1
    while (left <= right) {
        const randomIndex = left + Math.trunc(Math.random() * (right - left + 1))
        const partitionIndex = partition(points, left, right, randomIndex)

        if (partitionIndex === k - 1) {
            break;
        } else if (partitionIndex > k - 1) {
            right = partitionIndex - 1
        } else {
            left = partitionIndex + 1
        }
    }
    return points.slice(0, k);


    function partition(items, left, right, pivotIndex) {
        swap(items, right, pivotIndex)

        let nextPivotIndex = left
        for (let index = left; index < right; ++index) {
            if (compare(items, index, right) < 0) {
                swap(items, nextPivotIndex++, index)
            }
        }

        swap(items, nextPivotIndex, right)        
        return nextPivotIndex
    }

    function swap(items, i, j) {
        const temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }

    function compare(points, i, j) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        return x1 * x1 + y1 * y1 - x2 * x2 - y2 * y2;
    }
}