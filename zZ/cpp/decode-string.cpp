// 394. Decode String
// Difficulty: Medium

// Given an encoded string, return it's decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.
// Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.
// For example, there won't be input like 3a or 2[4].

// Examples:

// s = "3[a]2[bc]", return "aaabcbc".
// s = "3[a2[c]]", return "accaccacc".
// s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

// Time:  O(n)
// Space: O(h), h is the depth of the recursion

class Solution {
public:
  string decodeString(string s) {
    string curr;
    stack<int> nums;
    stack<string> strs;
    int n = 0;
    for (const auto& c : s) {
      if (isdigit(c)) {
        n = n * 10 + c - '0';
      } else if (c == '[') {
        nums.emplace(n);
        n = 0;
        strs.emplace(curr);
        curr.clear();
      } else if (c == ']') {
        while (nums.top()--) {
          strs.top() += curr;
        }
        nums.pop();
        curr = strs.top(); strs.pop();
      } else {
        curr += c;
      }
    }
    return curr;
  }
};