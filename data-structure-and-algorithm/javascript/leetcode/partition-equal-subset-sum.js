/*
Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
*/

function canPartition(nums) {
    const sum = nums.reduce((p, c) => p + c, 0);
    if (sum & 1) {
        return false;
    }
    const target = sum >> 1 ;
    const dp = Array(target + 1).fill(0);
    dp[0] = 1;
    for (const n of nums) {
        for (let i = target; i >= n; --i) {
            dp[i] = dp[i] || dp[i - n];
        }
    }
    return dp[target];
}

function canPartitionDFS(nums) {
    const sum = nums.reduce((p, c) => p + c, 0);
    if (sum & 1) {
        return false;
    }
    const target = sum >> 1 ;
    return dfs(nums, target, nums.length - 1, 
        [...Array(nums.length + 1)].map(() => Array(target + 1).fill(undefined)))
}

function dfs(nums, target, i, cache) {
    if (i < 0 || target < 0) {
        return false;
    }
    if (!target) {
        return true;
    }
    if (cache[i][target] !== undefined) {
        return cache[i][target];
    }
    
    cache[i][target] = dfs(nums, target, i - 1, cache) || dfs(nums, target - nums[i], i - 1, cache);
    return cache[i][target];
}