// 99. Recover Binary Search Tree
// Difficulty: Hard

// Two elements of a binary search tree (BST) are swapped by mistake.

// Recover the tree without changing its structure.

// Note:
// A solution using O(n) space is pretty straight forward. Could you devise a constant space solution?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  void recoverTree(TreeNode *root) {
    morrisInorderTraversal(root);
  }

private:
  void morrisInorderTraversal(TreeNode *root) {
    if (!root) {
      return;
    }
    pair<TreeNode*, TreeNode*> broken;
    for (TreeNode* prev = nullptr, *curr = root; curr) {
      if (!curr->left) {
        detect(prev, curr, broken);
        prev = curr;
        curr = curr->right;
      } else {
        TreeNode* node = curr->left;
        while (node->right && node->right != curr) {
          node = node->right;
        }
        if (!node->right) {
          node->right = curr;
          curr = curr->left;
        } else {
          detect(prev, curr, broken);
          node->right = nullptr;
          prev = curr;
          curr = curr->right;
        }
      }
    }
    swap(broken.first->val, broken.second->val);
  }

  void detect(TreeNode* prev, TreeNode* curr, pair<TreeNode*, TreeNode*>& broken) {
    if (prev && prev->val > curr->val) {
      if (!broken.first) { // Find the first broken node.
        broken.first = prev;
      }
      broken.second = curr;  // Find the last broken node.
    }
  }
};
