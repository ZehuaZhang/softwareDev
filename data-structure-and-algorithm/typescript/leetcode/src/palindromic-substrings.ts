/*
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.



Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".


Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
*/

function countSubstrings(input: string): number {
  let result = 0;
  for (let i = 0; i < input.length; ++i) {
    // input[i - j] <=> input[i + j]
    for (
      let j = 0;
      i - j >= 0 && i + j < input.length && input[i - j] === input[i + j];
      ++j
    ) {
      ++result;
    }

    // input[i - 1 - j] <=> input[i + j]
    for (
      let j = 0;
      i - 1 - j >= 0 &&
      i + j < input.length &&
      input[i - 1 - j] === input[i + j];
      ++j
    ) {
      ++result;
    }
  }
  return result;
}
