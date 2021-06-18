/**
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
 

Constraints:

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

/**
 * 
 * @param { number[] } nums 
 * @returns { number[][] }
 */
function threeSum(nums) {
    const result = [];
    const target = 0;
    nums.sort((a, b) => a - b);
    for (const i = 0; i < nums.length - 2; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        for (const left = i + 1, right = nums.length - 1; left < right;) {
            if (left > i + 1 && nums[left] === nums[left - 1]) {
                ++left;
                continue;
            }
            if (right < nums.length - 1 && nums[right] === nums[right + 1]) {
                --right;
                continue;
            }
            const sum = nums[i] + nums[left] + nums[right];
            if (target === sum) {
                result.push([nums[i], nums[left], nums[right]]);
                ++left;
                --right;
            } else if (target < sum) {
                --right;
            } else {
                ++left;
            }
        }
    }
    return result;
}