// 410. Split Array Largest Sum
// Difficulty: Hard

// Given an array which consists of non-negative integers and an integer m,
// you can split the array into m non-empty continuous subarrays.
// Write an algorithm to minimize the largest sum among these m subarrays.

// Note:
// If n is the length of array, assume the following constraints are satisfied:

// 1 ≤ n ≤ 1000
// 1 ≤ m ≤ min(50, n)
// Examples:

// Input:
// nums = [7,2,5,10,8]
// m = 2

// Output:
// 18

// Explanation:
// There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8],
// where the largest sum among the two subarrays is only 18.

// Time:  O(nlogs), s is the sum of nums
// Space: O(1)

class Solution {
public:
  int splitArray(vector<int>& nums, int m) {
    int left = 0, right = 0;
    for (const auto& num : nums) {
      left = max(left, num);
      right += num;
    }

    while (left <= right) {
      const auto mid = left + (right - left) / 2;
      if (canSplit(nums, m, mid)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

private:
  bool canSplit(vector<int>& nums, int m, int sum) {
    int cnt = 1, curr = 0;
    for (const auto& num : nums) {
      curr += num;
      if (curr > sum) {
        curr = num;
        ++cnt;
      }
    }
    return cnt <= m;
  }
};