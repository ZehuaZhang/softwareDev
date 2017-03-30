// 77. Combinations
// Difficulty: Medium

// Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

// For example,
// If n = 4 and k = 2, a solution is:

// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// Time : O(n!)
// Space: O(n)

class Solution {
public:
  vector<vector<int> > combine(int n, int k) {
    vector<vector<int> > ans;
    vector<int> path;
    combine(n, k, 1, path, ans);
    return ans;
  }
  void combine(int n, int k, int start, vector<int>& path, vector<vector<int>>& ans) {
    if (k == 0) {
      ans.push_back(path);
      return;
    }

    for(int i = start; i <= n; ++i) {
      path.push_back(i);
      combine(n, k - 1, i + 1, path, ans);
      path.pop_back();
    }
  }
};
