/*
Given a string s, return true if the s can be palindrome after deleting at most one character from it.



Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false


Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
*/

function validPalindrome(s) {
  for (let left = 0, right = s.length - 1; left < right; ++left, --right) {
    if (s[left] !== s[right]) {
      let i, j;
      for (i = left, j = right - 1; i < j && s[i] === s[j]; ++i, --j);
      if (i >= j) {
        return true;
      }
      for (i = left + 1, j = right; i < j && s[i] === s[j]; ++i, --j);
      if (i >= j) {
        return true;
      }
      return false;
    }
  }
  return true;
}
