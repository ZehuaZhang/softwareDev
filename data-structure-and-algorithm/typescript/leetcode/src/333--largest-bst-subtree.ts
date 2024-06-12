/*
333. Largest BST Subtree

Given a binary tree, find the largest subtree which is a Binary Search Tree (BST), where largest means subtree with largest number of nodes in it.

Note:
A subtree must include all of its descendants.

Example:

Input: [10,5,15,1,8,null,7]

   10
   / \
  5  15
 / \   \
1   8   7

Output: 3
Explanation: The Largest BST Subtree in this case is the highlighted one.
             The return value is the subtree's size, which is 3.
Follow up:
Can you figure out ways to solve it with O(n) time complexity?
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function largestBSTSubtree(root: Nullable<TreeNode<number>>): number {
  if (!root) {
    return 0;
  }
  let result = 1;
  largestBSTSubtreeDfs(root);
  return result;

  function largestBSTSubtreeDfs(
    node: TreeNode<number>
  ): [number, number, number] {
    if (!node.left && !node.right) {
      return [1, node.data, node.data];
    }

    let [size1, min1, max1] = [0, node.data, node.data];
    if (node.left) {
      [size1, min1, max1] = largestBSTSubtreeDfs(node.left);
    }

    let [size2, min2, max2] = [0, node.data, node.data];
    if (node.right) {
      [size2, min2, max2] = largestBSTSubtreeDfs(node.right);
    }

    let size = 0;
    if (
      (!node.left || size1) &&
      (!node.right || size2) &&
      max1 <= node.data &&
      node.data <= min2
    ) {
      size = 1 + size1 + size2;
      result = Math.max(result, size);
    }
    return [size, min1, max2];
  }
}
