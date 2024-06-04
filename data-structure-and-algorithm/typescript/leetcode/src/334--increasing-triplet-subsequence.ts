/*
334. Increasing Triplet Subsequence

Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.

Formally the function should:

Return true if there exists  i, j, k
such that  arr[i]  <  arr[j]  <  arr[k]  given 0 ≤  i  <  j  <  k  ≤  n -1 else return false.

 

Your algorithm should run in O( n ) time complexity and O( 1 ) space complexity.

Examples:
Given [1, 2, 3, 4, 5],
return true.

Given [5, 4, 3, 2, 1],
return false.
*/

function increasingTriplet(nums: number[]): boolean {
  const result: number[] = [];
  for (const num of nums) {
    const i = findGreaterEqual(result, num);
    if (i === result.length) {
      result.push(num);
    } else {
      result[i] = num;
    }
  }
  return result.length >= 3;

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
