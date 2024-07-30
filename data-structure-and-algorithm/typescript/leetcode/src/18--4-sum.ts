/**
18. 4Sum

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

 

Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
 

Constraints:

1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
*/

function fourSum(nums: number[], target: number): number[][] {
  const n = nums.length;
  const rslt: number[][] = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < n; ++i) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < n; ++j) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }

      for (let l = j + 1, r = n - 1; l < r; ) {
        if (l > j + 1 && nums[l] === nums[l - 1]) {
          ++l;
          continue;
        }

        if (r < n - 1 && nums[r] === nums[r + 1]) {
          --r;
          continue;
        }

        const s = nums[i] + nums[j] + nums[l] + nums[r];
        if (s === target) {
          rslt.push([nums[i], nums[j], nums[l], nums[r]]);
          ++l;
          --r;
        } else if (s < target) {
          ++l;
        } else {
          --r;
        }
      }
    }
  }

  return rslt;
}
