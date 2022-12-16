/*
You have n binary tree nodes numbered from 0 to n - 1 where node i has two children leftChild[i] and rightChild[i], return true if and only if all the given nodes form exactly one valid binary tree.

If node i has no left child then leftChild[i] will equal -1, similarly for the right child.

Note that the nodes have no values and that we only use the node numbers in this problem.



Example 1:


Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true
Example 2:


Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
Output: false
Example 3:


Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
Output: false
Example 4:


Input: n = 6, leftChild = [1,-1,-1,4,-1,-1], rightChild = [2,-1,-1,5,-1,-1]
Output: false


Constraints:

1 <= n <= 104
leftChild.length == rightChild.length == n
-1 <= leftChild[i], rightChild[i] <= n - 1
*/

function validateBinaryTreeNodes(
  count: number,
  leftList: number[],
  rightList: number[]
) {
  const inDegree = Array(count).fill(0);
  let root = -1;
  for (let i = 0; i < count; ++i) {
    if (
      (leftList[i] !== -1 && ++inDegree[leftList[i]] > 1) ||
      (rightList[i] !== -1 && ++inDegree[rightList[i]] > 1)
    ) {
      return false;
    }
  }
  for (let i = 0; i < count; ++i) {
    if (inDegree[i] === 0) {
      if (root === -1) {
        root = i;
      } else {
        return false;
      }
    }
  }
  if (root === -1) {
    return false;
  }
  return getNodeCount(root) === count;

  function getNodeCount(node: number): number {
    if (node === -1) {
      return 0;
    }
    return 1 + getNodeCount(leftList[node]) + getNodeCount(rightList[node]);
  }
}
