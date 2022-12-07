/*
Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/

function subsets(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    dfs(nums, 0, [], result);
    return result;
}

function dfs(nums, left, curr, result){
    result.push([...curr]);
    for (let i = left; i < nums.length; ++i){
        curr.push(nums[i]);
        dfs(nums, i + 1, curr, result);
        curr.pop();
    }
}