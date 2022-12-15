/*
Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].



Example 1:


Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.
Example 2:


Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.


Constraints:

The number of nodes in the tree is in the range [1, 2 * 104].
1 <= Node.val <= 105
1 <= low <= high <= 105
All Node.val are unique.
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function rangeSumBST(
  root: Nullable<TreeNode<number>>,
  low: number,
  high: number
): number {
  if (root === null) {
    return 0;
  }
  if (root.data < low) {
    return rangeSumBST(root.right, low, high);
  }
  if (root.data > high) {
    return rangeSumBST(root.left, low, high);
  }
  return (
    root.data +
    rangeSumBST(root.left, low, root.data) +
    rangeSumBST(root.right, root.data, high)
  );
}
