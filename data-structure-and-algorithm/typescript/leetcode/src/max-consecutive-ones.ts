/*
Given a binary array nums, return the maximum number of consecutive 1's in the array.



Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2


Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
*/

function findMaxConsecutiveOnes(nums: number[]): number {
  let curr = 0;
  let result = 0;
  for (const num of nums) {
    curr = num ? curr + 1 : 0;
    result = Math.max(result, curr);
  }
  return result;
}
