/*
Merge K Sorted Arrays
*/

import {Heap} from '../data-structure/Heap';

function mergeKArrays(sortedCollection: number[][]) {
  const heap = new Heap<[number[], number]>(([list1, idx1], [list2, idx2]) => {
    return list1[idx1] - list2[idx2];
  });

  for (const list of sortedCollection) {
    if (list.length >= 1) {
      heap.push([list, 0]);
    }
  }

  const result: number[] = [];
  while (!heap.isEmpty()) {
    const [list, idx] = heap.pop();
    result.push(list[idx]);

    if (idx + 1 < list.length) {
      heap.push([list, idx + 1]);
    }
  }
  return result;
}

console.log(
  mergeKArrays([
    [1, 3, 5, 7, 9],
    [2, 4, 6, 8, 10],
    [0, 12],
  ])
);
