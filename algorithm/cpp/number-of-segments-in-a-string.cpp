// 434. Number of Segments in a String
// Difficulty: Easy

// Count the number of segments in a string, where a segment is defined to be a contiguous sequence of non-space characters.

// Please note that the string does not contain any non-printable characters.

// Example:

// Input: "Hello, my name is John"
// Output: 5

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int countSegments(string s) {
    int result = static_cast<int>(!s.empty() && s.back() != ' ');
    for (int i = 1; i < s.size(); ++i) {
      if (s[i] == ' ' && s[i - 1] != ' ') {
        ++result;
      }
    }
    return result;
  }
};