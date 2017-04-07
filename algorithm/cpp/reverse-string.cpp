// 344. Reverse String
// Difficulty: Easy

// Write a function that takes a string as input and returns the string reversed.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  string reverseString(string s) {
    for (int left = 0, right = s.length() - 1; left < right; ++left, --right) {
      swap(s[left], s[right]);
    }
    return s;
  }
};