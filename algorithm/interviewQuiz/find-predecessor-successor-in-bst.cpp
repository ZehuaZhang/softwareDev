Find Predecessor and Successor in BST

// findPredSucc(root, target, nullptr, nullptr);

void findPredSucc(TreeNode *root, int target, TreeNode* &pred, TreeNode* &succ) {
	if (root) {
		if (root->val == target) {
			if (root->left) {
				pred = root->left;
				while (pred->right) {
					pred = pred->right;
				}
			}
			if (root->right) {
				succ = root->right;
				while (succ->left) {
					succ = succ->left;
				}
			}
		} else if (root->val > target) {
			succ = root;
			findPredSucc(root->left, target, pred, succ);
		} else {
			pred = root;
			findPredSucc(root->right, target, pred, succ);
		}
	}
}