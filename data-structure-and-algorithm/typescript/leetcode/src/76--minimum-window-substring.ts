/*
76. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

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
*/

function minWindow(s: string, t: string): string {
  const cnts = Array(128).fill(0);
  for (let i = 0; i < t.length; ++i) {
    ++cnts[t.charCodeAt(i)];
  }
  let l = -1,
    r = s.length;
  let cnt = t.length;
  for (let left = 0, right = 0; right < s.length; ++right) {
    if (--cnts[s.charCodeAt(right)] >= 0) {
      --cnt;
    }
    for (; cnt === 0; ++left) {
      if (right - left + 1 < r - l) {
        l = left;
        r = right + 1;
      }
      if (++cnts[s.charCodeAt(left)] >= 1) {
        ++cnt;
      }
    }
  }
  return l === -1 ? '' : s.substring(l, r);
}
