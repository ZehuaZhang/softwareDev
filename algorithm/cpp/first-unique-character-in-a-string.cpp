// 387. First Unique Character in a String
// Difficulty: Easy

// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

// Examples:

// s = "leetcode"
// return 0.

// s = "loveleetcode",
// return 2.
// Note: You may assume the string contain only lowercase letters.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> m;
        for (char c : s) ++m[c];
        for (int i = 0; i < s.size(); ++i) {
            if (m[s[i]] == 1) return i;
        }
        return -1;
    }
};