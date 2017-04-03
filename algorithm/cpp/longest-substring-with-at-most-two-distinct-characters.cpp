// 159. Longest Substring with At Most two Distinct Characters
// Difficulty : Hard 

// Given a string, find the length of the longest substring T that contains at most 2 distinct characters.

// For example, Given s = “eceba” and k = 2,

// T is "ece" which its length is 3.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int lengthOfLongestSubstringTwoDistinct(string s) {
    const int k = 2;
    int longest = 0, start = 0, distinct_count = 0;
    array<int, 256> visited = {0};
    for (int i = 0; i < s.length(); ++i) {
      if (visited[s[i]]++ == 0) {
        ++distinct_count;
      }
      while (distinct_count > k) {
        if (--visited[s[start]] == 0) {
          --distinct_count;
        }
        ++start;
      }
      longest = max(longest, i - start + 1);
    }
    return longest;
  }
};
