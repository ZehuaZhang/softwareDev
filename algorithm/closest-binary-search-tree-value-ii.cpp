272. Closest Binary Search Tree Value II
Difficuly : hard

Given a non-empty binary search tree and a target value, find k values in the BST that are closest to the target.

Note:
Given target value is a floating point.
You may assume k is always valid, that is: k ≤ total nodes.
You are guaranteed to have only one unique set of k values in the BST that are closest to the target.
 

Follow up:
Assume that the BST is balanced, could you solve it in less than O(n) runtime (where n = total nodes)?

Hint:

1. Consider implement these two helper functions:
　　i. getPredecessor(N), which returns the next smaller node to N.
　　ii. getSuccessor(N), which returns the next larger node to N.
2. Try to assume that each node has a parent pointer, it makes the problem much easier.
3. Without parent pointer we just need to keep track of the path from the root to the current node using a stack.
4. You would need two stacks to track the path in finding predecessor and successor node separately.

// Time:  O(n)
// Space: O(n)

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        vector<int> closest;
        int start = 0;
        stack<TreeNode *> s;
        TreeNode *curr = root;

        while (curr || !s.empty()) {
            if (curr) {
                s.push(curr);
                curr = curr->left;
            } else {
                curr = s.top(); s.pop();
                if (closest.size() < k) {
                    closest.push_back(curr->val);
                } else if (abs(curr->val - target) < abs(closest[start] - target)) {
                    closest.push_back(curr->val);
                    start++;
                } else {
                    break;
                }
                curr = curr->right;
            }
        }
        vector<int> result(closest.begin() + start, closest.end());
        return result;
};
