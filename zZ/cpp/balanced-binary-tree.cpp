// 110. Balanced Binary Tree
// Difficulty: Easy

// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as a binary tree 
// in which the depth of the two subtrees of every node never differ by more than 1.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	bool isBalanced(TreeNode* root) {
		return balancedHeight(root) >= 0;
	}

private:
  /**
  * Returns the height of `root` if `root` is a balanced tree,
  * otherwise, returns `-1`.
  */
	int balancedHeight(TreeNode* root) {
		if (!root) {
			return 0;
		}
		int left = balancedHeight(root->left);
		int right = balancedHeight(root->right);
		if (left < 0 || right < 0 || abs(left - right) > 1) {
			return -1;
		}
		return max(left, right) + 1;
	}
};