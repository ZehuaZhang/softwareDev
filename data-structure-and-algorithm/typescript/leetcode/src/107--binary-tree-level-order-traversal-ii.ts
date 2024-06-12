/*
107. Binary Tree Level Order Traversal II

Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
*/

function levelOrderBottom(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  dfs(root, 0);
  return result.reverse();

  function dfs(node: TreeNode | null, level: number) {
    if (node === null) {
      return;
    }

    if (result.length === level) {
      result.push([]);
    }
    result[level].push(node.val);

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
}
