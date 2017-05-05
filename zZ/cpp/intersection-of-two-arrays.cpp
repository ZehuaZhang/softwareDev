// 349. Intersection of Two Arrays
// Difficulty: Easy

// Given two arrays, write a function to compute their intersection.

// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

// Time:  O(m + n)
// Space: O(m)

// Hash solution.
class Solution {
public:
  vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
    unordered_set<int> nums1set{nums1.cbegin(), nums1.cend()};

    vector<int> result;
    for (auto num2 : nums2) {
      if (nums1set.count(num2)) {
        result.emplace_back(num2);
        nums1set.erase(num2);
      }
    }
    return result;
  }
};