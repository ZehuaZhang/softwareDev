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
  let rslt: string = "";

  dfs(
    0,
    [...Array(n)].map((_, i) => i + 1)
  );

  return rslt;

  function dfs(i0: number, path: number[]) {
    if (!k) {
      return;
    }

    if (i0 === n - 1) {
      if (--k === 0) {
        rslt = path.join("");
      }
      return;
    }

    path.splice(i0, path.length, ...path.slice(i0).sort((a, b) => a - b));
    for (let i = i0; i < n; ++i) {
      swap(path, i, i0);
      dfs(i0 + 1, [...path]);
      swap(path, i, i0);
    }
  }

  function swap(num: number[], i: number, j: number) {
    [num[i], num[j]] = [num[j], num[i]];
  }
}
