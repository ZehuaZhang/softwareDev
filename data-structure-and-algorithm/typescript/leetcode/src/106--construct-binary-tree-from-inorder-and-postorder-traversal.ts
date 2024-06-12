/*
106. Construct Binary Tree from Inorder and Postorder Traversal

Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

 

Example 1:


Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: inorder = [-1], postorder = [-1]
Output: [-1]
 

Constraints:

1 <= inorder.length <= 3000
postorder.length == inorder.length
-3000 <= inorder[i], postorder[i] <= 3000
inorder and postorder consist of unique values.
Each value of postorder also appears in inorder.
inorder is guaranteed to be the inorder traversal of the tree.
postorder is guaranteed to be the postorder traversal of the tree.
*/

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const map = new Map<number, number>();
  for (let i = 0; i < inorder.length; ++i) {
    map.set(inorder[i], i);
  }

  return dfs(0, inorder.length - 1, 0, postorder.length - 1);

  function dfs(iL: number, iR: number, pL: number, pR: number) {
    if (iL > iR || pL > pR) {
      return null;
    }

    const root = new TreeNode(postorder[pR]);
    const iN = map.get(root.val);
    const distL = iN - iL;

    root.left = dfs(iL, iN - 1, pL, pL + distL - 1);
    root.right = dfs(iN + 1, iR, pL + distL, pR - 1);

    return root;
  }
}
