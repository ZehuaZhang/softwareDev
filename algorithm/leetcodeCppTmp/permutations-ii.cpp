47. Permutations II
Difficulty: Medium

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

For example,
[1,1,2] have the following unique permutations:

[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

// Time Complexity: O(n!)
// Space Complexity: O(n)

class Solution {
    public:
        vector<vector<int> > permute(vector<int>& nums) {
            sort(nums.begin(), nums.end());
            unordered_map<int, int> count;
            for(auto num : nums) {
                ++count[num];
            }

            vector<vector<int> > ans;
            vector<int> path;
            n = nums.size();
            permute(count, path, ans);

            return ans;
        }

    private:
        size_t n;
        void permute(unordered_map<int, int> &count, vector<int> &path, vector<vector<int> > &ans) {
            if (n == path.size()) {
                ans.push_back(path);
            }

            for (auto pair : count) {
                if (pair.second > 0) {
                    path.push_back(pair.first);
                    --pair.second;
                    permute(count, path, ans);
                    path.pop_back();
                    ++pair.second;
                }
            }
        }
};
