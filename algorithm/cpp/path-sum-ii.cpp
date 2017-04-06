// 113. Path Sum II
// Difficulty: Medium
// Given a binary tree and a sum, find all root-to-leaf paths where each path sum equals the given sum.

// For example:
// Given the below binary tree and sum = 22,
//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// return
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// Time : O(n)
// Space: O(logn)

class Solution {
public:
  vector<vector<int> > pathSum(TreeNode *root, int sum) {
    vector<int> path;
    vector<vector<int>> ans;
    pathSum(root, sum, path, ans);
    return ans;
  }
private:
 void pathSum(TreeNode *root, int sum, vector<int>& path, vector<vector<int>>& ans) {
    if(!root) {
      return;
    }
    path.push_back(root->val);

    if(!root->left && !root->right && root->val == sum) {
      ans.push_back(path);
    }

    pathSum(root->left, sum - root->val);
    pathSum(root->right, sum - root->val);

    path.pop_back();
  }
};
