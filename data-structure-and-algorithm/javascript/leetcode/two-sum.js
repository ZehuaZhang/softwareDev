// 1. Two Sum

// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    if (isUndefinedOrNull(nums)) {
        throw "invalid input nums"
    }
    
    const numIndexMap = {}
    const result = [-1, -1]
    nums.some((num, index) => {
        const difference = target - num
        if (numIndexMap.hasOwnProperty(difference)) {
            result[0] = numIndexMap[difference]
            result[1] = index
            return true
        }
        numIndexMap[num] = index
        return false
    })
    
    return result
};

function isUndefinedOrNull(item) {
    return (
        item === null ||
        item === undefined
    )
}