// 480. Sliding Window Median
// Difficulty: Hard

// Median is the middle value in an ordered integer list.
// If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

// Examples: 
// [2,3,4] , the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Given an array nums,
// there is a sliding window of size k which is moving from the very left of the array to the very right.
// You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Your job is to output the median array for each window in the original array.

// For example,
// Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.

// Window position                Median
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       1
//  1 [3  -1  -3] 5  3  6  7       -1
//  1  3 [-1  -3  5] 3  6  7       -1
//  1  3  -1 [-3  5  3] 6  7       3
//  1  3  -1  -3 [5  3  6] 7       5
//  1  3  -1  -3  5 [3  6  7]      6
// Therefore, return the median sliding window as [1,-1,-1,3,5,6].

// Time:  O(nlogk)
// Space: O(k)

class Solution {
public:
  vector<double> medianSlidingWindow(vector<int>& nums, int k) {
    multiset<int, greater<int>> lower;
    multiset<int, less<int>> upper;

    vector<double> result;
    for (int i = 0; i < nums.size(); ++i) {
      if (i >= k) {
        if (upper.count(nums[i - k])) {
          upper.erase(upper.find(nums[i - k]));
        } else {
          lower.erase(lower.find(nums[i - k]));
        }
      }

      if (upper.empty() || nums[i] > *upper.cbegin()) {
        upper.emplace(nums[i]);
        if (upper.size() > lower.size() + 1) {
          lower.emplace(*upper.cbegin());
          upper.erase(upper.cbegin());
        }
      } else {
        lower.emplace(nums[i]);
        if (lower.size() > upper.size()) {
          upper.emplace(*lower.cbegin());
          lower.erase(lower.cbegin());
        }
      }

      if (i >= k - 1) {
        result.emplace_back(lower.size() == upper.size() ? *upper.cbegin() / 2.0 + *lower.cbegin() / 2.0 : *upper.cbegin());
      }
    }

    return result;
  }
};