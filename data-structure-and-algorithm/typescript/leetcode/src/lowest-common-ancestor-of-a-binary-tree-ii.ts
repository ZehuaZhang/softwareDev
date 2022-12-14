/*
Given the root of a binary tree, return the lowest common ancestor (LCA) of two given nodes, p and q. If either node p or q does not exist in the tree, return null. All values of the nodes in the tree are unique.

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a binary tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)". A descendant of a node x is a node y that is on the path from node x to some leaf node.



Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.
Example 3:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.


Constraints:

The number of nodes in the tree is in the range [1, 104].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
*/

import {BinaryTree, TreeNode} from './data-structure/BinaryTree';
import {lowestCommonAncestor} from './lowest-common-ancestor-of-a-binary-tree';
import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';

function lowestCommonAncestorII(
  root: Nullable<TreeNode<number>>,
  p: Nullable<TreeNode<number>>,
  q: Nullable<TreeNode<number>>
): Nullable<TreeNode<number>> {
  return lowestCommonAncestor(root, p, q);
}

function lowestCommonAncestorII_diameter(
  root: Nullable<TreeNode<number>>,
  p: Nullable<TreeNode<number>>,
  q: Nullable<TreeNode<number>>
): Nullable<TreeNode<number>> {
  let result: Nullable<TreeNode<number>> = null;
  lowestCommonAncestorIIDfs(root, p, q);
  return result;

  function lowestCommonAncestorIIDfs(
    node: Nullable<TreeNode<number>>,
    p: Nullable<TreeNode<number>>,
    q: Nullable<TreeNode<number>>
  ): number {
    if (!node || result) {
      return 0;
    }
    const left = lowestCommonAncestorIIDfs(node.left, p, q);
    const right = lowestCommonAncestorIIDfs(node.right, p, q);
    const mid = node === p || node === q ? 1 : 0;
    const sum = left + right + mid;
    if (sum > 1) {
      result = node;
    }
    return sum > 0 ? 1 : 0;
  }
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
  lowestCommonAncestorII_diameter
);
