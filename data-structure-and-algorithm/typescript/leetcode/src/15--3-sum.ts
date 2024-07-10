/**
15. 3Sum

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

function threeSum(nums: number[]): number[][] {
  const n = nums.length;
  const rslt: number[][] = [];
  const tgt = 0;

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
          if (s === tgt) {
              rslt.push([nums[i], nums[l], nums[r]]);
              ++l;
              --r;
          } else if (s < tgt) {
              ++l;
          } else {
              --r;
          }
      }
  }

  return rslt;
}
