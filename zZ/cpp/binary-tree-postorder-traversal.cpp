// 145. Binary Tree Postorder Traversal
// Difficulty: Hard

// Given a binary tree, return the postorder traversal of its nodes values.

// For example:
// Given binary tree {1,#,2,3},
//    1
//     \
//      2
//     /
//    3
// return [3,2,1].

// Note: Recursive solution is trivial, could you do it iteratively?

// Time:  O(n)
// Space: O(h)
class Solution {
public:
  vector<int> postorderTraversal(TreeNode* root) {
    vector<int> result;
    stack<const TreeNode*> s;
    const TreeNode* curr = root;
    do {
      while (curr) {
        s.push(curr);
        curr = curr->left;
      }
      TreeNode* prev = nullptr;
      while (!s.empty()) {
        curr = s.top(); s.pop();

        if (curr->right == prev) {
          result.push_back(curr->val);
          prev = curr;
        } else {
          s.push(curr);
          curr = curr->right;
          break;
        }
      }
    } while (!s.empty());
    return result;
  }
};