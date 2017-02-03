344. Reverse String
Difficulty: Easy

Write a function that takes a string as input and returns the string reversed.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    string reverseString(string s) {
        for (int i = 0, j = s.length() - 1; i < j; ++i, --j) {
            swap(s[i], s[j]);
        }
        return s;
    }
};