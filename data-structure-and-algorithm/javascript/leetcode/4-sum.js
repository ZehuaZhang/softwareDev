// 18. 4Sum

// Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

// Note:

// The solution set must not contain duplicate quadruplets.

// Example:

// Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

// A solution set is:
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

/**
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