/*
270. Closest Binary Search Tree Value

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

import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';
import {TreeNode, BinaryTree} from './data-structure/BinaryTree';

function closestValueIterative(
  node: Nullable<TreeNode>,
  target: number
): number {
  let result = node?.data;
  while (node) {
    if (Math.abs(result - target) >= Math.abs(node.data - target)) {
      result = node.data;
    }
    node = target < node.data ? node.left : node.right;
  }
  return result;
}

function closestValue(node: Nullable<TreeNode>, target: number): number {
  let result = 0;
  let min = Infinity;
  closestValueDfs(node, target);
  return result;

  function closestValueDfs(node: Nullable<TreeNode>, target: number): void {
    if (!node) {
      return;
    }

    const diff = Math.abs(node.data - target);
    if (diff < min) {
      min = diff;
      result = node.data;
    }

    if (target < node.data) {
      closestValueDfs(node.left, target);
    } else {
      closestValueDfs(node.right, target);
    }
  }
}

// test
const tree = new BinaryTree(4, 2, 5, 1, 3);

tree.printLevel();

const testInputListCollection = [[tree.root, 3.714286]];

const expectedResultList = [4];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  closestValueIterative
);

runTestCaseList(testInputListCollection, expectedResultList, closestValue);
