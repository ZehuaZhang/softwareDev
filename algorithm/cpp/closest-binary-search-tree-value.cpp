// 270. Closest Binary Search Tree Value
// Difficulty : Easy 

// Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

// Note:

// Given target value is a floating point.
// You are guaranteed to have only one unique value in the BST that is closest to the target.

// Time:  O(h)
// Space: O(1)

class Solution {
public:
  int closestValue(TreeNode* root, double target) {
    double gap = INT_MAX;
    int closest = INT_MAX;
    
    while (root) {
      if (abs(static_cast<double>(root->val) - target) < gap) {
        gap = abs(static_cast<double>(root->val) - target);
        closest = root->val;
      }
      if (target == root->val) {
        break;
      } else if (target < root->val) {
        root = root->left;
      } else {
        root = root->right;
      }
    }
    return closest;
  }
};
