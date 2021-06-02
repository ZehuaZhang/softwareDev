// 314. Binary Tree Vertical Order Traversal
// Difficulty : Medium 

// Given a binary tree, return the vertical order traversal of its nodes values. (ie, from top to bottom, column by column).

// If two nodes are in the same row and column, the order should be from left to right.

// Examples:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its vertical order traversal as:
// [
//   [9],
//   [3,15],
//   [20],
//   [7]
// ]
// Given binary tree [3,9,20,4,5,2,7],
//     _3_
//    /   \
//   9    20
//  / \   / \
// 4   5 2   7
// return its vertical order traversal as:
// [
//   [4],
//   [9],
//   [3,5,2],
//   [20],
//   [7]
// ]

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  vector<vector<int>> verticalOrder(TreeNode* root) {
    unordered_map<int, vector<int>> cols;
    queue<pair<TreeNode*, int>> q;
    q.emplace(root, 0);
    int minIdx = 0, maxIdx = 0;

    while (!q.empty()) {
      TreeNode* curr = q.front().first;
      int idx = q.front().second;
      q.pop();

      cols[idx].emplace_back(curr->val);
      if (curr->left) {
        q.emplace(curr->left, idx - 1);
        minIdx = min(minIdx, idx - 1);
      }
      if (curr->right) {
        q.emplace(curr->right, idx + 1);
        maxIdx = max(maxIdx, idx + 1);
      }
    }

    vector<vector<int>> result;
    for (int i = minIdx; i <= maxIdx; ++i) {
      result.emplace_back(cols[i]);
    }
    return result;
  }
};
