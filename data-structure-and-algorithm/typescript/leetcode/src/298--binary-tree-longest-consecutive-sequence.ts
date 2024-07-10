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
  dfs(root, NaN, 0);

  return rslt;

  function dfs(node: TreeNode| null, v: number, l: number) {
    if (!node) {
      return;
    }

    if (node.val === v + 1) {
      ++l;
    } else {
      l = 1;
    }

    rslt = Math.max(rslt, l);
    dfs(node.left, root.val, l);
    dfs(node.right, root.val, l);
  }
}