// 43. Multiply Strings
// Difficulty: Medium

// Given two numbers represented as strings, return multiplication of the numbers as a string.

// Note:
// The numbers can be arbitrarily large and are non-negative.
// Converting the input string to integer is NOT allowed.
// You should NOT use internal library such as BigInteger.

// Time:  O(m * n)
// Space: O(m + n)

class Solution {
public:
  string multiply(string num1, string num2) {
    const auto charToInt = [](const char c) { return c - '0'; };
    const auto intToChar = [](const int i) { return i + '0'; };

    vector<int> n1, n2;
    transform(num1.rbegin(), num1.rend(), back_inserter(n1), charToInt);    // num1(lsb, msb)
    transform(num2.rbegin(), num2.rend(), back_inserter(n2), charToInt);    // num2(lsb, msb)

    vector<int> sum(n1.size() + n2.size());
    for (int i = 0; i < n1.size(); ++i) {
      for (int j = 0; j < n2.size(); ++j) {
        int multiply = sum[i + j] + n1[i] * n2[j];
        sum[i + j] = multiply % 10;
        sum[i + j + 1] += multiply / 10;
      }
    }
    string res;
    transform(find_if(sum.rbegin(), prev(sum.rend()), [](const int i) { return i != 0; }), sum.rend(), back_inserter(res), intToChar);
    return res;
  }
};
