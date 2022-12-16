// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Difficulty: Medium

// Given preorder and inorder traversal of a tree, construct the binary tree.

// Note:
// You may assume that duplicates do not exist in the tree.

// Time:  O(n)
// Space: O(h)

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function buildTreePreInOrder(
  preorder: number[],
  inorder: number[]
): Nullable<TreeNode<number>> {
  return buildTreePreInOrderDfs(0, preorder.length - 1, 0, inorder.length - 1);

  function buildTreePreInOrderDfs(
    preLeft: number,
    preRight: number,
    inLeft: number,
    inRight: number
  ): Nullable<TreeNode<number>> {
    if (preLeft > preRight || inLeft > inRight) {
      return null;
    }
    const data = preorder[preLeft];
    const node = new TreeNode(inorder[inRight]);
    let inNode = inLeft;
    for (; inNode <= inRight && inorder[inNode] !== data; ++inNode);
    const leftNodeCount = inNode - inLeft;

    node.left = buildTreePreInOrderDfs(
      preLeft + 1,
      preLeft + leftNodeCount,
      inLeft,
      inNode - 1
    );
    node.right = buildTreePreInOrderDfs(
      preLeft + leftNodeCount + 1,
      preRight,
      inNode + 1,
      inRight
    );

    return node;
  }
}
