/*
44. Wildcard Matching

Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
Example 3:

Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
 

Constraints:

0 <= s.length, p.length <= 2000
s contains only lowercase English letters.
p contains only lowercase English letters, '?' or '*'.
*/
function isMatch(s: string, p: string): boolean {
  let i = 0,
    j = 0;
  let iStar = -1,
    jStar = -1;
  let m = s.length,
    n = p.length;
  while (i < m) {
    if (j < n && (s[i] === p[j] || p[j] === '?')) {
      ++i;
      ++j;
    } else if (j < n && p[j] === '*') {
      iStar = i;
      jStar = j++;
    } else if (iStar >= 0) {
      i = ++iStar;
      j = jStar + 1;
    } else {
      return false;
    }
  }
  while (j < n && p[j] === '*') {
    ++j;
  }
  return j === n;
}
