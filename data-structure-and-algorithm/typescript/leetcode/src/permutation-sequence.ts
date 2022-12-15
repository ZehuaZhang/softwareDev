/*
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

function getPermutation(range: number, kth: number): string {
  const result: number[] = [];
  const path: number[] = [...Array(range)].map((_, i) => i + 1);
  getPermutationDfs(0);
  return result.join('');

  function getPermutationDfs(start: number): void {
    if (kth === 0) {
      return;
    }
    if (start === range - 1) {
      if (--kth === 0) {
        result.splice(0, result.length, ...path);
      }
      return;
    }
    path.splice(start, path.length, ...path.slice(start).sort());
    for (let i = start; i < range; ++i) {
      swap(path, i, start);
      getPermutationDfs(start + 1);
      swap(path, i, start);
    }
  }

  function swap(nums: number[], i: number, j: number): void {
    const data = nums[i];
    nums[i] = nums[j];
    nums[j] = data;
  }
}
