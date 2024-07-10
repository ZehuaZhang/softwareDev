/*
242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
      return false;
  }
  const cnts = Array(256).fill(0);
  for (const c of s) {
      ++cnts[c.charCodeAt(0)];
  }

  for (const c of t) {
      if (--cnts[c.charCodeAt(0)] < 0) {
          return false;
      }
  }

  return true;
};
