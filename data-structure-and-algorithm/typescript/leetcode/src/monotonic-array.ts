/*
An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j].  An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Return true if and only if the given array nums is monotonic.



Example 1:

Input: nums = [1,2,2,3]
Output: true
Example 2:

Input: nums = [6,5,4,4]
Output: true
Example 3:

Input: nums = [1,3,2]
Output: false
Example 4:

Input: nums = [1,2,4,5]
Output: true
Example 5:

Input: nums = [1,1,1]
Output: true


Note:

1 <= nums.length <= 50000
-100000 <= nums[i] <= 100000
*/

function isMonotonic(nums: number[]): boolean {
  let [isInc, isDec] = [true, true];
  for (let i = 1; i < nums.length; ++i) {
    isInc &&= nums[i - 1] <= nums[i];
    isDec &&= nums[i - 1] >= nums[i];
  }
  return isInc || isDec;
}
