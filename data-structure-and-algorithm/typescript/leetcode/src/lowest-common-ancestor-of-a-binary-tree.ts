/*
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”



Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [1,2], p = 1, q = 2
Output: 1


Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the tree.
*/

import {BinaryTree, TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';

export function lowestCommonAncestor(
  root: Nullable<TreeNode<number>>,
  p: Nullable<TreeNode<number>>,
  q: Nullable<TreeNode<number>>
): Nullable<TreeNode<number>> {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  return left ? (right ? root : left) : right;
}

// test
const tree1 = new BinaryTree(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
const tree2 = new BinaryTree(3, 5, 1, 6, 2, 0, 8, null, null, 7, 4);
const tree3 = new BinaryTree(1, 2);

tree1.printLevel();
tree2.printLevel();
tree3.printLevel();

const testInputListCollection = [
  [tree1.root, tree1.root?.left, tree1.root?.right],
  [tree2.root, tree2.root?.left, tree2.root?.left?.right?.right],
  [tree1.root, tree2.root?.left, tree2.root?.right],
  [tree2.root, tree1.root?.left, tree1.root?.left?.right?.right],
  [tree3.root, tree3.root, tree3.root?.left],
];

const expectedResultList = [
  tree1.root,
  tree2.root?.left,
  null,
  null,
  tree3.root,
];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  lowestCommonAncestor
);
