/*
222. Count Complete Tree Nodes
Difficulty: Medium

Given a complete binary tree, count the number of nodes.

Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled,
and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function countNodes(root: Nullable<TreeNode<number>>): number {
  let [hLeft, hRight] = [0, 0];
  for (let left = root; left; left = left.left) {
    ++hLeft;
  }
  for (let right = root; right; right = right.right) {
    ++hRight;
  }
  if (hLeft === hRight) {
    return Math.pow(2, hLeft) - 1;
  }
  return countNodes(root!.left) + countNodes(root!.right) + 1;
}
