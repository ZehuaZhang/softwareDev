151. Reverse Words in a String
Difficulty: Medium

Given an input string, reverse the string word by word.

For example,
Given s = "the sky is blue",
return "blue is sky the".

Update (2015-02-12):
For C programmers: Try to solve it in-place in O(1) space.

click to show clarification.

Clarification:
What constitutes a word?
A sequence of non-space characters constitutes a word.
Could the input string contain leading or trailing spaces?
Yes. However, your reversed string should not contain leading or trailing spaces.
How about multiple spaces between two words?
Reduce them to a single space in the reversed string.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    void reverseWords(string &s) {
        // Reverse the whole string first.
        reverse(s.begin(), s.end());

        size_t begin = 0, end = 0, len = 0;
        while ((begin = s.find_first_not_of(" ", end)) != string::npos) {
            if ((end = s.find(" ", begin)) == string::npos) {
                end = s.length();
            }
            // Reverse each word in the string.
            reverse(s.begin() + begin, s.begin() + end);

            // Shift the word to avoid extra space.
            move(s.begin() + begin, s.begin() + end, s.begin() + len);
            len += end - begin;
            s[len++] = ' ';
        }
        s.resize(len ? len - 1 : 0);
    }
};
