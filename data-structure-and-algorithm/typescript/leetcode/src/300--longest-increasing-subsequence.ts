/*
300. Longest Increasing Subsequence

Given an unsorted array of integers, find the length of longest increasing subsequence.

Example:

Input: [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Note:

There may be more than one LIS combination, it is only necessary for you to return the length.
Your algorithm should run in O(n2) complexity.
Follow up: Could you improve it to O(n log n) time complexity?
*/

function lengthOfLIS(nums: number[]): number {
  const rslt: number[] = [];
  for (const num of nums) {
      const i = gtEq(num);
      if (i === rslt.length) {
          rslt.push(num);
      } else {
          rslt[i] = num;
      }
  }

  return rslt.length;

  function gtEq(tgt: number) {
      let [l, r] = [0, rslt.length - 1];
      for (; l <= r;) {
          const m = l + Math.trunc((r - l) / 2);
          if (rslt[m] >= tgt) {
              r = m - 1;
          } else {
              l = m + 1;
          }
      }

      return l;
  }
};
