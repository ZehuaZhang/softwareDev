/*
46. Permutations

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

function permute(nums: number[]): number[][] {
  const n = nums.length;
  const path: number[] = [];
  const rslt: number[][] = [];
  const seen: boolean[] = Array(n).fill(false);

  dfs();

  return rslt;

  function dfs() {
    if (path.length === n) {
      return rslt.push([...path]);
    }

    for (let i = 0; i < n; ++i) {
      if (!seen[i]) {
        seen[i] = true;
        path.push(nums[i]);
        dfs();
        path.pop();
        seen[i] = false;
      }
    }
  }
}
