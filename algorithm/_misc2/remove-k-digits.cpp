// 402. Remove K Digits
// Difficulty: Medium

// Given a non-negative integer num represented as a string, remove k digits from the number
// so that the new number is the smallest possible.

// Note:
// The length of num is less than 10002 and will be ≥ k.
// The given num does not contain any leading zero.
// Example 1:

// Input: num = "1432219", k = 3
// Output: "1219"
// Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
// Example 2:

// Input: num = "10200", k = 1
// Output: "200"
// Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
// Example 3:

// Input: num = "10", k = 2
// Output: "0"
// Explanation: Remove all the digits from the number and it is left with nothing which is 0.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  string removeKdigits(string num, int k) {
    string s;
    for (const auto c : num) {
      while (k > 0 && !s.empty() && s.back() > c) {
        s.pop_back();
        --k;
      }
      s.push_back(c);
    }
    s.resize(s.length() - k);

    s = s.substr(s.find_first_not_of('0'));
    
    return s.empty() ? "0" : s;
  }
};