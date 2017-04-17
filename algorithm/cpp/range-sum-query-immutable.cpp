// 303. Range Sum Query - Immutable
// Difficulty: Easy

// Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

// Example:
// Given nums = [-2, 0, 3, -5, 2, -1]

// sumRange(0, 2) -> 1
// sumRange(2, 5) -> -1
// sumRange(0, 5) -> -3
// Note:
// You may assume that the array does not change.
// There are many calls to sumRange function.

// Your NumArray object will be instantiated and called as such:
// NumArray numArray(nums);
// numArray.sumRange(0, 1);
// numArray.sumRange(1, 2);

// Time:  ctor:   O(n),
//        lookup: O(1)
// Space: O(n)

class NumArray {
public:
  NumArray(vector<int>& nums) {
    accu.emplace_back(0);
    for (auto num : nums) {
      accu.emplace_back(accu.back() + num);
    }
  }

  int sumRange(int i, int j) {
    return accu[j + 1] - accu[i];
  }

private:
  vector<int> accu;
};