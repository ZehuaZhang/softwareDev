/**
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

/**
 * 
 * @param { number[] } nums
 * @param { number } target
 * @return { number[][] }
 */
function fourSum(nums) {
    const result = [];
    const target = 0;
    nums.sort((a, b) => a - b);
    for (const i = 0; i < nums.length - 3; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        for (const j = i + 1; j < nums.length - 2; ++j) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            for (const left = j + 1, right = nums.length - 1; left < right;) {
                if (left > j + 1 && nums[left] === nums[left - 1]) {
                    ++left;
                    continue;
                }
                if (right < nums.length - 1 && nums[right] === nums[right + 1]) {
                    --right;
                    continue;
                }
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    ++left;
                    --right;
                } else if (sum < target) {
                    ++left;
                } else {
                    --right;
                }
            }
        }
    }
    return result;
}