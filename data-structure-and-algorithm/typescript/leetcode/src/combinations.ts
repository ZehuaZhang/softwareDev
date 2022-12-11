/*
Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].

You may return the answer in any order.



Example 1:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
Example 2:

Input: n = 1, k = 1
Output: [[1]]


Constraints:

1 <= n <= 20
1 <= k <= n
*/

function combine(range: number, count: number): number[][] {
  const result: number[][] = [];
  combineDfs(1, []);
  return result;

  function combineDfs(start: number, path: number[]) {
    if (path.length === count) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= range; ++i) {
      path.push(i);
      combineDfs(i + 1, path);
      path.pop();
    }
  }
}
