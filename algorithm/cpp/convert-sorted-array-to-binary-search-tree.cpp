// 108. Convert Sorted Array to Binary Search Tree
// Difficulty: Medium

// Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	TreeNode* sortedArrayToBST (vector<int>& num) {
		return sortedArrayToBST(num.begin(), num.end());
	}

private:
	template<typename It>
	TreeNode* sortedArrayToBST(It first, It last) {
		if (first >= last) {
			return nullptr;
		}
		auto mid = first + (last - first) / 2;
		TreeNode* root = new TreeNode (*mid);
		root->left = sortedArrayToBST(first, mid);
		root->right = sortedArrayToBST(mid + 1, last);
		return root;
	}
};