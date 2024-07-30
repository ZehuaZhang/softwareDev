/*
290. Word Pattern

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

 

Example 1:

Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
 

Constraints:

1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.
*/

function wordPattern(pattern: string, s: string): boolean {
  const m1 = new Map<string, number>();
  const m2 = new Map<string, number>();

  const ws = s.split(" ");
  const n = pattern.length;
  if (ws.length !== n) {
    return false;
  }

  for (let i = 0; i < n; ++i) {
    if (m1.get(pattern[i]) !== m2.get(ws[i])) {
      return false;
    }

    m1.set(pattern[i], i);
    m2.set(ws[i], i);
  }

  return true;
}
