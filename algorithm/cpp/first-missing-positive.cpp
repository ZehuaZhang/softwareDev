// 41. First Missing Positive
// Difficulty: Hard

// Given an unsorted integer array, find the first missing positive integer.

// For example,
// Given [1,2,0] return 3,
// and [3,4,-1,1] return 2.

// Your algorithm should run in O(n) time and uses constant space.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int firstMissingPositive(vector<int>& nums) {
    bucketSort(nums);
    int i = 0;
    for (; i < nums.size() && nums[i] == i + 1; ++i);
    return i + 1;
  }

private:
  void bucketSort(vector<int> &nums) {
    for (int i = 0; i < nums.size();) {
      if (nums[i] > 0 && nums[i] <= nums.size() && nums[i] != nums[nums[i] - 1]) {
        swap(nums[i], nums[nums[i] - 1]);
      } else {
        ++i;
      }
    }
  }
};
