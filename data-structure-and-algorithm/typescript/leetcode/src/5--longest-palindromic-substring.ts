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
  const {length} = s;
  const dp = [...Array(length)].map(() => Array(length).fill(false));
  let [left, right] = [0, 0];
  for (let i = 0; i < length; ++i) {
    dp[i][i] = true;
    for (let j = 0; j < i; ++j) {
      if (s[j] === s[i] && (i - j < 2 || dp[j + 1][i - 1])) {
        dp[j][i] = true;
      }
      if (dp[j][i] && right - left < i - j) {
        [left, right] = [j, i];
      }
    }
  }
  return s.substring(left, right + 1);
}
