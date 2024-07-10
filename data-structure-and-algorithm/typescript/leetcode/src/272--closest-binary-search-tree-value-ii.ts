/*
272. Closest Binary Search Tree Value II

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
function closestKValues(
  node: TreeNode,
  target: number,
  k: number
): number[] {
  const q: number[] = [];
  dfs(node);
  return q;

  function dfs(node: TreeNode | null) {
    if (!node) {
      return;
    }
    dfs(node.left);

    if (q.length < k) {
      q.push(node.val);
    } else if (Math.abs(q[0] - target) > Math.abs(node.val - target)) {
      q.shift();
      q.push(node.val);
    } else {
      return;
    }

    dfs(node.right);
  }
}