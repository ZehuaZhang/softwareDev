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
        if (root == nullptr) {
            return 0;
        }

        TreeNode *node = root;
        int level = 0;
        while (node->left) {
            node = node->left;
            ++level;
        }

        // Binary search.
        int left = pow(2, level), right = pow(2, level + 1);
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (!exist(root, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left - 1;
    }

    // Check if the nth node exist.
    bool exist(TreeNode *root, int n) {
        int k = 1;
        while (k <= n) {
            k <<= 1;
        }
        k >>= 2;

        TreeNode *node = root;
        while (k > 0) {
            if ((n & k) == 0) {
                node = node->left;
            } else {
                node = node->right;
            }
            k >>= 1;
        }
        return node != nullptr;
    }
};
