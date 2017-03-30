// 217. Contains Duplicate 
// Difficulty: Easy

// Given an array of integers, find if the array contains any duplicates. 
// Your function should return true if any value appears at least twice in the array, 
// and it should return false if every element is distinct.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> numsSet(nums.begin(), nums.end());
    return numsSet.size() != nums.size();
  }
};

// Time:  O(nlogn)
// Space: O(1)
class Solution2 {
public:
  bool containsDuplicate(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    return unique(nums.begin(), nums.end()) != nums.end();
  }
};
