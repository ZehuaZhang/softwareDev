/*
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.



Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.


Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.


Follow up: Could you find an algorithm that runs in O(m + n) time?
Accepted
557,372
Submissions
1,518,535
*/

function minWindow(s, t) {
  const map = Array(128).fill(0);
  for (const c of t) {
    ++map[c.charCodeAt()];
  }
  let count = t.length;
  let result = [-1, s.length];
  for (let left = 0, right = 0; right < s.length; ++right) {
    if (--map[s[right].charCodeAt()] >= 0) {
      --count;
    }
    for (; count === 0; ++left) {
      if (right - left + 1 < result[1] - result[0]) {
        result = [left, right + 1];
      }
      if (++map[s[left].charCodeAt()] === 1) {
        ++count;
      }
    }
  }
  return result[0] === -1 ? '' : s.substring(...result);
}
