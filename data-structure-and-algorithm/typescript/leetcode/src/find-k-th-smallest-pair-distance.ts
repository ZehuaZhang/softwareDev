/*
The distance of a pair of integers a and b is defined as the absolute difference between a and b.

Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.



Example 1:

Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
Example 2:

Input: nums = [1,1,1], k = 2
Output: 0
Example 3:

Input: nums = [1,6,1], k = 3
Output: 5


Constraints:

n == nums.length
2 <= n <= 104
0 <= nums[i] <= 106
1 <= k <= n * (n - 1) / 2
*/

function smallestDistancePair(nums, k) {
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];
  for (let count = 0; left < right; count = 0) {
    const mid = left + Math.trunc((right - left) / 2);
    for (let i = 0, j = 0; i < nums.length; ++i) {
      for (; j < nums.length && nums[j] <= nums[i] + mid; ++j);
      count += j - i - 1;
    }

    if (count < k) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
