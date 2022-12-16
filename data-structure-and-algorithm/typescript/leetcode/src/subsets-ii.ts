/*
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]


Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  const path: number[] = [];
  subsetsDfs(0);
  return result;

  function subsetsDfs(start: number): void {
    result.push([...path]);
    for (let i = start; i < nums.length; ++i) {
      if (i === start || nums[i] !== nums[i - 1]) {
        path.push(nums[i]);
        subsetsDfs(i + 1);
        path.pop();
      }
    }
  }
}
