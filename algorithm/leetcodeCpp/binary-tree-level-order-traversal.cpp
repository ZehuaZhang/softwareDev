// 102. Binary Tree Level Order Traversal
// Difficulty: Easy

// Given a binary tree, return the level order traversal of its nodes values. (ie, from left to right, level by level).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

// Time : O(n)
// Space: O(h), h is the height of the binary tree.

class Solution {
public:
	vector<vector<int>> levelOrder(TreeNode *root) {
		vector<vector<int>> result;
		levelOrder(root, 1, result);
		return result;
	}
	void levelOrder(TreeNode *root, size_t level, vector<vector<int>> &result) {
		if (!root) {
			return;
		}

		if (level > result.size()) {
			result.push_back(vector<int>());
		}
		result[level - 1].push_back(root->val);

		levelOrder(root->left, level + 1, result);
		levelOrder(root->right, level + 1, result);
	}
};