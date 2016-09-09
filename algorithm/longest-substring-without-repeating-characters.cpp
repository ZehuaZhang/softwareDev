3. Longest Substring Without Repeating Characters
Difficulty: Medium

Given a string, find the length of the longest substring without repeating characters.

Examples:
Given "abcabcbb", the answer is "abc", which the length is 3.

Given "bbbbb", the answer is "b", with the length of 1.

Given "pwwkew", the answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Record the last occurrence of each char.
        unordered_map<char, size_t> charLastOccurIndex;
        size_t start = 0, ans = 0;

        for (size_t i = 0; i < s.size(); ++i) {
            if (charLastOccurIndex.count(s[i])) {
                if (charLastOccurIndex[s[i]] >= start) {    // found repeated
                    ans = max(ans, i - start);
                    start = charLastOccurIndex[s[i]] + 1;   // advance to next of previous repeated position
                }
            }
            charLastOccurIndex[s[i]] = i;   // update current position
        }
        return max(ans, s.size() - start);
    }
};
