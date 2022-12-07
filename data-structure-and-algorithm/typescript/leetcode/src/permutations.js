/*
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
*/

function permute(nums) {
    const result = [];
    const visited = Array(nums.length).fill(false);
    dfs(nums, visited, [], result);
    return result;
}

function dfs(nums, visited, curr, result) {
    if (curr.length === nums.length) {
        result.push([...curr]);
        return;
    }
    for (let i = 0; i < nums.length; ++i) {
        if (!visited[i]) {
            curr.push(nums[i]);
            visited[i] = true;
            dfs(nums, visited, curr, result);
            visited[i] = false;
            curr.pop();
        }
    }
}
