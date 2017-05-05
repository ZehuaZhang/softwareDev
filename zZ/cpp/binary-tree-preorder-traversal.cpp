// 144. Binary Tree Preorder Traversal
// Difficulty: Medium
// Given a binary tree, return the preorder traversal of its nodes values.

// For example:
// Given binary tree {1,#,2,3},
//    1
//     \
//      2
//     /
//    3
// return [1,2,3].

// Note: Recursive solution is trivial, could you do it iteratively?

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  vector<int> preorderTraversal(TreeNode* root) {
    stack<const TreeNode *> s;
    if (root) {
      s.push(root);
    }
    vector<int> result;
    while (!s.empty()) {
      const TreeNode* curr = s.top(); s.pop();
      result.push_back(curr->val);
      
      if (curr->right) {
        s.push(curr->right);
      }
      if (curr->left) {
        s.push(curr->left);
      }
    }
    return result;
  }
};


// Time:  O(n)
// Space: O(1)

class Solution2 {
public:
  vector<int> preorderTraversal(TreeNode* root) {
    vector<int> res;
    TreeNode* curr = root;
    while (curr) {
      if (!curr->left) {
        res.emplace_back(curr->val);
        curr = curr->right;
      } else {
        auto *node = curr->left;
        while (node->right && node->right != curr) {
          node = node->right;
        }
        if (!node->right) {
          res.emplace_back(curr->val);
          node->right = curr;
          curr = curr->left;
        } else {
          node->right = nullptr;
          curr = curr->right;
        }
      }
    }
    return res; 
  }
};
