104. Maximum Depth of Binary Tree
Difficulty: Easy

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	int maxDepth(TreeNode *root) {
		if (!root) {
			return 0;
		}
		return max(maxDepth(root->left), maxDepth(root->right)) + 1;
	}
};