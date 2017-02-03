327. Count of Range Sum
Difficulty: Hard

Given an integer array nums, return the number of range sums that lie in [lower, upper] inclusive.
Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j (i ≤ j), inclusive.

Note:
A naive algorithm of O(n2) is trivial. You MUST do better than that.

Example:
Given nums = [-2, 5, -1], lower = -2, upper = 2,
Return 3.
The three ranges are : [0, 0], [2, 2], [0, 2] and their respective sums are: -2, -1, 2.

// Time:  O(nlogn)
// Space: O(n)

// Divide and Conquer solution.
class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        vector<long long> sums(nums.size() + 1);
        for (int i = 0; i < nums.size(); ++i) {
            sums[i + 1] = sums[i] + nums[i];
        }
        return countAndMergeSort(sums, 0, sums.size(), lower, upper);
    }

    int countAndMergeSort(vector<long long> sums, int start, int end, int lower, int upper) {
        if (end - start <= 1) {  // The number of range [start, end) of which size is less than 2 is always 0.
            return 0;
        }
        int mid = start + (end - start) / 2;
        int count = countAndMergeSort(sums, start, mid, lower, upper) +
                    countAndMergeSort(sums, mid, end, lower, upper);
        int j = mid, k = mid, r = mid;
        vector<long long> merge;
        for (int i = start; i < mid; ++i) {
            // Count the number of range sums that lie in [lower, upper].
            while (k < end && sums[k] - sums[i] < lower) {
                ++k;
            }
            while (j < end && sums[j] - sums[i] <= upper) {
                ++j;
            }
            count += j - k;

            // Merge the two sorted arrays into merge.
            while (r < end && sums[r] < sums[i]) {
                merge.emplace_back(sums[r++]);
            }
            merge.emplace_back(sums[i]);
        }
        // Copy merge back to sums.
        copy(merge.begin(), merge.end(), sums.begin() + start);
        return count;
    }
};