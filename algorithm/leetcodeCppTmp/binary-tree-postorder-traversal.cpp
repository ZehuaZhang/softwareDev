145. Binary Tree Postorder Traversal
Difficulty: Hard

Given a binary tree, return the postorder traversal of its nodes values.

For example:
Given binary tree {1,#,2,3},
   1
    \
     2
    /
   3
return [3,2,1].

Note: Recursive solution is trivial, could you do it iteratively?

// Time:  O(n)
// Space: O(1)

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        TreeNode dummy(INT_MIN);
        dummy.left = root;
        TreeNode *curr = &dummy;
        while (curr) {
            if (!curr->left) {
                curr = curr->right;
            } else {
                auto *node = curr->left;
                while (node->right && node->right != curr) {
                    node = node->right;
                }
                if (!node->right) {
                    node->right = curr;
                    curr = curr->left;
                } else {
                    const auto v = traceBack(curr->left, node);
                    result.insert(result.end(), v.cbegin(), v.cend());
                    node->right = nullptr;
                    curr = curr->right;
                }
            }
        }
        return result;
    }

private:
    vector<int> traceBack(TreeNode *from, TreeNode *to) {
        vector<int> result;
        while (from != to) {
            result.emplace_back(from->val);
            from = from->right;
        }
        result.emplace_back(to->val);
        reverse(result.begin(), result.end());
        return result;
    }
};

// Time:  O(n)
// Space: O(h)
class Solution2 {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<pair<TreeNode *, bool>> s;
        s.emplace(root, false);
        while (!s.empty()) {
            TreeNode *curr;
            bool visited;
            tie(curr, visited) = s.top(); s.pop();
            if (curr == nullptr) {
                continue;
            }
            if (visited) {
                result.emplace_back(curr->val);
            } else {
                s.emplace(curr, true);
                s.emplace(curr->right, false);
                s.emplace(curr->left, false);
            }
        }
        return result;
    }
};

// Time:  O(n)
// Space: O(h)
class Solution {
public:
    vector<int> postorderTraversal(TreeNode *root) {
        vector<int> result;
        stack<const TreeNode *> s;
        const TreeNode *curr = root;
        do {
            while (curr != nullptr) {
                s.push(curr);
                curr = curr->left;
            }
            TreeNode *prev = nullptr;
            while (!s.empty()) {
                curr = s.top(); s.pop();

                if (curr->right == prev) {
                    result.push_back(curr->val);
                    prev = curr;
                } else {
                    s.push(curr);
                    curr = curr->right;
                    break;
                }
            }
        } while (!s.empty());
        return result;
    }
};