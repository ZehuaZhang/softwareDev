226. Invert Binary Tree
Difficulty: Easy

Invert a binary tree.

     4
   /   \
  2     7
 / \   / \
1   3 6   9
to
     4
   /   \
  7     2
 / \   / \
9   6 3   1

// Time:  O(n)
// Space: O(h)

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
// Space: O(w), w is the max number of nodes of the levels.
// BFS solution.
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root) {
            queue<TreeNode *> q;
            q.emplace(root)

            while (!q.empty()) {
                TreeNode* curr = q.front(); q.pop();
                swap(curr->left, curr->right);
                if (curr->left) {
                    q.emplace(curr->left);
                }
                if (curr->right) {
                    q.emplace(curr->right);
                }
            }
        }
        return root;
    }
};
 
// Time:  O(n)
// Space: O(h)
// DFS solution.
class Solution2 {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root) {
            stack<TreeNode *> s;
            s.emplace(root);

            while (!s.empty()) {
                TreeNode* curr = s.top(); s.pop();
                swap(curr->left, curr->right);
                if (curr->left) {
                    s.emplace(curr->left);
                }
                if (curr->right) {
                    s.emplace(curr->right);
                }
            }
        }
        return root;
    }
};

// Time:  O(n)
// Space: O(h) 
// DFS, Recursive solution.
class Solution3 {
public:
    TreeNode* invertTree(TreeNode* root) {  // preorder
        if (root != nullptr) {
            swap(root->left, root->right);
            invertTree(root->left);
            invertTree(root->right);
        }
        return root;
    }
};
