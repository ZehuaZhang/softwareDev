/*
108. Convert Sorted Array to Binary Search Tree

Given an integer array nums where the elements are sorted in ascending order, convert it to a 
height-balanced
 binary search tree.

 

Example 1:


Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:

Example 2:


Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
 

Constraints:

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums is sorted in a strictly increasing order.
*/

function sortedArrayToBST(nums: number[]): TreeNode | null {
  const n = nums.length;

  return dfs(0, n - 1);

  function dfs(l: number, r: number) {
    if (r < l) {
      return null;
    }

    const m = l + Math.trunc((r - l) / 2);

    const node = new TreeNode(nums[m]);
    node.left = dfs(l, m - 1);
    node.right = dfs(m + 1, r);

    return node;
  }
}
