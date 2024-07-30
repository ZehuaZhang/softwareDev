/*
5. Longest Palindromic Substring

Given a string s, return the longest 
palindromic
 
substring
 in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
*/

function longestPalindrome(s: string): string {
  const n = s.length;
  const dp = [...Array(n)].map(() => Array(n).fill(false));

  let [l, r] = [0, 0];
  for (let i = 0; i < n; ++i) {
    dp[i][i] = true;
    for (let j = 0; j < i; ++j) {
      if (s[i] === s[j] && (i - j < 2 || dp[i - 1][j + 1])) {
        dp[i][j] = true;
      }
      if (dp[i][j] && r - l < i - j) {
        [l, r] = [j, i];
      }
    }
  }

  return s.substring(l, r + 1);
}
