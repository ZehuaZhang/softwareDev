// 222. Count Complete Tree Nodes
// Difficulty: Medium

// Given a complete binary tree, count the number of nodes.

// Definition of a complete binary tree from Wikipedia:
// In a complete binary tree every level, except possibly the last, is completely filled, 
// and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Time:  O(h * logn) = O((logn)^2)
// Space: O(1)

class Solution {
public:
  int countNodes(TreeNode* root) {
    int hLeft = 0, hRight = 0;
    for (TreeNode* left = root; left;) {
      ++hLeft;
      left = left->left;
    }
    for (TreeNode* right = root; right;) {
      ++hRight;
      right = right->right;
    }
    if (hLeft == hRight) { 
      return pow(2, hLeft) - 1;
    }
    return countNodes(root->left) + countNodes(root->right) + 1;
  }
};
