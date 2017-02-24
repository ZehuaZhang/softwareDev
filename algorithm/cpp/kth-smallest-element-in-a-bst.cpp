// 230. Kth Smallest Element in a BST
// Difficulty: Medium

// Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

// Note: 
// You may assume k is always valid, 1 ≤ k ≤ BST total elements.

// Follow up:
// What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? 
// How would you optimize the kthSmallest routine?

// Hint:
// Try to utilize the property of a BST.
// What if you could modify the BST node structure?
// The optimal runtime complexity is O(height of BST).
 
// Time:  O(max(h, k))
// Space: O(h)
class Solution2 {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode *> s;
        TreeNode *cur = root;
        int rank = 0;
        while (!s.empty() || cur) {
            if (cur) {
                s.emplace(cur);
                cur = cur->left;
            } else {
                cur = s.top();
                s.pop();
                if (++rank == k) {
                    return cur->val;
                }
                cur = cur->right;
            }
        }

        return INT_MIN;
    }
};
