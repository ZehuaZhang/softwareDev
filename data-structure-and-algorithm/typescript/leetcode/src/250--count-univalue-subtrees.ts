/*
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
  isUnival(root, -1);
  return rslt;

  function isUnival(root: TreeNode | null, val: number) {
    if (root === null) {
      return true;
    }
    const l = isUnival(root.left, root.val);
    const r = isUnival(root.right, root.val);
    if (!l || !r) {
      return false;
    }
    ++rslt;
    return root.val === val;
  }
}
