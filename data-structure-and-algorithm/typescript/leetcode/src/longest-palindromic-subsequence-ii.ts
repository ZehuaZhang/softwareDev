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

function longestPalindromeSubseqII(input: string): string {
  const codeBase = 'a'.charCodeAt(0);
  const {length} = input;
  const dp = [...Array(length)].map(() =>
    [...Array(length)].map(() => Array(27).fill(0))
  );
  for (let delta = 1; delta < length; ++delta)
    for (let i = 0; i + delta < length; ++i)
      for (let k = 0; k <= 26; ++k) {
        const j = i + delta;
        if (
          input[i] === input[j] &&
          input[i] !== String.fromCharCode(codeBase + k)
        ) {
          dp[i][j][k] = dp[i + 1][j - 1][input[i].charCodeAt(0) - codeBase] + 2;
        } else {
          dp[i][j][k] = Math.max(dp[i + 1][j][k], dp[i][j - 1][k]);
        }
      }

  return dp[0][length - 1][26];
}
