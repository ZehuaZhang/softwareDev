// 95. Unique Binary Search Trees II
// Difficulty: Medium

// Given an integer n, generate all structurally unique BST (binary search trees) that store values 1...n.

// For example,
// Given n = 3, your program should return all 5 unique BST shown below.

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3

// Time:  O(n!)
// Space: O(h)

class Solution {
public:
	vector<TreeNode*> generateTrees(int n) {
		return generate(1, n);
	}
private:
	vector<TreeNode*> generate(int start, int end) {
		if (start > end) {
			return { nullptr };
		}
    vector<TreeNode*> subTree;
		for (int k = start; k <= end; k++) {
			for (auto left : generate(start, k - 1)) {
				for (auto right : generate(k + 1, end)) {
					TreeNode* node = new TreeNode(k);
					node->left = left;
					node->right = right;
					subTree.push_back(node);
				}
			}
		}
		return subTree;
	}
};