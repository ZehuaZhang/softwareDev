/*
Given an array nums of positive integers, call a (contiguous, not necessarily distinct) subarray of nums good if the number of different integers in that subarray is exactly k.

(For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.)

Return the number of good subarrays of nums.



Example 1:

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
Example 2:

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].


Note:

1 <= nums.length <= 20000
1 <= nums[i] <= nums.length
1 <= k <= nums.length
*/

function subarraysWithKDistinct(nums: number[], uniqueCount: number): number {
  let result = 0;
  let subCount = 0;
  const numCountMap = new Map<number, number>();
  for (let left = 0, right = 0, count = 0; right < nums.length; ++right) {
    numCountMap.set(nums[right], (numCountMap.get(nums[right]) || 0) + 1);
    if (numCountMap.get(nums[right]) === 1) {
      ++count;
    }
    if (count > uniqueCount) {
      numCountMap.set(nums[left], numCountMap.get(nums[left])! - 1);
      ++left;
      --count;
      subCount = 0;
    }
    for (; numCountMap.get(nums[left])! > 1; ++subCount, ++left) {
      numCountMap.set(nums[left], numCountMap.get(nums[left])! - 1);
    }
    if (count === uniqueCount) {
      result += subCount + 1;
    }
  }
  return result;
}
