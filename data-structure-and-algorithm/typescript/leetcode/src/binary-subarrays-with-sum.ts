/*
Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.



Example 1:

Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
Example 2:

Input: nums = [0,0,0,0,0], goal = 0
Output: 15


Constraints:

1 <= nums.length <= 3 * 104
nums[i] is either 0 or 1.
0 <= goal <= nums.length
*/

function numSubarraysWithSum(nums, goal) {
  let curr = 0,
    result = 0;
  const count = Array(nums.length + 1).fill(0);
  count[0] = 1;
  for (const n of nums) {
    curr += n;
    if (curr >= goal) {
      result += count[curr - goal];
    }
    ++count[curr];
  }
  return result;
}

function numSubarraysWithSum(nums, goal) {
  return atMost(nums, goal) - atMost(nums, goal - 1);
}

function atMost(nums, goal) {
  if (goal < 0) {
    return 0;
  }
  let result = 0,
    left = 0;
  for (let right = 0; right < nums.length; ++right) {
    goal -= nums[right];
    for (; goal < 0; ++left) {
      goal += nums[left];
    }
    result += right - left + 1;
  }
  return result;
}
