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
        const i = firstElementGreaterOrEqual(result, num)
        if (i === result.length) {
            result.push(num)
        } else {
            result[i] = num
        }
    }
    return result.length
}

function firstElementGreaterOrEqual(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.trunc((right - left) / 2);
        if (nums[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}