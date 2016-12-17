114. Flatten Binary Tree to Linked List
Difficulty: Medium

Given a binary tree, flatten it to a linked list in-place.

For example,
Given

         1
        / \
       2   5
      / \   \
     3   4   6
The flattened tree should look like:
   1
    \
     2
      \
       3
        \
         4
          \
           5
            \
             6
click to show hints.

Hints:
If you notice carefully in the flattened tree, each node right child points to the next node of a pre-order traversal.

// Time:  O(n)
// Space: O(h)
// recursion
class Solution {
public:
    void flatten(TreeNode *root) {
        if (!root) {
          return;
        }
        if (root->left) {
          flatten(root->left);
        }
        if (root->right) {
            flatten(root->right);
        }
        TreeNode *right = root->right;
        root->right = root->left;
        root->left = nullptr;
        while (root->right) {
            root = root->right;
        }
        root->right = right;
    }
};

// Time:  O(n)
// Space: O(h)
// stack
class Solution {
public:
    void flatten(TreeNode* root) {
        if (!root) {
            return;
        }
        stack<TreeNode*> s;
        s.push(root);
        while (!s.empty()) {
            TreeNode *curr = s.top(); s.pop();
            if (curr->left) {
                TreeNode *left = curr->left;
                while (left->right) {
                    left = left->right;
                }
                left->right = curr->right;
                curr->right = curr->left;
                curr->left = NULL;
            }
            if (curr->right) {
                s.push(curr->right);
            }
        }
    }
};