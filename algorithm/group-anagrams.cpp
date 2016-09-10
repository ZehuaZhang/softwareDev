49. Group Anagrams
Difficulty: Medium

Given an array of strings, group anagrams together.

For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"], 
Return:

[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]

Note: All inputs will be in lower-case.

// Time:  O(n * glogg), g is the max size of groups.
// Space: O(n)

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        for (auto str : strs) {
            string key{str};
            sort(key.begin(), key.end());
            groups[key].emplace_back(str);
        }

        vector<vector<string>> anagrams;
        for (auto group : groups) {
            anagrams.push_back(group.second);
        }

        return anagrams;
    }
};
