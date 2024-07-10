/*
266. Palindrome Permutation

Given a string, determine if a permutation of the string could form a palindrome.

Example 1:

Input: "code"
Output: false
Example 2:

Input: "aab"
Output: true
Example 3:

Input: "carerac"
Output: true
*/

function canPermutePalindrome(s: string): boolean {
  const set = new Set<String>();
  for (const c of s) {
    if (set.has(c)) {
      set.delete(c);
    } else {
      set.add(c);
    }
  }

  return set.size <= 1;
}