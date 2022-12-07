// 218. The Skyline Problem

// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Now suppose you are given the locations and height of all the buildings as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these buildings collectively (Figure B).

// Buildings Skyline Contour
// The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi], where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

// For instance, the dimensions of all buildings in Figure A are recorded as: [ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] .

// The output is a list of "key points" (red dots in Figure B) in the format of [ [x1,y1], [x2, y2], [x3, y3], ... ] that uniquely defines a skyline. A key point is the left endpoint of a horizontal line segment. Note that the last key point, where the rightmost building ends, is merely used to mark the termination of the skyline, and always has zero height. Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.

// For instance, the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ].

// Notes:

// The number of buildings in any input list is guaranteed to be in the range [0, 10000].
// The input list is already sorted in ascending order by the left x position Li.
// The output list must be sorted by the x position.
// There must be no consecutive horizontal lines of equal height in the output skyline. For instance, [...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...[2 3], [4 5], [12 7], ...]

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
const getSkyline = function (buildings) {
  if (!isArray(buildings)) {
    throw 'invalid input value';
  }

  const heights = [];
  buildings.forEach(building => {
    heights.push([building[0], -building[2]]);
    heights.push([building[1], building[2]]);
  });

  heights.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  const result = [];
  const maxHeap = [0];
  let prev = 0;
  for (const height of heights) {
    if (height[1] < 0) {
      maxHeap.push(-1 * height[1]);
    } else {
      maxHeap.splice(maxHeap.indexOf(height[1]), 1);
    }
    heapify(maxHeap);

    if (prev !== maxHeap[0]) {
      result.push([height[0], maxHeap[0]]);
      prev = maxHeap[0];
    }
  }
  return result;
};

function isArray(item) {
  return Array.isArray(item);
}

function heapify(array) {
  function heapifyHelper(array, i) {
    let largest = i;
    const left = i * 2 + 1;
    const right = i * 2 + 2;

    if (left < array.length && array[left] > array[largest]) {
      largest = left;
    }

    if (right < array.length && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swap(array, i, largest);

      heapifyHelper(array, largest);
    }
  }

  function swap(array, i, j) {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  for (let i = Math.trunc(array.length / 2) - 1; i >= 0; --i) {
    heapifyHelper(array, i);
  }
}
