/*
95. Unique Binary Search Trees II

Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

 

Example 1:


Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 8
*/

function generateTrees(n: number): Array<TreeNode | null> {
  if (n === 0) {
    return [];
  }
  return dfs(1, n);

  function dfs(s: number, e: number) {
    if (s > e) {
      return [null];
    }
    const result: (TreeNode | null)[] = [];
    for (let i = s; i <= e; ++i) {
      for (const l of dfs(s, i - 1)) {
        for (const r of dfs(i + 1, e)) {
          const node = new TreeNode(i);
          node.left = l;
          node.right = r;
          result.push(node);
        }
      }
    }
    return result;
  }
}
