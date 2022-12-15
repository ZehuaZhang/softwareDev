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
s consists only of lowercase English letters.
*/

function checkPartitioning(input: string): boolean {
  const size = input.length;
  const dp = [...Array(size)].map(() => Array(size).fill(false));
  for (let i = size - 1; i >= 0; --i) {
    for (let j = i; j < size; ++j) {
      if (input[i] === input[j]) {
        dp[i][j] = i + 1 <= j - 1 ? dp[i + 1][j - 1] : true;
      } else {
        dp[i][j] = false;
      }
    }
  }

  // loop each mid, check left, mid and right
  for (let i = 1; i < size - 1; ++i) {
    for (let j = i; j < size - 1; ++j) {
      if (dp[0][i - 1] && dp[i][j] && dp[j + 1][size - 1]) {
        return true;
      }
    }
  }
  return false;
}
