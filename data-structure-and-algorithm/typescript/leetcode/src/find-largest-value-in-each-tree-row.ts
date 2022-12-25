/*

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).





Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]
Example 3:

Input: root = [1]
Output: [1]
Example 4:

Input: root = [1,null,2]
Output: [1,2]
Example 5:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function largestValues(root: Nullable<TreeNode<number>>): number[] {
  const result: number[] = [];
  largestValuesDfs(root, 0);
  return result;

  function largestValuesDfs(
    node: Nullable<TreeNode<number>>,
    level: number
  ): void {
    if (!node) {
      return;
    }
    if (level === result.length) {
      result.push(node.data);
    } else {
      result[level] = Math.max(result[level], node.data);
    }
    largestValuesDfs(node.left, level + 1);
    largestValuesDfs(node.right, level + 1);
  }
}
