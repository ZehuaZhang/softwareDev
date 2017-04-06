// 47. Permutations II
// Difficulty: Medium

// Given a collection of numbers that might contain duplicates, return all possible unique permutations.

// For example,
// [1,1,2] have the following unique permutations:

// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]

// Time : O(n!)
// Space: O(n)

class Solution {
public:
  vector<vector<int>> permute(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<bool> visited(nums.size(), false);
    vector<vector<int>> ans;
    vector<int> path;
    permute(nums, visited, path, ans);

    return ans;
  }

private:
  void permute(vector<int>& nums, vector<bool>& visited, vector<int>& path, vector<vector<int>>& ans) {
    if (nums.size() == path.size()) {
      ans.push_back(path);
      return;
    }

    for (int i = 0; i < nums.size(); i++) {
      if (!visited[i]) {
        path.push_back(nums[i]);
        visited[i] = true;
        permute(nums, visited, path, ans);
        path.pop_back();
        visited[i] = false;
        for (; i < nums.size() - 1 && nums[i] == nums[i + 1]; i++);
      }
    }
  }
};
