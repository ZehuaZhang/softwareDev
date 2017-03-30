// 39. Combination Sum
// Difficulty: Medium

// Given a set of candidate numbers (C) and a target number (T), 
// find all unique combinations in C where the candidate numbers sums to T.

// The same repeated number may be chosen from C unlimited number of times.

// Note:
// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.
// For example, given candidate set [2, 3, 6, 7] and target 7, 

// A solution set is: 
// [
//   [7],
//   [2, 2, 3]
// ]

// Time : O(n!)
// Space: O(1)

class Solution {
public:
  vector<vector<int> > combinationSum(vector<int> &candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int> > ans;
    vector<int> path;
    dfs(candidates, target, 0, path, ans);
    return ans;
  }

private:
  void dfs(vector<int>& candidates, int gap, int begin, vector<int>& path, vector<vector<int>>& ans) {
    if (gap == 0) {
      ans.push_back(path);
      return;
    }

    for (size_t i = begin; i < candidates.size(); i++) {
      if (gap < candidates[i]) {
        return;
      }
      path.push_back(candidates[i]);
      dfs(candidates, gap - candidates[i], i, path, ans);
      path.pop_back();
    }
  }
};
