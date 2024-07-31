/*
333. Largest BST Subtree

Given a binary tree, find the largest subtree which is a Binary Search Tree (BST), where largest means subtree with largest number of nodes in it.

Note:
A subtree must include all of its descendants.

Example:

Input: [10,5,15,1,8,null,7]

   10
   / \
  5  15
 / \   \
1   8   7

Output: 3
Explanation: The Largest BST Subtree in this case is the highlighted one.
             The return value is the subtree's size, which is 3.
Follow up:
Can you figure out ways to solve it with O(n) time complexity?
*/

function largestBSTSubtree(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let rslt = 1;
  dfs(root);

  return rslt;

  function dfs(node: TreeNode) {
    if (!node.left && !node.right) {
      return [1, node.val, node.val];
    }

    let [s1, mn1, mx1] = [0, node.val, node.val];
    if (node.left) {
      [s1, mn1, mx1] = dfs(node.left);
    }

    let [s2, mn2, mx2] = [0, node.val, node.val];
    if (node.right) {
      [s2, mn2, mx2] = dfs(node.right);
    }

    let s = 0;
    if (
      (!node.left || s1) &&
      (!node.right || s2) &&
      mx1 <= node.val &&
      node.val <= mn2
    ) {
      s = 1 + s1 + s2;
      rslt = Math.max(rslt, s);
    }

    return [s, mn1, mx2];
  }
}
