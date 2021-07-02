/*
Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.

 

Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false
 

Constraints:

1 <= k <= nums.length <= 16
1 <= nums[i] <= 104
The frequency of each element is in the range [1, 4].
*/

function canPartitionKSubsets(nums, k) {
    const sum = nums.reduce((p, c) => p + c, 0);
    if (sum % k) {
        return false;
    }
    return dfs(nums, sum/k, k, 0, 0, Array(nums.length).fill(false));
}
    
function dfs(nums, target, k, left, sum, visited){
    if (sum > target) {
        return false;
    }
    if (k === 1) {
        return true;
    }
    if (sum === target) {
        return dfs(nums, target, k - 1, 0, 0, visited);
    }
    for (let i = left; i < nums.length; ++i) {
        if (!visited[i]){
            visited[i] = true;
            if (dfs(nums, target, k, i + 1,  sum + nums[i], visited)) {
                return true;
            }
            visited[i] = false;
        }
    }
    return false;
}