// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Difficulty: Medium

// Given preorder and inorder traversal of a tree, construct the binary tree.

// Note:
// You may assume that duplicates do not exist in the tree.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
		return buildTree(begin(preorder), end(preorder), begin(inorder), end(inorder));
	}
	template<typename It>
	TreeNode* buildTree(It preFirst, It preLast, It inFirst, It inLast) {
		if (preFirst == preLast) {
			return nullptr;
		}
		if (inFirst == inLast) {
			return nullptr;
		}
		auto root = new TreeNode(*preFirst);
		auto inRootPos = find(inFirst, inLast, *preFirst);
		auto leftSize = distance(inFirst, inRootPos);
		root->left = buildTree(next(preFirst), next(preFirst, leftSize + 1), inFirst, inRootPos);
		root->right = buildTree(next(preFirst, leftSize + 1), preLast, next(inRootPos), inLast);
		return root;
	}
};