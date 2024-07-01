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

function palindromePairs(words: string[]) {
  const rslt: [number, number][] = [];
  const m = new Map<string, number>();
  for (let i = 0; i < words.length; ++i) {
    m.set(words[i], i);
  }
  for (let i = 0; i < words.length; ++i) {
    for (let l = 0, r = 0; l <= r; ) {
      const t = words[i].substring(l, r).split('').reverse().join('');
      if (
        m.has(t) &&
        i !== m.get(t) &&
        isValid(words[i].substring(l ? 0 : r, l ?  l : undefined))
      ) {
        rslt.push(l ? [m.get(t)!, i] : [i, m.get(t)!]);
      }
      if (r < words[i].length) {
        ++r;
      } else {
        ++l;
      }
    }
  }
  return rslt;

  function isValid(t: string) {
    for (let i = 0; i < t.length / 2; ++i) {
      if (t[i] !== t[t.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
}
