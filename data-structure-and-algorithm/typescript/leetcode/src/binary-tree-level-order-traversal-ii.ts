/*
Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
*/

import {Nullable} from './util/object';
import {TreeNode} from './data-structure/BinaryTree';

function levelOrderBottom(root: Nullable<TreeNode>): number[][] {
  const result: number[][] = [];
  levelOrderDfs(root, 0);
  return result.reverse();

  function levelOrderDfs(node: Nullable<TreeNode>, level: number) {
    if (node === null) {
      return;
    }
    if (result.length === level) {
      result.push([]);
    }
    result[level].push(node.data);
    levelOrderDfs(node.left, level + 1);
    levelOrderDfs(node.right, level + 1);
  }
}
