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
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if (!isArray(nums) || !isNumber(target)) {
        throw "invalid input value"
    }
    
    nums.sort((a, b) => a - b)
    const result = []
    
    for (let i = 0; i < nums.length - 3; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        
        for (let j = i + 1; j < nums.length - 2; ++j) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue
            }
            
            for (let leftIndex = j + 1, rightIndex = nums.length - 1; leftIndex < rightIndex;) {
                if (leftIndex > j + 1 && nums[leftIndex] === nums[leftIndex - 1]) {
                    ++leftIndex
                    continue
                }
                
                if (rightIndex < nums.length - 1 && nums[rightIndex] === nums[rightIndex + 1]) {
                    --rightIndex
                    continue
                }
                
                const sum = nums[i] + nums[j] + nums[leftIndex] + nums[rightIndex]
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[leftIndex], nums[rightIndex]])
                    ++leftIndex
                    --rightIndex
                } else if (sum > target) {
                    --rightIndex
                } else {
                    ++leftIndex
                }
            }
        }
    }
    
    return result
};

function isArray(item) {
    return Array.isArray(item)
}

function isNumber(item) {
    return typeof item === 'number'
}