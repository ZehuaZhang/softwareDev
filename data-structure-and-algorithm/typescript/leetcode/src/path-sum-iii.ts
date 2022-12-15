/*
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).



Example 1:


Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
Example 2:

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3


Constraints:

The number of nodes in the tree is in the range [0, 1000].
-109 <= Node.val <= 109
-1000 <= targetSum <= 1000
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Nullable} from './util/object';

function pathSum(root: Nullable<TreeNode<number>>, sum: number): number {
  const sumCountMap = new Map<number, number>();
  sumCountMap.set(0, 1);
  return pathSumDfs(root, 0);

  function pathSumDfs(node: Nullable<TreeNode<number>>, path: number) {
    if (!node) {
      return 0;
    }
    path += node.data;
    let result = sumCountMap.get(path - sum) || 0;
    sumCountMap.set(path, (sumCountMap.get(path) || 0) + 1);

    result += pathSumDfs(node.left, path) + pathSumDfs(node.right, path);
    sumCountMap.set(path, (sumCountMap.get(path) || 0) - 1);
    return result;
  }
}
