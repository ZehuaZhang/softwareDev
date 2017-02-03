300. Longest Increasing Subsequence
Difficulty: Medium

Given an unsorted array of integers, find the length of longest increasing subsequence.

For example,
Given [10, 9, 2, 5, 3, 7, 101, 18],
The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4. 
Note that there may be more than one LIS combination, it is only necessary for you to return the length.

Your algorithm should run in O(n2) complexity.

Follow up: Could you improve it to O(n log n) time complexity?

// Time:  O(nlogn)
// Space: O(n)

// Binary search solution with STL.
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> lis;

        for (auto num : nums) {
            insert(lis, num);
        }

        return lis.size();
    }

private:
    void insert(vector<int> &lis, const int target) {
        // Find the first index "left" which satisfies lis[left] >= target
        auto it = lower_bound(lis.begin(), lis.end(), target);

        // If not found, append the target.
        if (it == lis.end()) {
            lis.emplace_back(target);
        } else {
            *it = target;
        }
    }
};
