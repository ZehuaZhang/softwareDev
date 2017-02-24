// 5. Longest Palindromic Substring
// Difficulty: Medium

// Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.

// Subscribe to see which companies asked this question

// Time:  O(n^2)
// Space: O(n^2)

class Solution {
public:
    string longestPalindrome(const string& s) {
        const int n = s.size();
        bool isPalindrome[n][n];   // [row, col] substring of s is palindrome 
        fill_n(isPalindrome, n * n, false);

        size_t maxLen = 1, start = 0;
        for (size_t i = 0; i < s.size(); i++) {
            isPalindrome[i][i] = true;

            for (size_t j = 0; j < i; j++) { // [j, i]
                if (s[j] == s[i] && (i - j < 2 || isPalindrome[j + 1][i - 1])) {
                    isPalindrome[j][i] = true;

                    if (maxLen < (i - j + 1)) {
                        maxLen = i - j + 1;
                        start = j;
                    }
                }
            }
        }
        return s.substr(start, maxLen);
    }
};

// Time:  O(n)
// Space: O(n)

// Manacher's Algorithm.
class Solution {
public:
    string longestPalindrome(string s) {
        string T = preProcess(s);
        const int n = T.length();
        vector<int> P(n);
        int C = 0, R = 0;
        for (int i = 1; i < n - 1; ++i) {
            int i_mirror = 2 * C - i; // equals to i' = C - (i-C)

            P[i] = (R > i) ? min(R - i, P[i_mirror]) : 0;

            // Attempt to expand palindrome centered at i
            while (T[i + 1 + P[i]] == T[i - 1 - P[i]]) {
                ++P[i];
            }

            // If palindrome centered at i expands the past R,
            // adjust center based on expanded palindrome.
            if (i + P[i] > R) {
                C = i;
                R = i + P[i];
            }
        }

        // Find the maximum element in P.
        int max_i = 0;
        for (int i = 1; i < n - 1; ++i) {
            if (P[i] > P[max_i]) {
                max_i = i;
            }
        }

        return s.substr((max_i - P[max_i]) / 2, P[max_i]);
    }

private:
    string preProcess(const string& s) {
        if (s.empty()) {
            return "^$";
        }
        string ret = "^";
        for (int i = 0; i < s.length(); ++i) {
            ret += "#" + s.substr(i, 1);
        }
        ret += "#$";
        return ret;
    }
};
