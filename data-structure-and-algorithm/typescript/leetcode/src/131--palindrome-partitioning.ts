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
  const n = s.length;
  const path: string[] = [];
  const rslt: string[][] = [];

  dfs(0);

  return rslt;

  function dfs(i0: number) {
    if (i0 === n) {
      return rslt.push([...path]);
    }

    for (let i = i0; i < n; ++i) {
      const sub = s.substring(i0, i + 1);
      if (isPalindrome(i0, i)) {
        path.push(sub);
        dfs(i + 1);
        path.pop();
      }
    }
  }

  function isPalindrome(l: number, r: number) {
    for (; l < r; ++l, --r) {
      if (s[l] !== s[r]) {
        return false;
      }
    }

    return true;
  }
}
