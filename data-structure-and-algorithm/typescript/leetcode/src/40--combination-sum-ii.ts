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
  const n = candidates.length;
  const path: number[] = [];
  const rslt: number[][] = [];

  candidates.sort((a, b) => a - b);

  dfs(0, target);

  return rslt;

  function dfs(i0: number, sum: number) {
      if (sum === 0) {
          return rslt.push([...path]);
      }

      for (let i = i0; i < n; ++i) {
          if (i === i0 || candidates[i] !== candidates[i - 1]) {
              const d = sum - candidates[i];
              if (d >= 0) {
                  path.push(candidates[i]);
                  dfs(i + 1, d);
                  path.pop();
              }
          }
      }
  }
};