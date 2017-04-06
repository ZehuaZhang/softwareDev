// 267. Palindrome Permutation II
// Difficulty : Medium 

// Given a string s, return all the palindromic permutations (without duplicates) of it.
// Return an empty list if no palindromic permutation could be form.

// For example:

// Given s = "aabb", return ["abba", "baab"].

// Given s = "abc", return [].

// Hint:
// If a palindromic permutation exists, we just need to generate the first half of the string.
// To generate all distinct permutations of a (half of) string, use a similar approach from: 
// Permutations II or Next Permutation.

// Time:  O(n * n!)
// Space: O(n)

class Solution {
public:
  vector<string> generatePalindromes(string s) {
    if (s.empty()) {
      return {};
    }

    unordered_map<char, int> cnt;
    for (const auto& c : s) {
      ++cnt[c];
    }

    string mid, chars;
    for (const auto& kvp : cnt) {
      if (kvp.second % 2) {
        if (mid.empty()) {
          mid.push_back(kvp.first);
        } else {
          return {};
        }
      }
      chars.append(kvp.second / 2, kvp.first);
    }
    return permuteUnique(mid, chars);
  }
  
  vector<string> permuteUnique(const string& mid, string& chars) {
    vector<string> result;
    sort(chars.begin(), chars.end());
    do {
      string reverse_chars(chars.crbegin(), chars.crend());
      result.emplace_back(chars + mid + reverse_chars);
    } while (next_permutation(chars.begin(), chars.end()));
    return result;
  }
};