/*
Given a binary tree, you need to find the length of Longest Consecutive Path in Binary Tree.

Especially, this path can be either increasing or decreasing. For example, [1,2,3,4] and [4,3,2,1] are both considered valid, but the path [1,2,4,3] is not valid. On the other hand, the path can be in the child-Parent-child order, where not necessarily be parent-child order.

Example 1:

Input:
        1
       / \
      2   3
Output: 2
Explanation: The longest consecutive path is [1, 2] or [2, 1].


Example 2:

Input:
        2
       / \
      1   3
Output: 3
Explanation: The longest consecutive path is [1, 2, 3] or [3, 2, 1].


Note: All the values of tree nodes are in the range of [-1e7, 1e7].
*/

import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';
import {TreeNode, BinaryTree} from './data-structure/BinaryTree';

function longestConsecutiveII(root: Nullable<TreeNode>): number {
  if (root === null) {
    return 0;
  }
  const result =
    longestConsecutiveDfs(root, 1) + longestConsecutiveDfs(root, -1) + 1;
  return Math.max(
    result,
    longestConsecutiveII(root.left),
    longestConsecutiveII(root.right)
  );

  function longestConsecutiveDfs(node: Nullable<TreeNode>, diff: number) {
    if (node === null) {
      return 0;
    }
    let left = 0;
    let right = 0;
    if (node.left && node.data - node.left.data === diff) {
      left = 1 + longestConsecutiveDfs(node.left, diff);
    }
    if (node.right && node.data - node.right.data === diff) {
      right = 1 + longestConsecutiveDfs(node.right, diff);
    }
    return Math.max(left, right);
  }
}

// test
const tree1 = new BinaryTree(1, 2, 3);
const tree2 = new BinaryTree(2, 1, 3);

tree1.printLevel();
tree2.printLevel();

const testInputListCollection = [[tree1.root], [tree2.root]];

const expectedResultList = [2, 3];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  longestConsecutiveII
);
