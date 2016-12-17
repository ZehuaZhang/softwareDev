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
        reverse(s.begin(), s.end());
        
        istringstream ss(s);
        string word;
        ostringstream os;
        
        while (ss >> word) {
            reverse(word.begin(), word.end());
            os << word << " ";
        }
        s = os.str();
        
        if (!s.empty()) {
            s.pop_back();
        }
    }
};
