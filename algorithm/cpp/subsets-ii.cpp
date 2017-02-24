// 90. Subsets II
// Difficulty: Medium

// Given a collection of integers that might contain duplicates, nums, return all possible subsets.

// Note: The solution set must not contain duplicate subsets.

// For example,
// If nums = [1,2,2], a solution is:

// [
//   [2],
//   [1],
//   [1,2,2],
//   [2,2],
//   [1,2],
//   []
// ]

// Time:  O(n * 2^n)
// Space: O(1)

class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int> &nums) {
        vector<vector<int>> result(1);
        sort(nums.begin(), nums.end());
        size_t prevSize = 0;

        for (size_t i = 0; i < nums.size(); ++i) {
            const size_t size = result.size();

            for (size_t j = 0; j < size; ++j) {
                // Only union non-duplicate element or new union set.
                if (i == 0 || nums[i] != nums[i - 1] || j >= prevSize) {
                    result.emplace_back(result[j]);
                    result.back().emplace_back(nums[i]);
                }
            }
            prevSize = size;
        }
        return result;
    }
};
