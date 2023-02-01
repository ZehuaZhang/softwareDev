/*
Input : nums = [2, 6, 4, 5, 7], size = 3
Output : 5

Input : nums = [12, 8, 11, 13, 10, 15, 14, 16, 20], size = 4
Output : 39
*/

import {runTestCaseList} from '../util/test';

function findIncDecSubseqGivenSizeDP(numList: number[], size: number) {
  const {length} = numList;
  const count = [...Array(size)].map(() =>
    [...Array(length)].map(() => [...Array(2).fill(0)])
  );
  let result = 0;

  for (let type = 0; type < 2; ++type) {
    for (let i = 0; i < length; ++i) {
      count[0][i][type] = 1;
    }
  }

  for (let type = 0; type < 2; ++type) {
    for (let k = 1; k < size; ++k) {
      for (let i = k; i < length; ++i) {
        count[k][i][type] = 0;
        for (let j = k - 1; j < i; ++j) {
          if (
            (type === 0 && numList[j] < numList[i]) ||
            (type === 1 && numList[j] > numList[i])
          ) {
            count[k][i][type] += count[k - 1][j][type];
          }
        }
      }
    }
  }
  for (let type = 0; type < 2; ++type) {
    for (let i = size - 1; i < length; i++) {
      result += count[size - 1][i][type];
    }
  }

  return result;
}

function findIncDecSubseqGivenSize(numList: number[], size: number) {
  const set = new Set<string>();
  const {length} = numList;
  let result = 0;
  const incList: number[] = [];
  const decList: number[] = [];
  for (let i = 0; i < length; ++i) {
    incList.push(numList[i]);
    findIncDecSubseqGivenSizeDfs(i, true);
    incList.pop();
    decList.push(numList[i]);
    findIncDecSubseqGivenSizeDfs(i, false);
    decList.pop();
  }
  return result;

  function findIncDecSubseqGivenSizeDfs(idx: number, isInc: boolean): void {
    const list = isInc ? incList : decList;
    if (list.length === size) {
      if (!hasVisited(...list)) {
        ++result;
        set.add(getHash(...list));
      }
      return;
    }

    const num = list[list.length - 1];
    for (let i = idx + 1; i < length; ++i) {
      const nextNum = numList[i];
      if (isInc) {
        if (nextNum > num) {
          list.push(nextNum);
          findIncDecSubseqGivenSizeDfs(i, isInc);
          list.pop();
        }
      } else {
        if (nextNum < num) {
          list.push(nextNum);
          findIncDecSubseqGivenSizeDfs(i, isInc);
          list.pop();
        }
      }
    }
  }

  function getHash(...list: number[]): string {
    return list.join('.');
  }

  function hasVisited(...list: number[]): boolean {
    return set.has(getHash(...list));
  }
}

// tests

const testInputListCollection = [
  [[2, 6, 4, 5, 7], 3],
  [[12, 8, 11, 13, 10, 15, 14, 16, 20], 4],
  [[1, 2, 3, 4], 3],
  [[2, 3, 5, 4, 1], 3],
];

const expectedResultList = [5, 39, 4, 3];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  findIncDecSubseqGivenSizeDP
);
