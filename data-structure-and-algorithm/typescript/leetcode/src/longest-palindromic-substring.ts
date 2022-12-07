/*
Given a string s, return the longest palindromic substring in s.



Example 1:

Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
Example 3:

Input: s = "a"
Output: "a"
Example 4:

Input: s = "ac"
Output: "a"


Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters (lower-case and/or upper-case),
*/

function longestPalindrome(s) {
  const dp = Array(s.length)
    .fill(false)
    .map(() => Array(s.length).fill(false));
  let left = 0,
    right = 0;
  for (let i = 0; i < s.length; ++i) {
    dp[i][i] = true;
    for (let j = 0; j < i; ++j) {
      dp[j][i] = s[i] === s[j] && (i - j < 2 || dp[j + 1][i - 1]);
      if (dp[j][i] && right - left < i - j) {
        right = i;
        left = j;
      }
    }
  }
  return s.substring(left, right + 1);
}
