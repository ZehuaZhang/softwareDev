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

function longestPalindromeSubString(input: string): string {
  const {length} = input;
  const dp = [...Array(length)].map(() => Array(length).fill(false));
  let [left, right] = [0, 0];
  for (let i = 0; i < length; ++i) {
    dp[i][i] = true;
    for (let j = 0; j < i; ++j) {
      dp[j][i] = input[i] === input[j] && (i - j < 2 || dp[j + 1][i - 1]);
      if (dp[j][i] && right - left < i - j) {
        right = i;
        left = j;
      }
    }
  }
  return input.substring(left, right + 1);
}
