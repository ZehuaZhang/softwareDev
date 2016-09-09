358. Rearrange String k Distance Apart
Difficulty : Hard

Given a non-empty string str and an integer k, rearrange the string such that the same characters are at least distance k from each other.

All input strings are given in lowercase letters. If it is not possible to rearrange the string, return an empty string "".

Example 1:
str = "aabbcc", k = 3
Result: "abcabc"

The same letters are at least distance 3 from each other.

Example 2:
str = "aaabc", k = 3 
Answer: ""

It is not possible to rearrange the string.

Example 3:
str = "aaadbbcc", k = 2
Answer: "abacabcd"
Another possible answer is: "abcabcda"

The same letters are at least distance 2 from each other.

// Time:  O(nlogc), c is the count of unique characters.
// Space: O(c)

class Solution2 {
public:
    string rearrangeString(string str, int k) {
        if (k == 0) {
            return str;
        }

        unordered_map<char, int> cnts;
        for (const auto& c : str) {
            ++cnts[c];
        }

        priority_queue<pair<int, char>> heap;   // reverse unordered_map from (char, cnt) to (cnt, char)
        for (const auto& cnt : cnts) {
            heap.emplace(cnt.second, cnt.first);
        }

        string result;
        while (!heap.empty()) {
            vector<pair<int, char>> usedCntChars;
            int cnt = min(k, static_cast<int>(str.length() - result.length()));
            for (int i = 0; i < cnt; ++i) {
                if (heap.empty()) {
                    return "";
                }
                // extract element which has most counts, append to string
                auto cntChar = heap.top(); heap.pop();
                result.push_back(cntChar.second);
                // if there's some left, store the pair into buffer
                if (--cntChar.first > 0) {
                    usedCntChars.emplace_back(cntChar);
                }
            }
            // put used pairs back for next iteration
            for (auto pair: usedCntChars) {
                heap.emplace(pair);
            }
        }
        return result;
    }
};
