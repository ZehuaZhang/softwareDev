// 466. Count The Repetitions
// Difficulty: Hard

// Define S = [s,n] as the string S which consists of n connected strings s. For example, ["abc", 3] ="abcabcabc".

// On the other hand, we define that string s1 can be obtained from string s2
// if we can remove some characters from s2 such that it becomes s1.

// For example, “abc” can be obtained from “abdbec” based on our definition, but it can not be obtained from “acbbe”.

// You are given two non-empty strings s1 and s2 (each at most 100 characters long) and two integers 0 ≤ n1 ≤ 10^6 and 1 ≤ n2 ≤ 10^6.
// Now consider the strings S1 and S2, where S1=[s1,n1] and S2=[s2,n2].
// Find the maximum integer M such that [S2,M] can be obtained from S1.

// Example:

// Input:
// s1="acb", n1=4
// s2="ab", n2=2

// Return:
// 2

// Time:  O(s1 * min(s2, n1))
// Space: O(s2)

class Solution {
public:
  int getMaxRepetitions(string s1, int n1, string s2, int n2) {
    vector<int> repeatCount(s2.size() + 1, 0);
    unordered_map<int, int> round;
    int j = 0, count = 0;
    for (int k = 1; k <= n1; ++k) {
      for (int i = 0; i < s1.size(); ++i) {
        if (s1[i] == s2[j]) {
          j = (j + 1) % s2.size();
          count += (j == 0);
        }
      }
      if (round.count(j)) {  // cyclic
        int i = round[j];
        int prefixCount = repeatCount[i];
        int patternCount = (count - repeatCount[i]) * ((n1 - i) / (k - i));
        int suffixCount = repeatCount[i + (n1 - i) % (k - i)] - repeatCount[i];
        return (prefixCount + patternCount + suffixCount) / n2;
      }
      round[j] = k;
      repeatCount[k] = count;
    }
    return repeatCount[n1] / n2;  // not cyclic if n1 <= s2
  }
};