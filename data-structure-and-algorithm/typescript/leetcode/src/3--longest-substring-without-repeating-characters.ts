/*
3. Longest Substring Without Repeating Characters

Given a string s, find the length of the longest 
substring
 without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

function lengthOfLongestSubstring(s: string): number {
  let rslt = 0;
  const map = new Map<string, number>();
  for (let l = 0, r = 0; r < s.length; ++r) {
    const c = s[r];
    if (map.has(c) && map.get(c) >= l) {
      l = map.get(c) + 1;
    }
    rslt = Math.max(r - l + 1, rslt);
    map.set(c, r);
  }

  return rslt;
}
