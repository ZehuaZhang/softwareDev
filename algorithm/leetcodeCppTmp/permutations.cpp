46. Permutations
Difficulty: Medium

Given a collection of distinct numbers, return all possible permutations.

For example,
[1,2,3] have the following permutations:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

// Time Complexity: O(n!)
// Space Complexity: O(n)

class Solution {
    public:
        vector<vector<int> > permute(vector<int>& nums) {
            sort(nums.begin(), nums.end());

            vector<vector<int> > ans;
            vector<int> path;
            n = nums.size();
            permute(nums, path, ans);

            return ans;
        }

    private:
        size_t n;
        void permute(vector<int>& nums, vector<int> &path, vector<vector<int> > &ans) {
            if (n == path.size()) {
                ans.push_back(path);
            }

            for (auto num : nums) {
                path.push_back(num);
                permute(path, ans);
                path.pop_back();
            }
        }
};
