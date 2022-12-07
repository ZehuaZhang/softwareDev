/*
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

function largestBSTSubtree(root) {
  if (!root) {
    return 0;
  }
  let result = 1;
  dfs(root, result);
  return result;

  function dfs(node) {
    if (!node.left && !node.right) {
      return [1, node.val, node.val];
    }

    let [size1, min1, max1] = [0, node.val, node.val];
    if (node.left) {
      [size1, min1, max1] = dfs(node.left);
    }

    let [size2, min2, max2] = [0, node.val, node.val];
    if (node.right) {
      [size2, min2, max2] = dfs(node.right);
    }

    let size = 0;
    if (
      (!node.left || size1) &&
      (!node.right || size2) &&
      max1 <= node.val &&
      node.val <= min2
    ) {
      size = 1 + size1 + size2;
      result = max(result, size);
    }
    return [size, min1, max2];
  }
}
