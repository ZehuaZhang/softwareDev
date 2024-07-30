/*
34. Find First and Last Position of Element in Sorted Array

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
*/

function searchRange(nums: number[], target: number): number[] {
  const n = nums.length;
  const [a, b] = [greaterEq(target), greater(target)];
  return nums[a] === target ? [a, b - 1] : [-1, -1];

  function greater(tgt: number) {
    let [l, r] = [0, n - 1];
    while (l <= r) {
      const m = l + Math.trunc((r - l) / 2);
      if (nums[m] > tgt) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }

    return l;
  }

  function greaterEq(tgt: number) {
    let [l, r] = [0, n - 1];
    while (l <= r) {
      const m = l + Math.trunc((r - l) / 2);
      if (nums[m] >= tgt) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }

    return l;
  }
}
