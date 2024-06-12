/*
60. Permutation Sequence

The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.

 

Example 1:

Input: n = 3, k = 3
Output: "213"
Example 2:

Input: n = 4, k = 9
Output: "2314"
Example 3:

Input: n = 3, k = 1
Output: "123"
 

Constraints:

1 <= n <= 9
1 <= k <= n!
*/

function getPermutation(n: number, k: number): string {
  const result: number[] = [];
  dfs(
    0,
    [...Array(n)].map((_, i) => i + 1)
  );
  return result.join('');

  function dfs(start: number, path: number[]) {
    if (k === 0) {
      return;
    }
    if (start === n - 1) {
      if (--k === 0) {
        result.push(...path);
      }
      return;
    }
    path.splice(start, path.length, ...path.slice(start).sort((a, b) => a - b));
    for (let i = start; i < n; ++i) {
      swap(path, i, start);
      dfs(start + 1, [...path]);
      swap(path, i, start);
    }
  }

  function swap(nums: number[], i: number, j: number) {
    const tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
  }
}
