// 395. Longest Substring with At Least K Repeating Characters
// Difficulty: Medium

// Find the length of the longest substring T of a given string (consists of lowercase letters only)
// such that every character in T appears no less than k times.

// Example 1:

// Input:
// s = "aaabb", k = 3

// Output:
// 3

// The longest substring is "aaa", as 'a' is repeated 3 times.
// Example 2:

// Input:
// s = "ababbc", k = 2

// Output:
// 5

// The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.

// Time:  O(26 * n) = O(n)
// Space: O(26) = O(1)

// Recursive solution.
class Solution {
public:
  int longestSubstring(string s, int k) {
    return longestSubstringHelper(s, k, 0, s.size());
  }

private:
  int longestSubstringHelper(const string& s, int k, int start, int end) {
    vector<int> count(26);
    for (int i = start; i < end; ++i) {
      ++count[s[i] - 'a'];
    }

    int maxLen = 0;
    for (int i = start; i < end;) {
      while (i < end && count[s[i] - 'a'] < k) {
        ++i;
      }
      if (i == end) {
        break;
      }

      int j = i;
      while (j < end && count[s[j] - 'a'] >= k) {
        ++j;
      }
      if (i == start && j == end) {
        return end - start; 
      }

      maxLen = max(maxLen, longestSubstringHelper(s, k, i, j));
      i = j;
    }
    return maxLen;
  }
};