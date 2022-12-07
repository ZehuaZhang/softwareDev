/*
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

let result;
let min;

function closestValue(node, target) {
  min = Infinity;
  result = 0;
  dfs(node, target);
  return result;
}

function dfs(node, target) {
  if (!node) {
    return;
  }

  if (Math.abs(node.val - target) < min) {
    min = Math.abs(node.val - target);
    result = node.val;
  }

  if (target < node.val) {
    dfs(node.left, target);
  } else {
    dfs(node.right, target);
  }
}

function closestValueBST(root, target) {
  let result = root.val;
  while (root) {
    if (Math.abs(result - target) >= Math.abs(root.val - target)) {
      result = root.val;
    }
    root = target < root.val ? root.left : root.right;
  }
  return result;
}
