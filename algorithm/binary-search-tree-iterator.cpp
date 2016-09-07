173. Binary Search Tree Iterator
Difficulty: Medium

Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

Calling next() will return the next smallest number in the BST.

Note: next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.

// Time:  O(1), amortized
// Space: O(h)

/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class BSTIterator {
public:
    BSTIterator(TreeNode *root) : _curr(root) {
    }

    /** @return whether we have a next smallest number */
    bool hasNext() {
        return !_s.empty() || _curr != nullptr;
    }

    /** @return the next smallest number */
    int next() {
        // Go to the left most descendant.
        while (_curr != nullptr) {
            _s.emplace(_curr);
            _curr = _curr->left;
        }
        _curr = _s.top();  // Left most node.
        _s.pop();

        const auto *node = _curr;
        _curr = _curr->right;  // Visit right child.

        return node->val;
    }

private:
    stack<TreeNode *> _s;
    TreeNode *_curr;
};

/**
 * Your BSTIterator will be called like this:
 * BSTIterator i = BSTIterator(root);
 * while (i.hasNext()) cout << i.next();
 */
 
