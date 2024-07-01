/*
267. Palindrome Permutation II

Given a string s, return all the palindromic permutations (without duplicates) of it. Return an empty list if no palindromic permutation could be form.

Example 1:

Input: "aabb"
Output: ["abba", "baab"]
Example 2:

Input: "abc"
Output: []
*/

function generatePalindromes(input: string): string[] {
  const letterCountMap = new Map<string, number>();
  for (const char of input) {
    letterCountMap.set(char, (letterCountMap.get(char) || 0) + 1);
  }
  let cnt = 0;
  let midChar = '';
  for (const [char, count] of letterCountMap.entries()) {
    if (count & 1) {
      if (midChar.length !== 0) {
        return [];
      }
      midChar = char;
    }
    letterCountMap.set(char, count >> 1);
    cnt += count >> 1;
  }
  const result: string[] = [];
  generatePalindromesDfs('');
  return result;

  function generatePalindromesDfs(path: string): void {
    if (path.length === cnt) {
      result.push([path, midChar, ...[...path].reverse()].join(''));
      return;
    }
    for (const [char, count] of letterCountMap.entries()) {
      if (count > 0) {
        letterCountMap.set(char, count - 1);
        generatePalindromesDfs(path + char);
        letterCountMap.set(char, count);
      }
    }
  }
}
