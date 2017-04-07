// Find Predecessor and Successor in BST

// findPredSucc(root, target, nullptr, nullptr);

class Solution {
public:
  void findPredSucc(TreeNode* root, int target, TreeNode*& pred, TreeNode*& succ) {
    while (root) {
      if (root->val == target) {
        if (root->left) {
          pred = root->left;
          while (pred->right) {
            pred = pred->right;
          }
        }
        if (root->right) {
          succ = root->right;
          while (succ->left) {
            succ = succ->left;
          }
        }
      } else if (root->val > target) {
        succ = root;
        root = root->left;
      } else {
        pred = root;
        root = root->right;
      }
    }
  }
};

// with parent node
class Solution {
public:
  void findPredSucc(TreeNode* root, TreeNode* node, TreeNode* &pred, TreeNode* &succ) {
    if (node) {
      if (node->left) {
        pred = node->left;
        while (pred->right) {
          pred = pred->right;
        }
      }
      if (node->right) {
        succ = node->right;
        while (succ->left) {
          succ = succ->left;
        }
      }
    }
    if (!node->right) {
      succ = node->parent;
      for (TreeNode* curr = node; succ && succ->right == curr; curr = succ, succ = succ-> parent);
    }
    if (!node->left) {
      prev = node->parent;
      for (TreeNode* curr = node; prev && prev->left == curr; curr = prev, prev = prev-> parent);
    }
  }
};