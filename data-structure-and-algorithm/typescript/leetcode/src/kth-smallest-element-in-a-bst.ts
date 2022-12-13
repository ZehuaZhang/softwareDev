/*
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.



Example 1:


Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:


Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3


Constraints:

The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104


Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';
import {Stack} from './data-structure/Stack';

function kthSmallest(root: Nullable<TreeNode<number>>, kth: number): number {
  const stack = new Stack<TreeNode<number>>();
  let count = 0;
  for (let node = root; stack.size || node; ) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      if (++count === kth) {
        return node.data;
      }
      result.push(node.data);
      node = node.right;
    }
  }
  return NaN;
}
