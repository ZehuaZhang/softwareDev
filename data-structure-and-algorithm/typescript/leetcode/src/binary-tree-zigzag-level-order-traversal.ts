/*
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100
*/

import {Nullable} from './util/object';
import {TreeNode} from './data-structure/BinaryTree';
import {Queue} from './data-structure/Queue';

function zigzagLevelOrder(root: Nullable<TreeNode>): number[][] {
  let isLeft = true;
  const result: number[][] = [];
  const queue = new Queue();

  if (root !== null) {
    queue.push(root);
  }
  while (!queue.isEmpty()) {
    const {size} = queue;
    result.push(Array(size).fill(0));
    for (let i = 0; i < size; ++i) {
      const node = queue.pop();
      const idx = isLeft ? i : size - 1 - i;
      result[result.length - 1][idx] = node.data;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    isLeft = !isLeft;
  }
  return result;
}
