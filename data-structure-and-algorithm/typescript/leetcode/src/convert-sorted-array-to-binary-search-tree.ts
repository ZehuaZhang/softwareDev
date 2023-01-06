/*
108. Convert Sorted Array to Binary Search Tree

Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

Time:  O(n)
Space: O(h)
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function sortedArrayToBST(list: number[]): Nullable<TreeNode<number>> {
  return sortedArrayToBSTDfs(0, list.length);

  function sortedArrayToBSTDfs(
    left: number,
    right: number
  ): Nullable<TreeNode<number>> {
    if (left >= right) {
      return null;
    }
    const mid = left + Math.trunc((right - left) / 2);
    const root = new TreeNode(list[mid]);
    root.left = sortedArrayToBSTDfs(left, mid);
    root.right = sortedArrayToBSTDfs(mid + 1, right);
    return root;
  }
}
