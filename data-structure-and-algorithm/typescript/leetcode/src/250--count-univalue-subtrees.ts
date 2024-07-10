/*
250. Count Univalue Subtrees

Given a binary tree, count the number of uni-value subtrees.

A Uni-value subtree means all nodes of the subtree have the same value.

Example :

Input:  root = [5,1,5,5,5,null,5]

              5
             / \
            1   5
           / \   \
          5   5   5

Output: 4
*/

function countUnivalSubtrees(root: TreeNode | null) {
  let rslt = 0;

  dfs(root, NaN);

  return rslt;

  function dfs(node: TreeNode | null, v: number) {
    if (!node) {
      return true;
    }

    const l = dfs(node.left, node.val);
    const r = dfs(node.right, node.val);

    if (!l || !r) {
      return false;
    }

    ++rslt;

    return root.val === v;
  }
}