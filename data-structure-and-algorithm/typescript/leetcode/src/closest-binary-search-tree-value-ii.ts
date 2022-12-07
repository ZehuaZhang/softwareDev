/*
Given a non-empty binary search tree and a target value, find k values in the BST that are closest to the target.

Note:

Given target value is a floating point.
You may assume k is always valid, that is: k ≤ total nodes.
You are guaranteed to have only one unique set of k values in the BST that are closest to the target.
Example:

Input: root = [4,2,5,1,3], target = 3.714286, and k = 2

    4
   / \
  2   5
 / \
1   3

Output: [4,3]
Follow up:
Assume that the BST is balanced, could you solve it in less than O(n) runtime (where n = total nodes)?
*/

function closestKValues(node, target, k) {
  const result = [];
  dfs(node, target, k, result);
  return result;
}

function dfs(node, target, k, result) {
  if (!node) {
    return;
  }
  dfs(node.left, target, k, result);
  if (result.length < k) {
    result.push(node.val);
  } else if (Math.abs(node.val - target) < Math.abs(result[0] - target)) {
    result.shift();
    result.push(node.val);
  } else {
    return;
  }
  dfs(node.right, target, k, result);
}
