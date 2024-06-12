/*
40. Combination Sum II

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

 

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
*/

function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  candidates.sort((a, b) => a - b);
  dfs(target, 0, []);
  return result;

  function dfs(sum: number, start: number, path: number[]) {
    if (sum === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; ++i) {
      const diff = sum - candidates[i];
      if (diff >= 0 && (i === start || candidates[i] !== candidates[i - 1])) {
        path.push(candidates[i]);
        dfs(diff, i + 1, path);
        path.pop();
      }
    }
  }
}
