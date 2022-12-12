import {runTestCaseList} from './util/test';

function findLength(nums1: number[], nums2: number[]): number[] {
  const dp = [...Array(nums1.length + 1)].map(() =>
    Array(nums2.length + 1).fill(0)
  );

  let length = 0;
  let end = 0;
  for (let i = 1; i <= nums1.length; ++i) {
    for (let j = 1; j <= nums2.length; ++j) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (length < dp[i][j]) {
          end = i;
          length = dp[i][j];
        }
      }
    }
  }

  return nums1.slice(end - length, end);
}

// test

const testInputListCollection = [
  [
    [1, 2, 3, 2, 1],
    [3, 2, 1, 4, 7],
  ],
];

const expectedResultList = [[3, 2, 1]];

runTestCaseList(testInputListCollection, expectedResultList, findLength);
