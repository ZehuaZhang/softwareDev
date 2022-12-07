/*
A subsequence of a string s is considered a good palindromic subsequence if:

It is a subsequence of s.
It is a palindrome (has the same value if reversed).
It has an even length.
No two consecutive characters are equal, except the two middle ones.
For example, if s = "abcabcabb", then "abba" is considered a good palindromic subsequence, while "bcb" (not even length) and "bbbb" (has equal consecutive characters) are not.

Given a string s, return the length of the longest good palindromic subsequence in s.



Example 1:

Input: s = "bbabab"
Output: 4
Explanation: The longest good palindromic subsequence of s is "baab".
Example 2:

Input: s = "dcbccacdb"
Output: 4
Explanation: The longest good palindromic subsequence of s is "dccd".


Constraints:

1 <= s.length <= 250
s consists of lowercase English letters.
*/

function longestPalindromeSubseq(s) {
  const dp = [...Array(s.length)].map(() =>
    [...Array(s.length)].map(() => Array(27).fill(0))
  );
  for (let d = 1; d < s.length; ++d)
    for (let i = 0; i + d < s.length; ++i)
      for (let k = 0; k <= 26; ++k) {
        const j = i + d;
        if (
          s[i] === s[j] &&
          s[i] !== String.fromCharCode('a'.charCodeAt() + k)
        ) {
          dp[i][j][k] =
            dp[i + 1][j - 1][s[i].charCodeAt() - 'a'.charCodeAt()] + 2;
        } else {
          dp[i][j][k] = Math.max(dp[i + 1][j][k], dp[i][j - 1][k]);
        }
      }

  return dp[0][n - 1][26];
}
