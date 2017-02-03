387. First Unique Character in a String
Difficulty: Easy

Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.

// Time:  O(n)
// Space: O(n)

// One-pass solution.
class Solution {
public:
    int firstUniqChar(string s) {
    	list<int> candidates;
    	unordered_map<char, list<int>::iterator> candIdx;
    	for (int i = 0; i < s.length(); ++i) {
    		auto c = s[i];
    		if (candIdx.count(c)) {
    			if (candIdx[c] != candidates.end()) {
    				candidates.erase(candIdx[c]);
    			}
    			candIdx[c] = candidates.end();
    		} else {
    			candIdx[c] = candidates.emplace(candidates.end(), i);
    		}
    	}
    	return candidates.empty() ? -1 : candidates.front();
    }
};
