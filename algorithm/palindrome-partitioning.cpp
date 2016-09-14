131. Palindrome Partitioning
Difficulty: Medium

Given a string s, partition s such that every substring of the partition is a palindrome.

Return all possible palindrome partitioning of s.

For example, given s = "aab",
Return

[
  ["aa","b"],
  ["a","a","b"]
]

// Time Complexity: average: O(n^2), worst: O(n^2 * 2^n)
// Space Complexity: average: O(1), worst: O(2^n)

class Solution {
    public:
        vector<vector<string> > partition(string s) {
            const int n = s.size();
            bool p[n][n];

            fill_n(&p[0][0], n * n, false);

            for (int i = n - 1; i >= 0; --i) {
                for (int j = i; j < n; ++j) {
                    p[i][j] = s[i] == s[j] && ((j - i < 2) || p[i + 1][j - 1]);
                }
            }

            vector<vector<string> > subPalins[n];
            for (int i = n - 1; i >= 0; --i) {
                for (int j = i; j < n; ++j)
                    if (p[i][j]) {
                        const string palindrome = s.substr(i, j - i + 1);
                        if (j + 1 < n) {
                            for (auto sub : subPalins[j + 1]) {
                                sub.insert(sub.begin(), palindrome);
                                subPalins[i].push_back(sub);
                            }
                        } else {
                            subPalins[i].push_back(vector<string> { palindrome });
                        }
                    }
            }

            return subPalins[0];
        }
};
