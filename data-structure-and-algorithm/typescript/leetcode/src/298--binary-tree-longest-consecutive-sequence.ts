/*
298. Binary Tree Longest Consecutive Sequence

Given a binary tree, find the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).

Example 1:

Input:

   1
    \
     3
    / \
   2   4
        \
         5

Output: 3

Explanation: Longest consecutive sequence path is 3-4-5, so return 3.

Example 2:

Input:

   2
    \
     3
    / 
   2    
  / 
 1

Output: 2 

Explanation: Longest consecutive sequence path is 2-3, not 3-2-1, so return 2.
*/

function longestConsecutive(root: TreeNode | null) {
  let rslt = 0;
  dfs(root, root.val, 0);
  return rslt;

  function dfs(root: TreeNode | null, v: number, len: number) {
    if (root === null) {
      return;
    }
    if (root.val === v + 1) {
      ++len;
    } else {
      len = 1;
    }
    rslt = Math.max(rslt, len);
    dfs(root.left, root.val, len);
    dfs(root.right, root.val, len);
  }
}
