// 132. Palindrome Partitioning II
// Difficulty: Hard

// Given a string s, partition s such that every substring of the partition is a palindrome.

// Return the minimum cuts needed for a palindrome partitioning of s.

// For example, given s = "aab",
// Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.

// Time Complexity: O(n^2)
// Space Complexity: O(n^2)

class Solution {
public:      
  int minCut(string s) {
    const int n = s.size();
    vector<vector<bool> > p(n, vector<bool>(n, false));
    vector<int> f(n + 1, 0);

    for(int i = 0; i <= n; ++i) {
      f[i] = n - 1 - i;
    }

    for (int i = n - 1; i >= 0; --i) {
      for (int j = i; j < n; ++j) {
        if (s[i] == s[j] && ((j - i < 2) || p[i + 1][j - 1])) {
          p[i][j] = true;
          f[i] = min(f[i], f[j + 1] + 1);  // f[i] = min(f[j + 1] + 1) for each i <= j <= n - 1
        }
      }   
    }
    return f[0];
  }
};
