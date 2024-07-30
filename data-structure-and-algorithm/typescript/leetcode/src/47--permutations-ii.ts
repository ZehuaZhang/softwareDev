/*
47. Permutations II

Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

function permuteUnique(nums: number[]): number[][] {
  const n = nums.length;
  const path: number[] = [];
  const rslt: number[][] = [];
  const seen: boolean[] = Array(n).fill(false);

  nums.sort((a, b) => a - b);

  dfs();

  return rslt;

  function dfs() {
    if (path.length === n) {
      return rslt.push([...path]);
    }

    for (let i = 0; i < n; ++i) {
      if (!seen[i] && (i === 0 || seen[i - 1] || nums[i] !== nums[i - 1])) {
        seen[i] = true;
        path.push(nums[i]);
        dfs();
        path.pop();
        seen[i] = false;
      }
    }
  }
}
