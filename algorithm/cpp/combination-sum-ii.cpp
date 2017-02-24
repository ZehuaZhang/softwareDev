// 40. Combination Sum II
// Difficulty: Medium

// Given a collection of candidate numbers (C) and a target number (T), 
// find all unique combinations in C where the candidate numbers sums to T.

// Each number in C may only be used once in the combination.

// Note:
// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.
// For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8, 
// A solution set is: 
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]

// Time : O(n!)
// Space: O(1)

class Solution {
    public:
        vector<vector<int> > combinationSum2(vector<int> &num, int target) {
            sort(num.begin(), num.end());
            vector<vector<int> > ans;
            vector<int> path;
            dfs(num, target, 0, path, ans);
            return ans;
        }

    private:
        void dfs(vector<int>& num, int gap, int begin, vector<int>& path, vector<vector<int> > &ans) {
            if (gap == 0) {
                ans.push_back(path);
                return;
            }

            for (size_t i = begin; i < num.size(); i++) {
                if (gap < num[i]) {
                    return; // pruning
                }
                if (i > begin && num[i] == num[i - 1]) {    // skip duplicates
                    continue;
                }
                path.push_back(num[i]);
                dfs(num, gap - num[i], i + 1, v, ans); // each element could be chosen only once
                path.pop_back();
            }
        }
};
