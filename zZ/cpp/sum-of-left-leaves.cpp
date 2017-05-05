// 404. Sum of Left Leaves
// Difficulty: Easy

// Find the sum of all left leaves in a given binary tree.

// Example:

//     3
//    / \
//   9  20
//     /  \
//    15   7

// There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
  int sumOfLeftLeaves(TreeNode* root) {
    return sumOfLeftLeavesHelper(root, false);
  }

private:
  int sumOfLeftLeavesHelper(TreeNode* root, bool isLeft) {
    if (!root) {
      return 0;
    }
    if (!root->left && !root->right) {
      return isLeft ? root->val : 0;
    }
    return sumOfLeftLeavesHelper(root->left, true) + sumOfLeftLeavesHelper(root->right, false);
  }
};