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
  const n = s.length;

  let cnts = Array(256).fill(0);
  for (const c of t) {
    ++cnts[c.charCodeAt(0)];
  }

  let [rL, rR] = [-1, n];
  let cnt = t.length;
  for (let l = 0, r = 0; r < n; ++r) {
    if (--cnts[s.charCodeAt(r)] >= 0) {
      --cnt;
    }

    for (; !cnt; ++l) {
      if (r - l < rR - rL) {
        [rL, rR] = [l, r];
      }
      if (++cnts[s.charCodeAt(l)] >= 1) {
        ++cnt;
      }
    }
  }

  return rL === -1 ? "" : s.substring(rL, rR + 1);
}
