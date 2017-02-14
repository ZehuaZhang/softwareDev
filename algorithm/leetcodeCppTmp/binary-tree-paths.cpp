// 257. Binary Tree Paths
// Difficulty: Easy

// Given a binary tree, return all root-to-leaf paths.

// For example, given the following binary tree:

//    1
//  /   \
// 2     3
//  \
//   5
// All root-to-leaf paths are:

// ["1->2->5", "1->3"]

// Time:  O(n * h)
// Space: O(h)

class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> result;
        vector<TreeNode *> path;
        binaryTreePaths(root, path, result);
        return result;
    }

    void binaryTreePaths(TreeNode *node, vector<TreeNode *> &path, vector<string> &result) {
        if (!node) {
            return;
        }

        if (!node->left && !node->right) {
            string ans = "";
            for (auto node : path) {
                ans += to_string(node) + "->";
            }
            result.emplace_back(ans + to_string(node->val));
        }
        
        path.emplace_back(node);
        if (node->left) {
            binaryTreePaths(node->left, path, result);
        }

        if (node->right) {
            binaryTreePaths(node->right, path, result);
        }
        path.pop_back();
    }
};
