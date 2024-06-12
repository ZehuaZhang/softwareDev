/*
144. Binary Tree Preorder Traversal

Given the root of a binary tree, return the preorder traversal of its nodes' values.

 

Example 1:


Input: root = [1,null,2,3]
Output: [1,2,3]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 

Follow up: Recursive solution is trivial, could you do it iteratively?
*/

function preorderTraversal(root: TreeNode | null): number[] {
  const stk: TreeNode[] = [];
  const rslt: number[] = [];

  if (root) {
    stk.push(root);
  }

  while (stk.length) {
    const node = stk.pop();
    rslt.push(node.val);
    if (node.right) {
      stk.push(node.right);
    }
    if (node.left) {
      stk.push(node.left);
    }
  }

  return rslt;
}
