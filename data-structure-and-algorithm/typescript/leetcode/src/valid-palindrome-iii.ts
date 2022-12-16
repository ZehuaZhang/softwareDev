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

function isValidPalindromeAtMostKDeletion(input: string, kth: number): boolean {
  const {length} = input;
  const palLength = longestPalindromeSubseq(input);
  return Math.abs(length - palLength) <= kth;

  function longestPalindromeSubseq(input: string): number {
    const dp = [...Array(length)].map(() => Array(length).fill(0));
    for (let i = length - 1; i >= 0; --i) {
      dp[i][i] = 1;
      for (let j = i + 1; j < length; ++j) {
        if (input[i] === input[j]) {
          dp[i][j] = dp[i + 1][j - 1] + 2;
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp[0][input.length - 1];
  }
}
