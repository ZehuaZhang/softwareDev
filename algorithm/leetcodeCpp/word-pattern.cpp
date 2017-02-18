// 290. Word Pattern
// Difficulty: Easy

// Given a pattern and a string str, find if str follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

// Examples:
// pattern = "abba", str = "dog cat cat dog" should return true.
// pattern = "abba", str = "dog cat cat fish" should return false.
// pattern = "aaaa", str = "dog cat cat dog" should return false.
// pattern = "abba", str = "dog dog dog dog" should return false.

// Notes:
// You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.

// Time:  O(n)
// Space: O(c), c is unique count of pattern

class Solution {
public:
    bool wordPattern(string pattern, string str) {
        unordered_map<char, int> mapP;
        unordered_map<string, int> mapW;
        istringstream in(str);
        int i = 0;
        for (string word; in >> word; ++i) {
            if (mapP[pattern[i]] != mapW[word]) {
                return false;
            }
            mapP[pattern[i]] = mapW[word] = i + 1;
        }
        return i == pattern.size();
    }
};
