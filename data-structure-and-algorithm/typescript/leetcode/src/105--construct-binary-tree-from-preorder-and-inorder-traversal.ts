/*
105. Construct Binary Tree from Preorder and Inorder Traversal

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

 

Example 1:


Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]
 

Constraints:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder and inorder consist of unique values.
Each value of inorder also appears in preorder.
preorder is guaranteed to be the preorder traversal of the tree.
inorder is guaranteed to be the inorder traversal of the tree.
*/

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const m = inorder.length;
  const map = new Map<number, number>();
  for (let i = 0; i < m; ++i) {
      map.set(inorder[i], i);
  }

  return dfs(0, m - 1, 0, m - 1);

  function dfs(pL: number, pR: number, iL: number, iR: number) {
      if (pR < pL || iR < iL) {
          return null;
      }

      const val = preorder[pL];
      const i = map.get(val);
      const dist = i - iL;

      const node = new TreeNode(val);
      node.left = dfs(pL + 1, pL + dist, iL, i - 1);
      node.right = dfs(pL + dist + 1, pR, i + 1, iR);

      return node;
  }
};
