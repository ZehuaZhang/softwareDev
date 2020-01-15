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
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (!isArray(nums)) {
        throw "invalid input array"
    }
    
    nums.sort((a, b) => a - b)
    
    const result = []
    for (let i = 0; i < nums.length - 2; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        
        for (let j = i + 1, k = nums.length - 1; j < k;) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                ++j
                continue
            }
            
            if (k < nums.length - 1 && nums[k] === nums[k + 1]) {
                --k
                continue
            }
            
            const sum = nums[i] + nums[j] + nums[k]
            
            if (sum === 0) {
                result.push([nums[i], nums[j], nums[k]])
                ++j
                --k
            } else if (sum > 0) {
                --k
            } else {
                ++j
            }
        }
    }
    
    return result
};

function isArray(item) {
    return Array.isArray(item)
}