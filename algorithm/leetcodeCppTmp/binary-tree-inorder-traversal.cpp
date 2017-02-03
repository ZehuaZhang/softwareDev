94. Binary Tree Inorder Traversal 
Difficulty: Medium

Given a binary tree, return the inorder traversal of its nodes values.

For example:
Given binary tree [1,null,2,3],
   1
    \
     2
    /
   3
return [1,3,2].

Note: Recursive solution is trivial, could you do it iteratively?

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

// Time:  O(n)
// Space: O(h)

class Solution {
public:
    vector<int> inorderTraversal(TreeNode *root) {
        vector<int> result;
        stack<const TreeNode *> s;
        const TreeNode *curr = root;
        while (!s.empty() || curr != nullptr) {
            if (curr != nullptr) {
                s.push(curr);
                curr = curr->left;
            } else {
                curr = s.top();
                s.pop();
                result.push_back(curr->val);
                curr = curr->right;
            }
        }
        return result;
    }
};

// Time:  O(n)
// Space: O(1)

class Solution2 {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        TreeNode *curr = root;
        while (curr) {
            if (!curr->left) {
                res.emplace_back(curr->val);
                curr = curr->right;
            } else {
                TreeNode *node = curr->left;
                while (node->right && node->right != curr) {
                    node = node->right;
                }
                if (!node->right) {
                    node->right = curr;
                    curr = curr->left;
                } else {
                    res.emplace_back(curr->val);
                    node->right = nullptr;
                    curr = curr->right;
                }
            }
        }
        return res;
    }
};