/*
205. Isomorphic Strings

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true
 

Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
*/

function isIsomorphic(s: string, t: string): boolean {
  const map1 = Array(256).fill(undefined);
  const map2 = Array(256).fill(undefined);
  for (let i = 0; i < s.length; ++i) {
    const c1 = s.charCodeAt(i);
    const c2 = t.charCodeAt(i);
    if (map1[c1] !== map2[c2]) {
      return false;
    }
    map1[c1] = map2[c2] = i;
  }
  return s.length === t.length;
}
