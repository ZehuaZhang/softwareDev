129. Sum Root to Leaf Numbers
Difficulty: Medium

Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.

An example is the root-to-leaf path 1->2->3 which represents the number 123.

Find the total sum of all root-to-leaf numbers.

For example,

    1
   / \
  2   3
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return sumNumbers(root, 0);
    }
    int sumNumbers(TreeNode* root, int sum) {
        if (!root) {
            return 0;
        }
        sum = sum * 10 + root->val;
        if (!root->left && !root->right) {
            return sum;
        }
        return sumNumbers(root->left, sum) + sumNumbers(root->right, sum);
    }
};