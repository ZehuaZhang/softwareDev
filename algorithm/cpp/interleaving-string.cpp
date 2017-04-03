// 97. Interleaving String
// Difficulty: Hard

// Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

// For example,
// Given:
// s1 = "aabcc",
// s2 = "dbbca",

// When s3 = "aadbbcbcac", return true.
// When s3 = "aadbbbaccc", return false.

// Time Complexity: O(m * n)
// Space Complexity: O(m + n)

class Solution {
public:
  bool isInterleave(string s1, string s2, string s3) {
    if (s1.length() + s2.length() != s3.length()) {
      return false;
    }
    if (s1.length() < s2.length()) {
      return isInterleave(s2, s1, s3);
    }

    vector<bool> f(s2.length() + 1, true);

    for (auto j = 1; j <= s2.length(); ++j) {
      f[j] = f[j - 1] && s2[j - 1] == s3[j - 1];
    }

    for (auto i = 1; i <= s1.length(); ++i) {
      f[0] = f[0] && s1[i - 1] == s3[i - 1];
      for (auto j = 1; j <= s2.length(); ++j) {
        f[j] = (f[j] && s1[i - 1] == s3[i + j - 1]) || (f[j - 1] && s2[j - 1] == s3[i + j - 1]);
      }
    }
    return f[s2.length()];
  }
};
