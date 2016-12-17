30. Substring with Concatenation of All Words
Difficulty: Hard

You are given a string, s, and a list of words, words, that are all of the same length.
Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

For example, given:
s: "barfoothefoobarman"
words: ["foo", "bar"]

You should return the indices: [0,9].
(order does not matter).

// Time:  O((m - n * k) * n * k) ~ O(m * n * k), m is the length of the string,
//                                               n is the size of the dictionary,
//                                               k is the length of each word
// Space: O(n * k)

class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        const auto wordLen = words[0].length();
        const auto catLen = wordLen * words.size();
        vector<int> result;

        if (s.length() < catLen) {
            return result;
        }

        unordered_map<string, int> wordCount;
        for (auto word : words) {
            ++wordCount[word];
        }

        for (auto it = s.begin(); it <= prev(s.end(), catLen); ++it) {  // iterate string
            unordered_map<string, int> unused(wordCount);
            for (auto jt = it; jt != next(it, catLen); jt += wordLen) { // iterate dictionary
                auto pos = unused.find(string(jt, next(jt, wordLen)));
                if (pos == unused.end()) {  // substring not found in dictionary
                    break;
                }
                if (--pos->second == 0) {   // erase one by one
                    unused.erase(pos);
                }
            }
            if (unused.empty()) {
                result.emplace_back(distance(s.begin(), it));
            }
        }
        return result;
    }
};
