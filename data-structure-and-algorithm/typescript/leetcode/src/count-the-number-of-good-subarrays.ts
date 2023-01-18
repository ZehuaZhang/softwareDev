/*
2537. Count the Number of Good Subarrays
Medium

Given an integer array nums and an integer k, return the number of good subarrays of nums.

nums subarray arr is good if it there are at least k pairs of indices (left, j) such that i < j and arr[i] == arr[j].

nums subarray is a contiguous non-empty sequence of elements within an array.



Example 1:

Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.
Example 2:

Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs.


Constraints:

1 <= nums.length <= 105
1 <= nums[i], k <= 109
*/

function countGood(nums: number[], pairCnt: number): number {
  let result = 0;
  const numCountMap = new Map<number, number>();
  for (let left = 0, right = 0; right < nums.length; ++right) {
    pairCnt -= numCountMap.get(nums[right]) || 0;
    numCountMap.set(nums[right], (numCountMap.get(nums[right]) || 0) + 1);
    while (pairCnt <= 0) {
      numCountMap.set(nums[left], numCountMap.get(nums[left])! - 1);
      pairCnt += numCountMap.get(nums[left++])!;
    }
    result += left;
  }
  return result;
}
