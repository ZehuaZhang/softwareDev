// 34. Search for a Range
// Difficulty: Medium

// Given a sorted array of integers, find the starting and ending position of a given target value.

// Your algorithm runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].

// For example,
// Given [5, 7, 7, 8, 8, 10] and target value 8,
// return [3, 4].

// Time:  O(logn)
// Space: O(1)

class Solution {
public:
  vector<int> searchRange(vector<int> &nums, int target) {
    const int begin = lower_bound(nums, target);
    const int end = upper_bound(nums, target);

    if (begin < nums.size() && nums[begin] == target) {
      return {begin, end - 1};
    }

    return {-1, -1};
  }

private:
  int lower_bound(vector<int> &nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    while (left <= right) {
      const auto mid = left + (right - left) / 2;
      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  int upper_bound(vector<int> &nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    while (left <= right) {
      const auto mid = left + (right - left) / 2;
      if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
};
