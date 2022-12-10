/*
Given a binary tree, find the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).

Example 1:

Input:

   1
    \
     3
    / \
   2   4
        \
         5

Output: 3

Explanation: Longest consecutive sequence path is 3-4-5, so return 3.
Example 2:

Input:

   2
    \
     3
    /
   2
  /
 1

Output: 2

Explanation: Longest consecutive sequence path is 2-3, not 3-2-1, so return 2.
*/

import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';
import {TreeNode, BinaryTree} from './data-structure/BinaryTree';

function longestConsecutive(root: Nullable<TreeNode>): number {
  return longestConsecutiveDfs(root, null, 0);

  function longestConsecutiveDfs(
    node: Nullable<TreeNode>,
    prev: Nullable<TreeNode>,
    result: number
  ): number {
    if (node === null) {
      return result;
    }
    result = prev && node.data === prev.data + 1 ? result + 1 : 1;
    return Math.max(
      result,
      longestConsecutiveDfs(node.left, node, result),
      longestConsecutiveDfs(node.right, node, result)
    );
  }
}

// test
const tree1 = new BinaryTree(1, null, 3, 2, 4, null, null, null, 5);
const tree2 = new BinaryTree(2, null, 3, 2, null, 1);

tree1.printLevel();
tree2.printLevel();

const testInputListCollection = [[tree1.root], [tree2.root]];

const expectedResultList = [3, 2];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  longestConsecutive
);
