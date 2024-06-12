/*
290. Word Pattern
 

Given a pattern and a string str, find if strfollows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty substring in str.

Example 1:

Input: pattern = "abab", str = "redblueredblue"
Output: true

Example 2:

Input: pattern = pattern = "aaaa", str = "asdasdasdasd"
Output: true

Example 3:

Input: pattern = "aabb", str = "xyzabcxzyabc"
Output: false

Notes:
You may assume both pattern and str contains only lowercase letters.
*/

function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(' ');

  const pm = new Map<string, number>();
  const wm = new Map<string, number>();

  for (let i = 0; i < pattern.length; ++i) {
    if (pm.get(pattern[i]) !== wm.get(words[i])) {
      return false;
    }
    pm.set(pattern[i], i);
    wm.set(words[i], i);
  }

  return pattern.length === words.length;
}
