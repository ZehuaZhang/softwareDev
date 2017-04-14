// 107. Binary Tree Level Order Traversal II
// Difficulty: Easy

// Given a binary tree, return the bottom-up level order traversal of its nodes values.
// (ie, from left to right, level by level from leaf to root).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its bottom-up level order traversal as:
// [
//   [15,7],
//   [9,20],
//   [3]
// ]

class Solution {
public:
	vector<vector<int>> levelOrderBottom(TreeNode* root) {
		vector<vector<int>> result;
		levelOrderBottom(root, 1, result);
		reverse(result.begin(), result.end());
		return result;
	}

private:
	void levelOrderBottom(TreeNode* root, size_t level, vector<vector<int>>& result) {
		if (!root) {
			return;
		}

		if (level > result.size()) {
			result.push_back(vector<int>());
		}
		result[level - 1].push_back(root->val);

		levelOrderBottom(root->left, level + 1, result);
		levelOrderBottom(root->right, level + 1, result);
	}
};