/*
104. Maximum Depth of Binary Tree
Difficulty: Easy

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Time:  O(n)
Space: O(h)
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function maxDepth(root: Nullable<TreeNode<number>>): number {
  if (root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
