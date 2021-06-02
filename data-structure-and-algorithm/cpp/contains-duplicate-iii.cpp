// 220. Contains Duplicate III
// Difficulty: Medium

// Given an array of integers, find out whether there are two distinct indices i and j in the array 
// such that the difference between nums[i] and nums[j] is at most t and the difference between i and j is at most k.

// Time:  O(nlogk)
// Space: O(k)

class Solution {
public:
  bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
    if (k < 0 || t < 0) {
      return false;
    }

    queue<int64_t> window;
    multiset<int64_t> bst;
    for (auto num : nums) {
      const auto it = bst.lower_bound(num - t);
      if (it != bst.cend() && (*it - num) <= t) {
        return true;
      }
      window.emplace(num);
      bst.emplace(num);
      if (bst.size() > k) {
        bst.erase(bst.find(window.front())); window.pop();
      }
    }
    return false;
  }
};
