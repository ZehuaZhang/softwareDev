// 3Sum Closest

// Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

// Example:

// Given array nums = [-1, 2, 1, -4], and target = 1.

// The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (!isArray(nums) || !isNumber(target)) {
        throw "invalid input error"
    }
    
    nums.sort((a, b) => a - b)
    
    const maxInteger = Math.pow(2, 31) - 1
    let difference = maxInteger
    let result
    
    for (let i = 0; i < nums.length - 2; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        
        for (j = i + 1, k = nums.length - 1; j < k;) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                ++j
                continue
            }    
            
            if (k < nums.length - 1 && nums[k] === nums[k + 1]) {
                --k
                continue
            }
            
            const sum = nums[i] + nums[j] + nums[k]
            const currDifference = Math.abs(sum - target)
            
            if (currDifference < difference) {
                difference = currDifference
                result = sum
            }
            
            if (sum > target) {
                --k
            } else if (sum < target) {
                ++j
            } else {
                --k
                ++j
            }
        }
    }
    
    return result
}
    
function isNumber(item) {
    return typeof item === 'number'
}

function isArray(item) {
    return Array.isArray(item)
}