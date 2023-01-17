/*
We are given a binary tree (with root node root), a target node, and an integer value k.

Return a list of the values of all nodes that have a distance k from the target node.  The answer can be returned in any order.



Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2

Output: [7,4,1]

Explanation:
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.



Note that the inputs "root" and "target" are actually TreeNodes.
The descriptions of the inputs above are just serializations of these objects.


Note:

The given tree is non-empty.
Each node in the tree has unique values 0 <= node.val <= 500.
The target node is a node in the tree.
0 <= k <= 1000.
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function distanceK(
  node: Nullable<TreeNode<number>>,
  target: Nullable<TreeNode<number>>,
  k: number
): number[] {
  const nodeDistMap = new Map();
  const result: number[] = [];
  find(node, target, nodeDistMap);
  search(node, k, nodeDistMap, 0, result);
  return result;
}

function find(
  node: Nullable<TreeNode<number>>,
  target: Nullable<TreeNode<number>>,
  nodeDistMap: Map<TreeNode<number>, number>
): void {
  if (!node) {
    return;
  }
  if (node === target) {
    nodeDistMap.set(node, 0);
    return;
  }
  find(node.left, target, nodeDistMap);
  if (nodeDistMap.has(node.left!)) {
    nodeDistMap.set(node, nodeDistMap.get(node.left!)! + 1);
    return;
  }
  find(node.right, target, nodeDistMap);
  if (nodeDistMap.has(node.right!)) {
    nodeDistMap.set(node, nodeDistMap.get(node.right!)! + 1);
    return;
  }
}

function search(
  node: Nullable<TreeNode<number>>,
  k: number,
  nodeDistMap: Map<TreeNode<number>, number>,
  dist: number,
  result: number[]
) {
  if (!node) {
    return;
  }
  if (nodeDistMap.has(node)) {
    dist = nodeDistMap.get(node)!;
  }
  if (dist === k) {
    result.push(node.data);
  }
  search(node.left, k, nodeDistMap, dist + 1, result);
  search(node.right, k, nodeDistMap, dist + 1, result);
}
