// 186. Reverse Words in a String II
// Difficulty: Medium

// Given an input string, reverse the string word by word. A word is defined as a sequence of non-space characters.
// The input string does not contain leading or trailing spaces and the words are always separated by a single space.
// For example,
// Given s = "the sky is blue",
// return "blue is sky the".
// Could you do it in-place without allocating extra space?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    void reverseWords(string &s) {
        reverse(s.begin(), s.end());
        for (int i = 0, j = 0; j <= s.length(); ++j) {
            if (j == s.length() || s[j] == ' ') {
                reverse(s.begin() + i, s.begin() + j);
                i = j + 1;
            }
        }
    }
};
