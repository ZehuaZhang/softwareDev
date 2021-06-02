// 300. Longest Increasing Subsequence

// Given an unsorted array of integers, find the length of longest increasing subsequence.

// Example:

// Input: [10,9,2,5,3,7,101,18]
// Output: 4 
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
// Note:

// There may be more than one LIS combination, it is only necessary for you to return the length.
// Your algorithm should run in O(n2) complexity.
// Follow up: Could you improve it to O(n log n) time complexity?

function lengthOfLIS(nums) {
    const result = []
    
    for (const num of nums) {
        const index = lowerBound(result, num)
        
        if (index === result.length) {
            result.push(num)
        } else {
            result[index] = num
        }
    }
    
    return result.length
}

function lowerBound(items, target) {
    let leftIndex = 0, rightIndex = items.length - 1
    while (leftIndex <= rightIndex) {
        const middleIndex = leftIndex + Math.trunc((rightIndex - leftIndex) / 2)
        if (items[middleIndex] >= target) {
            rightIndex = middleIndex - 1
        } else {
            leftIndex = middleIndex + 1
        }
    }
    
    return leftIndex
} 