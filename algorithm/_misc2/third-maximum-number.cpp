// 414. Third Maximum Number
// Difficulty: Easy

// Given a non-empty array of integers, return the third maximum number in this array.
// If it does not exist, return the maximum number. The time complexity must be in O(n).

// Example 1:
// Input: [3, 2, 1]

// Output: 1

// Explanation: The third maximum is 1.
// Example 2:
// Input: [1, 2]

// Output: 2

// Explanation: The third maximum does not exist, so the maximum (2) is returned instead.
// Example 3:
// Input: [2, 2, 3, 1]

// Output: 1

// Explanation: Note that the third maximum here means the third maximum distinct number.
// Both numbers with value 2 are both considered as second maximum.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int thirdMax(vector<int>& nums) {
    int count = 0;
    vector<long> top(3, numeric_limits<long>::min());

    for (const auto& num : nums) {
      if (num > top[0]) {
        top[2] = top[1];
        top[1] = top[0];
        top[0] = num;
        ++count;
      } else if (num != top[0] && num > top[1]) {
        top[2] = top[1];
        top[1] = num;
        ++count;
      } else if (num != top[0] && num != top[1] && num > top[2]) {
        top[2] = num;
        ++count;
      }
    }
    return count < 3 ? top[0] : top[2];
  }
};