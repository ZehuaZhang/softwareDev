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

import {Nullable} from './util/object';
import {TreeNode} from './data-structure/BinaryTree';

function binaryTreePaths(root: Nullable<TreeNode>): string[] {
  const result: string[] = [];
  binaryTreePathsDfs(root, []);
  return result;

  function binaryTreePathsDfs(node: Nullable<TreeNode>, path: number[]): void {
    if (!node) {
      return;
    }
    path.push(node.data);
    if (!node.left && !node.right) {
      result.push(path.join('->'));
    } else {
      binaryTreePathsDfs(node.left, path);
      binaryTreePathsDfs(node.right, path);
    }
    path.pop();
  }
}
