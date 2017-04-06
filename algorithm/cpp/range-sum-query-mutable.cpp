// Range Sum Query - Mutable
// Difficulty: Medium

// Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

// The update(i, val) function modifies nums by updating the element at index i to val.
// Example:
// Given nums = [1, 3, 5]

// sumRange(0, 2) -> 9
// update(1, 2)
// sumRange(0, 2) -> 8

// Note:
// The array is only modifiable by the update function.
// You may assume the number of calls to update and sumRange function is distributed evenly.

// Your NumArray object will be instantiated and called as such:
// NumArray numArray(nums);
// numArray.sumRange(0, 1);
// numArray.update(1, 10);
// numArray.sumRange(1, 2);

// Time:  ctor:   O(n),
//        update: O(logn),
//        query:  O(logn)
// Space: O(n)

// Binary Indexed Tree (BIT) solution.
class NumArray {
public:
    // C1 = A1
    // C2 = A1 + A2
    // C3 = A3
    // C4 = A1 + A2 + A3 + A4
    // C5 = A5
    // C6 = A5 + A6
    // C7 = A7
    // C8 = A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8
    // in BIT, you can consider "+" is relation with two nodes

  NumArray(vector<int>& snums) : {
    _nums.resize(nums.size() + 1);
    _bits.resize(nums.size() + 1);
    for (int i = 0; i < nums.size(); ++i) {
      update(i, nums[i]);
    }
  }

  void update(int i, int val) {
    int diff = val - _nums[i + 1];  // difference of new and previous value
    for (int j = i + 1; j < _nums.size(); j += (j & -j)) {  // advance by lower bit set
      _bits[j] += diff;
    }
    _nums[i + 1] = val;
  }

  int sumRange(int i, int j) {
    return getSum(j + 1) - getSum(i);
  }   
   
  int getSum(int i) { // accumulative sum before i
    int result = 0;
    for (int j = i; j > 0; j -= (j & -j)) { 
      result += _bits[j];
    }
    return result;
  }

private:
  vector<int> _nums;  // nums staring @ index 1
  vector<int> _bits;  // diff
};
