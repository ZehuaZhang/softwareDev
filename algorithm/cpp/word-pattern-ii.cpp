// 291. Word Pattern II
// Difficulty : Hard 

// Given a pattern and a string str, find if str follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern 
// and a non-empty substring in str.

// Examples:

// pattern = "abab", str = "redblueredblue" should return true.
// pattern = "aaaa", str = "asdasdasdasd" should return true.
// pattern = "aabb", str = "xyzabcxzyabc" should return false.
 

// Notes:
// You may assume both pattern and str contains only lowercase letters.

// Time:  O(n * C(n - 1, c - 1)), n is length of str, c is unique count of pattern,
//                                there are H(n - c, c - 1) = C(n - 1, c - 1) possible splits of string,
//                                and each one costs O(n) to check if it matches the word pattern.
// Space: O(n + c) 

class Solution {
public:
    bool wordPatternMatch(string pattern, string str) {
        unordered_map<string, char> w2p;
        unordered_map<char, string> p2w;
        return match(pattern, str, 0, 0, w2p, p2w);
    }

    bool match(const string &pattern, const string &str,
               const int i, const int j,
               unordered_map<string, char> &w2p,
               unordered_map<char, string> &p2w) {

        bool isMatch = false;
        if (i == pattern.length() && j == str.length()) {
            isMatch = true;
        } else if (i < pattern.length() && j < str.length()) {
            const char p = pattern[i];
            if (p2w.count(p)) {
                const auto& w = p2w[p];
                if (w == str.substr(j, w.length())) {  // Match pattern.
                    isMatch = match(pattern, str, i + 1, j + w.length(), w2p, p2w);
                }  // Else return false.
            } else {
                for (int k = j; k < str.length() && !isMatch; ++k) {
                    const string w = str.substr(j, k - j + 1);
                    if (!w2p.count(w)) {
                        // Build mapping. Space: O(n + c)
                        w2p[w] = p, p2w[p] = w;
                        isMatch = match(pattern, str, i + 1, k + 1, w2p, p2w);
                        w2p.erase(w), p2w.erase(p);
                    }  // Else try longer word.
                }
            }
        }
        return isMatch;
    }
};
