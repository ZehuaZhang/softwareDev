/*
199. Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

 

Example 1:


Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Example 2:

Input: root = [1,null,3]
Output: [1,3]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
*/

function rightSideView(root: TreeNode | null): number[] {
  const rslt: number[] = [];
  const q: TreeNode[] = [];
  if (root) {
      q.push(root);
  }

  while (q.length) {
      for (let l = q.length; l; --l) {
          const node = q.shift();
          if (l === 1) {
              rslt.push(node.val);
          }

          if (node.left) {
              q.push(node.left);
          }

          if (node.right) {
              q.push(node.right);
          }
      }
  }

  return rslt;
};
