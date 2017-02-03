209. Minimum Size Subarray Sum
Difficulty: Medium

Given an array of n positive integers and a positive integer s, find the minimal length of a subarray of which the sum ≥ s. 
If there isnt one, return 0 instead.

For example, given the array [2,3,1,2,4,3] and s = 7,
the subarray [4,3] has the minimal length under the problem constraint.

// Time:  O(n)
// Space: O(1)

// Sliding window solution.
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int start = 0, sum = 0, minSize = INT_MAX;
        for (int i = 0; i < nums.size(); ++i) {
            sum += nums[i];
            while (sum >= s) {
                minSize = min(minSize, i - start + 1);
                sum -= nums[start++];
            }
        }
        if (minSize == INT_MAX) {
            return 0;
        }
        return minSize;
    }
};