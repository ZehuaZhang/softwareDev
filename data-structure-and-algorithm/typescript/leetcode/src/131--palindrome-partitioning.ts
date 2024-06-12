/*
131. Palindrome Partitioning

Given a string s, partition s such that every substring of the partition is a palindrome.
Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
*/

function partition(s: string): string[][] {
  const result: string[][] = [];
  dfs(0, []);
  return result;

  function dfs(start: number, path: string[]) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < s.length; ++i) {
      if (isPalindrome(s, start, i)) {
        path.push(s.substring(start, i + 1));
        dfs(i + 1, path);
        path.pop();
      }
    }
  }

  function isPalindrome(s: string, l: number, r: number) {
    for (; l < r; ++l, --r) {
      if (s[l] !== s[r]) {
        return false;
      }
    }
    return true;
  }
}
