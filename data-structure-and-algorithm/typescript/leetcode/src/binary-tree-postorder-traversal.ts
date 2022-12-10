/*
Given the root of a binary tree, return the postorder traversal of its nodes' values.



Example 1:


Input: root = [1,null,2,3]
Output: [3,2,1]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
Example 4:


Input: root = [1,2]
Output: [2,1]
Example 5:


Input: root = [1,null,2]
Output: [2,1]


Constraints:

The number of the nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100


Follow up: Recursive solution is trivial, could you do it iteratively?
*/

import {Nullable} from './util/object';
import {TreeNode} from './data-structure/BinaryTree';
import {Stack} from './data-structure/Stack';

function postorderTraversal(root: Nullable<TreeNode>): number[] {
  const stack = new Stack();
  const result: number[] = [];
  let node = root;

  while (stack.size || node) {
    if (node) {
      stack.push(node);
      result.push(node.data);
      node = node.right;
    } else {
      node = stack.pop();
      node = node!.left;
    }
  }
  return result.reverse();
}
