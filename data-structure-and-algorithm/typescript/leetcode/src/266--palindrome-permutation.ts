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

function canPermutePalindrome(input: string): boolean {
  const letterSet = new Set<string>();
  for (const char of input) {
    if (letterSet.has(char)) {
      letterSet.delete(char);
    } else {
      letterSet.add(char);
    }
  }
  return letterSet.size < 2;
}
