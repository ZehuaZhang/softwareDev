/*
167. Two Sum II - Input array is sorted
Difficulty : Medium

Given an array of integers that is already sorted in ascending order,
find two numbers such that they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target,
where index1 must be less than index2.
You may assume that each input would have exactly one solution.

Input: numbers={2, 7, 11, 15}, target=9
Output: {0, 1}
*/

function twoSumII(nums: number[], target: number): number[] {
  for (let left = 0, right = nums.length - 1; left < right; ) {
    const sum = nums[left] + nums[right];
    if (sum > target) {
      --right;
    } else if (sum < target) {
      ++left;
    } else {
      return [left, right];
    }
  }
  return [-1, -1];
}
