/*
Given a string s, return true if it is possible to split the string s into three non-empty palindromic substrings. Otherwise, return false.

A string is said to be palindrome if it the same string when reversed.



Example 1:

Input: s = "abcbdd"
Output: true
Explanation: "abcbdd" = "a" + "bcb" + "dd", and all three substrings are palindromes.
Example 2:

Input: s = "bcbddxy"
Output: false
Explanation: s cannot be split into 3 palindromes.


Constraints:

3 <= s.length <= 2000
s​​​​​​ consists only of lowercase English letters.
*/

function checkPartitioning(s) {
  const dp = [...Array(s.length)].map(() => Array(s.length).fill(false));
  for (let i = s.length - 1; i >= 0; --i) {
    for (let j = i; j < s.length; ++j) {
      if (s[i] === s[j]) {
        dp[i][j] = i + 1 <= j - 1 ? dp[i + 1][j - 1] : true;
      } else {
        dp[i][j] = false;
      }
    }
  }

  // loop each mid, check left, mid and right
  for (let i = 1; i < s.length - 1; ++i) {
    for (let j = i; j < s.length - 1; ++j) {
      if (dp[0][i - 1] && dp[i][j] && dp[j + 1][s.length - 1]) {
        return true;
      }
    }
  }
  return false;
}
