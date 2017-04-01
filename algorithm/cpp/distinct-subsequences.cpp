// 115. Distinct Subsequences
// Difficulty: Hard

// Given a string S and a string T, count the number of distinct subsequences of T in S.

// A subsequence of a string is a new string which is formed from the original string 
// by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. 
// (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

// Here is an example:
// S = "rabbbit", T = "rabbit"

// Return 3.

// Time Complexity: O(m * n)
// Space Complexity: O(n)

class Solution {
public:
  int numDistinct(const string &S, const string &T) {
    vector<int> f(T.size() + 1);
    f[0] = 1; // f(0, 0) = 1, means S = "" and T = "", there is only one distinct subsequence, i.e. ""
    for (int i = 1; i <= S.size(); ++i) {
      for (int j = T.size(); j > 0; --j) {
        // f(i, j) is composed of:
        // f(i−1,j): not using S[i - 1] 
        // f(i−1,j−1): using S[i - 1] if S[i - 1] == S[j - 1]
        f[j] += (S[i - 1] == T[j - 1]) ? f[j - 1] : 0;
      }
    }
    return f[T.size()];
  }
};
