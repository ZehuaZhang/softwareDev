/**
16. 3Sum Closest

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 

Constraints:

3 <= nums.length <= 500
-1000 <= nums[i] <= 1000
-104 <= target <= 104
*/

function threeSumClosest(nums: number[], target: number): number {
  const n = nums.length;

  let min = Infinity;
  let rslt = 0;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < n; ++i) {
      if (i > 0 && nums[i] === nums[i - 1]) {
          continue;
      }

      for (let l = i + 1, r = n - 1; l < r;) {
          if (l > i + 1 && nums[l] === nums[l - 1]) {
              ++l;
              continue;
          }
          if (r < n - 1 && nums[r] === nums[r + 1]) {
              --r;
              continue;
          }
          const s = nums[i] + nums[l] + nums[r];
          const d = Math.abs(s - target);
          if (d < min) {
              min = d;
              rslt = s;
          }
          if (s === target) {
              return s;
          } else if (s < target) {
              ++l;
          } else {
              --r;
          }
      }
  }

  return rslt;
};