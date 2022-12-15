/*
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
  const ss: string[] = [];
  const oddList: string[] = [];
  for (const [char, count] of letterCountMap.entries()) {
    if (count & 1) {
      if (oddList.length) {
        return [];
      }
      oddList.push(char);
    }
    letterCountMap.set(char, count / 2);
    ss.push(char.repeat(count / 2));
  }
  const result: string[] = [];
  dfs(ss.join(''), oddList, '');
  return result;

  function dfs(input: string, odd: string[], curr) {
    if (curr.length === input.length) {
      result.push([curr, ...odd, ...[...curr].reverse()].join(''));
      return;
    }
    for (const [c, count] of letterCountMap) {
      if (count > 0) {
        letterCountMap.set(c, count - 1);
        dfs(input, odd, curr + c);
        letterCountMap.set(c, count);
      }
    }
  }
}
