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
import {Nullable} from './util/object';
import {runTestCaseList} from './util/test';
import {TreeNode, BinaryTree} from './data-structure/BinaryTree';

function closestKValues(
  node: Nullable<TreeNode>,
  target: number,
  k: number
): Set<number> {
  const q: number[] = [];
  dfs(node);
  return new Set(q);

  function dfs(node: Nullable<TreeNode>): void {
    if (!node) {
      return;
    }
    dfs(node.left);
    if (q.length < k) {
      q.push(node.data);
    } else if (Math.abs(node.data - target) < Math.abs(q[0] - target)) {
      q.shift();
      q.push(node.data);
    } else {
      return;
    }
    dfs(node.right);
  }
}

// test
const tree = new BinaryTree(4, 2, 5, 1, 3);

tree.printLevel();

const testInputListCollection = [[tree.root, 3.714286, 2]];

const expectedResultList = [new Set([4, 3])];

runTestCaseList(testInputListCollection, expectedResultList, closestKValues);
