// 106. Construct Binary Tree from Inorder and Postorder Traversal
// Difficulty: Medium

// Given inorder and postorder traversal of a tree, construct the binary tree.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
		return buildTree(begin(inorder), end(inorder), begin(postorder), end(postorder));
	}
	template<typename It>
	TreeNode* buildTree(It inFirst, It inLast, It postFirst, It postLast) {
		if (inFirst ==inLast) {
			return nullptr;
		}
		if (postFirst == postLast) {
			return nullptr;
		}
		TreeNode* root = new TreeNode(*prev(postLast));
		auto inRootPos = find(inFirst, inLast, *prev(postLast));
		auto leftSize = distance(inFirst, inRootPos);
		auto post_left_last = next(postFirst, leftSize);
		root->left = buildTree(inFirst, inRootPos, postFirst, next(postFirst, leftSize));
		root->right = buildTree(next(inRootPos), inLast, next(postFirst, leftSize), prev(postLast));
		return root;
	}
};