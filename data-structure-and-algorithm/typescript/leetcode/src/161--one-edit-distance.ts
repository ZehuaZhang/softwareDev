/*
161. One Edit Distance
 

Given two strings  s  and  t , determine if they are both one edit distance apart.

Note: 

There are 3 possiblities to satisify one edit distance apart:

Insert a character into  s  to get  t
Delete a character from  s  to get  t
Replace a character of  s  to get  t
Example 1:

Input: _s_ = "ab", _t_ = "acb"
Output: true
Explanation: We can insert 'c' into _s_  to get  _t._

Example 2:

Input: _s_ = "cab", _t_ = "ad"
Output: false
Explanation: We cannot get _t_ from _s_ by only one step.

Example 3:

Input: _s_ = "1203", _t_ = "1213"
Output: true
Explanation: We can replace '0' with '1' to get  _t._
*/

function isOneEditDistance(s: string, t: string) {
  const [m, n] = [s.length, t.length];

  if (Math.abs(m - n) > 1) {
    return false;
  }

  for (let i = 0; i < Math.min(m, n); ++i) {
    if (s[i] !== t[i]) {
      if (m === n) {
        return s.substring(i + 1) === t.substring(i + 1);
      } else if (m < n) {
        return s.substring(i) === t.substring(i + 1);
      } else {
        return s.substring(i + 1) === t.substring(i);
      }
    }
  }

  return true;
}
