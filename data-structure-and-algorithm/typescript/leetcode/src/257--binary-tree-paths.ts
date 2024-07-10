/*
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.



Example 1:


Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:

Input: root = [1]
Output: ["1"]


Constraints:

The number of nodes in the tree is in the range [1, 100].
-100 <= Node.val <= 100
*/

function binaryTreePaths(root: TreeNode | null): string[] {
  const path: number[] = [];
  const rslt: string[] = [];

  dfs(root);

  return rslt;

  function dfs(node: TreeNode | null) {
      if (!node) {
          return null;
      }

      path.push(node.val);
      if (!node.left && !node.right) {
          rslt.push(path.join('->'));
      } else {
          dfs(node.left);
          dfs(node.right);
      }
      path.pop();
  }
};
