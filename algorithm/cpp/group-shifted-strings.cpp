// 249. Group Shifted Strings
// Difficulty : Easy

// Given a string, we can "shift" each of its letter to its successive letter, for example: "abc" -> "bcd".
// We can keep "shifting" which forms the sequence:

// "abc" -> "bcd" -> ... -> "xyz"
// Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.

// For example, given: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"], 
// Return:

// [
//   ["abc","bcd","xyz"],
//   ["az","ba"],
//   ["acef"],
//   ["a","z"]
// ]

// Note: For the return value, each inner list elements must follow the lexicographic order.

// Time:  O(nlogn)
// Space: O(n)

class Solution {
public:
  vector<vector<string>> groupStrings(vector<string>& strings) {
    unordered_map<string, multiset<string>> groups;
    for (auto str : strings) {  
      string hashStr = "";
      // Grouping using characters distance offset (to first character) of each word 
      for (auto c : str) {
        hashStr += (c - str[0] + 26) % 26 + 'a';
      }
      groups[hashStr].insert(str);
    }

    vector<vector<string>> result;
    for (auto group : groups) {
      result.push_back(vector<string>(group.second.begin(), group.second.end()));
    }
    return result;
  }
};
