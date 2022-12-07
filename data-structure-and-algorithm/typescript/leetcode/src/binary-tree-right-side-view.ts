/*
Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.



Example 1:


Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Example 2:

Input: root = [1,null,3]
Output: [1,3]
Example 3:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
*/

function rightSideView(root) {
  const result = [];
  dfs(root, 0, result);
  return result;
}

function dfs(node, level, result) {
  if (node === null) {
    return;
  }
  if (result.length === level) {
    result.push(node.val);
  }
  dfs(node.right, level + 1, result);
  dfs(node.left, level + 1, result);
}

function rightSideView2(root) {
  const q = new Queue();
  if (root !== null) {
    q.push(root);
  }
  const result = [];
  while (!q.isEmpty()) {
    for (let size = q.size; size > 0; --size) {
      const node = q.pop();
      if (size === 1) {
        result.push(node.val);
      }
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }
  return result;
}
