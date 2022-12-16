/*
106. Construct Binary Tree from Inorder and Postorder Traversal
Difficulty: Medium

Given inorder and postorder traversal of a tree, construct the binary tree.
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function buildTreeInPostOrder(
  inorder: number[],
  postorder: number[]
): Nullable<TreeNode<number>> {
  return buildTreeInPostOrderDfs(
    0,
    inorder.length - 1,
    0,
    postorder.length - 1
  );

  function buildTreeInPostOrderDfs(
    inLeft: number,
    inRight: number,
    postLeft: number,
    postRight: number
  ): Nullable<TreeNode<number>> {
    if (inLeft > inRight || postLeft > postRight) {
      return null;
    }
    const data = postorder[postRight];
    const node = new TreeNode(postorder[postRight]);
    let inNode = inLeft;
    for (; inNode <= inRight && inorder[inNode] !== data; ++inNode);
    const leftNodeCount = inNode - inLeft;

    node.left = buildTreeInPostOrderDfs(
      inLeft,
      inNode - 1,
      postLeft,
      postLeft + leftNodeCount - 1
    );
    node.right = buildTreeInPostOrderDfs(
      inNode + 1,
      inRight,
      postLeft + leftNodeCount,
      postRight - 1
    );

    return node;
  }
}
