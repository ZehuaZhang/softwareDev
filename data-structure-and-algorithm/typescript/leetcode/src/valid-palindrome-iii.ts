/*
Given a string s and an integer k, find out if the given string is a K-Palindrome or not.

A string is K-Palindrome if it can be transformed into a palindrome by removing at most k characters from it.



Example 1:

Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' characters.


Constraints:

1 <= s.length <= 1000
s has only lowercase English letters.
1 <= k <= s.length
*/

function isValidPalindrome(s, k) {
  const length = longestPalindromeSubseq(s);
  return Math.abs(length - s.length) <= k;
}

function longestPalindromeSubseq(s) {
  const dp = [...Array(s.length)].map(() => Array(s.length).fill(0));
  for (let i = s.length - 1; i >= 0; --i) {
    dp[i][i] = 1;
    for (let j = i + 1; j < s.length; ++j) {
      if (s[i] == s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][s.length - 1];
}
