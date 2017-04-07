// Construct Longest Increasing Subsequence

// Given an unsorted array of integers, construct longest increasing subsequence.

// Time:  O(nlogn)
// Space: O(n)

// Binary search solution with STL.
class Solution {
public:
  vector<int> constuctLIS(vector<int>& nums) {
    vector<int> lis;
    vector<int> prevIdx(n, -1); // initialized with -1
    
    for (int i = 1; i < n; ++i) {
      auto it = lower_bound(lis.begin(), lis.end(), nums[i]);

      if (it == lis.end()) {
        lis.push_back(i);
      } else {
        *it = i;
      }
      if (it != lis.begin()) {
        prevIdx[i] = *prev(it);
      }
    }
    
    vector<int> result;
    for (int i = lis.back(); i >= 0; i = prevIdx[i]) {
      result.push_back(nums[i]);
    }
  }

private:
  using IT = vector<int>::iterator;
  IT lowerBound(const vector<int>& nums, const vector<int>& lis, int target) {
    IT left = lis.begin(), right = lis.end();
    while (left != right) {
      IT mid = left + (right - left) / 2;
      if (nums[*mid] >= nums[*prev(right)]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
};