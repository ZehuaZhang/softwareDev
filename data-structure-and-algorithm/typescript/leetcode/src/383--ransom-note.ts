/*
383. Ransom Note

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

 

Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true
 

Constraints:

1 <= ransomNote.length, magazine.length <= 105
ransomNote and magazine consist of lowercase English letters.

*/
function canConstruct(ransomNote: string, magazine: string): boolean {
  const cnt = Array(26).fill(0);
  for (const c of magazine) {
    ++cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)];
  }
  for (const c of ransomNote) {
    if (--cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)] < 0) {
      return false;
    }
  }
  return true;
}
