/*
34. Search for a Range
Difficulty: Medium

Given a sorted array of integers, find the starting and ending position of a given target value.

Your algorithm runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

For example,
Given [5, 7, 7, 8, 8, 10] and target value 8,
return [3, 4].

Time:  O(logn)
Space: O(1)
*/

function searchRange(nums: number[], target: number): [number, number] {
  const left = findGreaterEqual(nums, target);
  const right = findGreater(nums, target);

  if (left < nums.length && nums[left] === target) {
    return [left, right - 1];
  }
  return [-1, -1];

  function findGreaterEqual(nums: number[], target: number): number {
    let [left, right] = [0, nums.length - 1];
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

  function findGreater(nums: number[], target: number): number {
    let [left, right] = [0, nums.length - 1];
    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2);
      if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}
