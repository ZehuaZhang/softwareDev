/*
Given a binary search tree and a node in it, find the in-order successor of that node in the BST.

The successor of a node p is the node with the smallest key greater than p.val.



Example 1:


Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.
Example 2:


Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.


Note:

If the given node has no in-order successor in the tree, return null.
It's guaranteed that the values of the tree are unique.
*/

import {BinaryTree, TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';

function inorderSuccessor(
  root: Nullable<TreeNode<number>>,
  node: TreeNode<number>
): Nullable<TreeNode<number>> {
  let result: Nullable<TreeNode<number>> = null;
  for (let curr = root; curr; ) {
    if (node.data < curr.data) {
      result = curr;
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }
  return result;
}

// tests

const tree1 = new BinaryTree(2, 1, 3);
const tree2 = new BinaryTree(5, 3, 6, 2, 4, null, null, 1);

tree1.printLevel();
tree2.printLevel();

const testInputListCollection = [
  [tree1.root, tree1.root!.left],
  [tree2.root, tree2.root!.right],
];

const expectedResultList = [tree1.root, null];

runTestCaseList(testInputListCollection, expectedResultList, inorderSuccessor);
