101. Symmetric Tree
Difficulty: Easy

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
But the following [1,2,2,null,3,null,3] is not:
    1
   / \
  2   2
   \   \
   3    3
Note:
Bonus points if you could solve it both recursively and iteratively.

// Time:  O(n)
// Space: O(h), h is the height of the binary tree.

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
 
// Iterative solution. Preorder Traversal
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) {
            return true;
        }
        // isSymmetricHelper(root->left, root->right)
        stack<TreeNode *> nodes;
        nodes.emplace(root->left);
        nodes.emplace(root->right);

        while (!nodes.empty())  {
            auto right = nodes.top();
            nodes.pop();
            auto left = nodes.top();
            nodes.pop();
            if (!left && !right) {
                continue;
            }
            if (!left || !right || left->val != right->val) {
                return false;
            }
            // isSymmetricHelper(left->right, right->left)
            nodes.emplace(left->right);
            nodes.emplace(right->left);

            // isSymmetricHelper(left->left, right->right)
            nodes.emplace(left->left);
            nodes.emplace(right->right);
        }
        return true;
    }
};


// Recursive solution.
class Solution2 {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) {
            return true;
        }
        return isSymmetricHelper(root->left, root->right);
    }
    
    bool isSymmetricHelper(TreeNode *left, TreeNode *right) {
        if (!left && !right) {
            return true;
        }
        if (!left || !right || left->val != right->val) {
            return false;
        }
        return isSymmetricHelper(left->left, right->right) &&
               isSymmetricHelper(left->right, right->left);
    }
};
