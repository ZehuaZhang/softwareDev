// 124. Binary Tree Maximum Path Sum
// Difficulty: Hard

// Given a binary tree, find the maximum path sum.

// For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree 
// along the parent-child connections. The path does not need to go through the root.

// For example:
// Given the below binary tree,

//        1
//       / \
//      2   3
// Return 6.

// Time:  O(n)
// Space: O(h)

class Solution {
public:
	int maxPathSum(TreeNode *root) {
		int maxSum = INT_MIN;
		maxPathSum(root, maxSum);
		return maxSum;
	}
private:
	int maxPathSum(const TreeNode* root, int& maxSum) {
		if (!root) {
			return 0;
		}
		int leftSum = maxPathSum(root->left, maxSum);
		int rightSum = maxPathSum(root->right, maxSum);
		
		int currMax = root->val + max(0, max(leftSum + rightSum, max(leftSum, rightSum)));
		maxSum = max(maxSum, currMax);
		
		return root->val + max(0, max(leftSum, rightSum));
	}
};