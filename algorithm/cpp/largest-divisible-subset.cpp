// 368. Largest Divisible Subset
// Difficulty: Medium

// Given a set of distinct positive integers, find the largest subset such that every pair (Si, Sj) of elements 
// in this subset satisfies: Si % Sj = 0 or Sj % Si = 0.

// If there are multiple solutions, return any subset is fine.

// Example 1:

// nums: [1,2,3]

// Result: [1,2] (of course, [1,3] will also be ok)
// Example 2:

// nums: [1,2,4,8]

// Result: [1,2,4,8]

// Time:  O(n^2)
// Space: O(n)

class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        if (nums.empty()) {
            return {};
        }

        sort(nums.begin(), nums.end());
        // dp[i]: the size of the largest distinct subset of
        //        the first i+1 numbers including nums[i]
        vector<int> dp(nums.size() , 1);
        vector<int> prev(nums.size(), -1);
        int maxIdx = 0;
        
        for (int i = 0; i < nums.size(); ++i) {
            for (int j = 0; j < i; ++j) {
                if (nums[i] % nums[j] == 0) {
                    if (dp[i] < dp[j] + 1) {
                        dp[i] = dp[j] + 1;
                        prev[i] = j;
                    }
                }
            }
            if (dp[maxIdx] < dp[i]) {
                maxIdx = i;
            }
        }

        vector<int> result;
        for (int i = maxIdx; i != -1; i = prev[i]) {
            result.emplace_back(nums[i]);
        }
        reverse(result.begin(), result.end());
        return result;
    }
};
