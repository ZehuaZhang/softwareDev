// 472. Concatenated Words
// Difficulty: Hard

// Given a list of words (without duplicates),
// please write a program that returns all concatenated words in the given list of words.

// A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.

// Example:
// Input: ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]

// Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]

// Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
//  "dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
// "ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
// Note:
// The number of elements of the given array will not exceed 10,000
// The length sum of elements in the given array will not exceed 600,000.
// All the input string will only include lower case letters.
// The returned elements order does not matter.

// Time:  O(n * l^2)
// Space: O(n * l)

class Solution {
public:
  vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
    unordered_set<string> lookup(words.begin(), words.end());
    vector<string> result;
    for (const auto& word : words) {
      vector<bool> dp(word.length() + 1);
      dp[0] = true;
      for (int i = 0; i < word.length(); ++i) {
        if (!dp[i]) {
          continue;
        }
        for (int j = i + 1; j <= word.length(); ++j) {
          if (j - i < word.length() && lookup.count(word.substr(i, j - i))) {
            dp[j] = true;
          }
        }
        if (dp[word.length()]) {
          result.emplace_back(word);
          break;
        }
      }
    }
    return result;
  }
};