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

function getPermutation(n, k) {
  const result = [];
  const curr = [...Array(n)].map((_, i) => i + 1);
  const count = [k];
  dfs(n, count, 0, curr, result);
  return result.join('');
}

function dfs(n, count, left, curr, result) {
  if (count[0] === 0) {
    return;
  }
  if (left === n - 1) {
    if (--count[0] === 0) {
      result.splice(0, result.length, ...curr);
    }
    return;
  }
  curr = [...curr.slice(0, left), ...curr.slice(left).sort((a, b) => a - b)];
  for (let i = left; i < n; ++i) {
    swap(curr, i, left);
    dfs(n, count, left + 1, [...curr], result);
    swap(curr, i, left);
  }
}

function swap(nums, i, j) {
  const value = nums[i];
  nums[i] = nums[j];
  nums[j] = value;
}
