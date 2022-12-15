/*
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.

A leaf is a node with no children.



Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: []
Example 3:

Input: root = [1,2], targetSum = 0
Output: []
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function pathSumRootToLeaf(
  root: Nullable<TreeNode<number>>,
  sum: number
): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  pathSumRootToLeafDfs(root, sum);
  return result;

  function pathSumRootToLeafDfs(
    node: Nullable<TreeNode<number>>,
    sum: number
  ): void {
    if (node === null) {
      return;
    }
    if (node.left === null && node.right === null && node.data === sum) {
      result.push([...path, node.data]);
      return;
    }
    path.push(node.data);
    pathSumRootToLeafDfs(node.left, sum - node.data);
    pathSumRootToLeafDfs(node.right, sum - node.data);
    path.pop();
  }
}
