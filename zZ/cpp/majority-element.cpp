// 169. Majority Element
// Difficulty: Easy
// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

// You may assume that the array is non-empty and the majority element always exist in the array.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int majorityElement(vector<int>& nums) {
    int candidate = nums[0], cnt = 1;
    for (int i = 1; i < nums.size(); i++) {
      if (nums[i] == candidate) {
        ++cnt;
      } else if (--cnt == 0) {
        candidate = nums[i];
        cnt = 1;
      }
    }
    return candidate; 
  }
};
