// 46. Permutations
// Difficulty: Medium

// Given a collection of distinct numbers, return all possible permutations.

// For example,
// [1,2,3] have the following permutations:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// Time Complexity: O(n!)
// Space Complexity: O(n)

class Solution {
    public:
        vector<vector<int> > permute(vector<int>& nums) {
            sort(nums.begin(), nums.end());
            vector<int> visited(nums.size(), false);
            vector<vector<int> > ans;
            vector<int> path;
            permute(nums, visited, path, ans);

            return ans;
        }

    private:
        void permute(vector<int>& nums, vector<int> &visited, vector<int> &path, vector<vector<int> > &ans) {
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
                }
            }
        }
};
