// 15. 3Sum

// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Note:

// The solution set must not contain duplicate triplets.

// Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

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