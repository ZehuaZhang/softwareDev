/*
Construct Longest Increasing Subsequence

Given an unsorted array of integers, construct longest increasing subsequence.

Example:

Input: [10,9,2,5,3,7,101,18]
Output: [2,3,7,101], or [2,3,7,18].

Time:  O(nlogn)
Space: O(n)
*/

function constructLIS(nums: number[]): number[] {
  const result: number[] = [];
  for (const num of nums) {
    const i = findGreaterEqual(result, num);
    if (i === result.length) {
      result.push(num);
    } else {
      result[i] = num;
    }
  }
  return result;

  function findGreaterEqual(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2);
      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}

console.log(constructLIS([10, 9, 2, 5, 3, 7, 101, 18]));
