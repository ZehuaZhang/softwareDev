/*
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.



Example 1:


Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:

Input: root = [1]
Output: ["1"]


Constraints:

The number of nodes in the tree is in the range [1, 100].
-100 <= Node.val <= 100
*/

function binaryTreePaths(root: TreeNode | null): string[] {
  const result: string[] = [];
  dfs(root, []);
  return result;

  function dfs(node: TreeNode | null, path: number[]) {
    if (node === null) {
      return;
    }

    path.push(node.val);
    if (node.left === null && node.right === null) {
      result.push([...path].join('->'));
    } else {
      dfs(node.left, path);
      dfs(node.right, path);
    }
    path.pop();
  }
}
