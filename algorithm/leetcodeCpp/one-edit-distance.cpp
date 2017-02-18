// 161. One Edit Distance 
// Difficulty: Medium

// Given two strings S and T, determine if they are both one edit distance apart.

// Time:  O(m + n) 
// Space: O(1)

class Solution {
public:
    bool isOneEditDistance(string s, string t) {
        for (int i = 0; i < min(s.size(), t.size()); ++i) {
            if (s[i] != t[i]) {
                if (s.size() == t.size()) {
                    return s.substr(i + 1) == t.substr(i + 1);
                } else if (s.size() < t.size()) {
                    return s.substr(i) == t.substr(i + 1);
                } else {
                    return s.substr(i + 1) == t.substr(i);
                }
            }
        }
        return abs(s.size() - t.size()) == 1;   // both strings are the same, except last character(s) of longer string
    }
};
