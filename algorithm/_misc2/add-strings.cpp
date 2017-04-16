// 415. Add Strings
// Difficulty: Easy

// Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

// Note:

// The length of both num1 and num2 is < 5100.
// Both num1 and num2 contains only digits 0-9.
// Both num1 and num2 does not contain any leading zero.
// You must not use any built-in BigInteger library or convert the inputs to integer directly.

class Solution {
public:
  string addStrings(string num1, string num2) {
    string res;
    const int m = num1.length(), n = num2.length();

    size_t carry = 0;
    for (int i = 0; i < max(m, n); ++i) {
      const size_t a = i < m ? num1[m - 1 - i] - '0' : 0;
      const size_t b = i < n ? num2[n - 1 - i] - '0' : 0;
      size_t sum = carry + a + b;
      carry = sum / 10;
      res.push_back('0' + sum % 10);
    }
    if (carry) {
      res.push_back('0' + carry);
    }
    reverse(res.begin(), res.end());

    return res;
  }
};

