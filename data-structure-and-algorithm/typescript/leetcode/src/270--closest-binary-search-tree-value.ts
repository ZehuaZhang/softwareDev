/*
270. Closest Binary Search Tree Value

Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

Note:

Given target value is a floating point.
You are guaranteed to have only one unique value in the BST that is closest to the target.
Example:

Input: root = [4,2,5,1,3], target = 3.714286

    4
   / \
  2   5
 / \
1   3

Output: 4
*/

function closestValueIterative(node: TreeNode, target: number): number {
  let rslt = node.val;

  while (node) {
    if (Math.abs(rslt - target) > Math.abs(node.val - target)) {
      rslt = node.val;
    }
    node = node.val < target ? node.right : node.left;
  }

  return rslt;
}
