/*
Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).



Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
Example 4:

Input: s = "aab", p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
Example 5:

Input: s = "mississippi", p = "mis*is*p*."
Output: false


Constraints:

0 <= s.length <= 20
0 <= p.length <= 30
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

/**
 * @param { string } s
 * @param { string } p
 * @return { boolean }
 */
function isMatch(s, p) {
  if (!p.length) {
    return !s.length;
  }

  if (p[1] === '*') {
    return (
      isMatch(s, p.substring(2)) ||
      (s.length && (s[0] == p[0] || '.' == p[0]) && isMatch(s.substring(1), p))
    );
  }
  return (
    s.length &&
    (s[0] == p[0] || '.' == p[0]) &&
    isMatch(s.substring(1), p.substring(1))
  );
}

function dfs(s, p, i, j) {
  if (j === p.length) {
    return i === s.length;
  }

  if (p[j + 1] !== '*') {
    if (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
      return dfs(s, p, i + 1, j + 1);
    }
    return false;
  }
  while (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
    if (dfs(s, p, i, j + 2)) {
      return true;
    }
    ++i;
  }
  return dfs(s, p, i, j + 2);
}
