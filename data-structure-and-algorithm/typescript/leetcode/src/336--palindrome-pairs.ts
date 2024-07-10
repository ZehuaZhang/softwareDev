/*
336. Palindrome Pairs

Given a list of unique words. Find all pairs of  distinct  indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.

Example 1:
Given words = ["bat", "tab", "cat"]
Return [[0, 1], [1, 0]]
The palindromes are ["battab", "tabbat"]

Example 2:
Given words = ["abcd", "dcba", "lls", "s", "sssll"]
Return [[0, 1], [1, 0], [3, 2], [2, 4]]
The palindromes are ["dcbaabcd", "abcddcba", "slls", "llssssll"]
*/

function palindromePairs(words: string[]): number[][] {
  const rslt: [number, number][] = [];
  const map = new Map<string, number>();
  for (let i = 0; i < words.length; ++i) {
      map.set(words[i], i);
  }
  for (let i = 0; i < words.length; ++i) {
      const w = words[i];
      const m = w.length;
      const rs = [...w].reverse().join('');
      for (let l = 0, r = 0; l <= r;) {
          const s = rs.slice(m - r, m - l);
          if (
              map.has(s) &&
              i !== map.get(s) &&
              (l ? isValid(w, 0, l - 1) : isValid(w, r, m - 1))
          ) {
              rslt.push(l ? [map.get(s), i] : [i, map.get(s)]);
          }
          if (r < m) {
              ++r;
          } else {
              ++l;
          }
      }
  }
  return rslt;

  function isValid(s: string, l: number, r: number) {
      for (; l < r; ++l, --r) {
          if (s[l] !== s[r]) {
              return false;
          }
      }
      return true;
  }
}
