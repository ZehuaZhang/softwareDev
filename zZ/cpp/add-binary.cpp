// 67. Add Binary
// Difficulty: Easy

// Given two binary strings, return their sum (also a binary string).

// For example,
// a = "11"
// b = "1"
// Return "100".

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  string addBinary(string a, string b) {
    string res;
    const int m = a.length(), n = b.length();

    size_t carry = 0;
    for (int i = 0; i < max(m, n); ++i) {
      const size_t aBit = i < m ? a[m - 1 - i] - '0' : 0;
      const size_t bBit = i < n ? b[n - 1 - i] - '0' : 0;
      size_t sum = carry + aBit + bBit;
      carry = sum / 2;
      res.push_back('0' + sum % 2);
    }
    if (carry) {
      res.push_back('0' + carry);
    }
    reverse(res.begin(), res.end());

    return res;
  }
};
