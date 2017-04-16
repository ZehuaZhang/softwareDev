// 58. Length of Last Word
// Difficulty: Easy

// Given a string s consists of upper/lower-case alphabets and empty space characters ' ', 
// return the length of last word in the string.

// If the last word does not exist, return 0.

// Note: A word is defined as a character sequence consists of non-space characters only.

// For example, 
// Given s = "Hello World",
// return 5.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int lengthOfLastWord(const string& s) {
    int len = 0;
    for (int i = 0; i < s.length(); i++) {
      if (s[i] != ' ') {
        ++len;
      } else if (i + 1 < s.length() && s[i + 1] != ' ') {
        len = 0;
      }
    }
    return len;
  }
};

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int lengthOfLastWord(string s) {
    const auto first= find_if(s.rbegin(), s.rend(), ::isalpha);
    const auto last = find_if_not(first, s.rend(), ::isalpha);
    return distance(first, last);
  }
};
