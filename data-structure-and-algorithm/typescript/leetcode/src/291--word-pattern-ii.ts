/*
291. Word Pattern II
 

Given a pattern and a string str, find if strfollows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty substring in str.

Example 1:

Input: pattern = "abab", str = "redblueredblue"
Output: true

Example 2:

Input:  pattern = "aaaa", str = "asdasdasdasd"
Output: true

Example 3:

Input: pattern = "aabb", str = "xyzabcxzyabc"
Output: false

Notes:
You may assume both pattern and str contains only lowercase letters.
*/

function wordPatternMatch(pattern: string, str: string) {
  const [m, n] = [pattern.length, str.length];
  const mp = new Map<string, string>();
  const st = new Set<string>();
  return dfs(0, 0);

  function dfs(p: number, s: number) {
    if (p === m && s === n) {
      return true;
    }
    if (p === m || s === n) {
      return false;
    }
    const c = pattern[p];
    for (let i = s; i < n; ++i) {
      const t = str.substring(s, i + 1);
      if (mp.has(c) && mp.get(c) === t) {
        if (dfs(p + 1, i + 1)) {
          return true;
        }
      } else if (!mp.has(c)) {
        if (st.has(t)) {
          continue;
        }
        mp.set(c, t);
        st.add(t);
        if (dfs(p + 1, i + 1)) {
          return true;
        }
        mp.delete(c);
        st.delete(t);
      }
    }
    return false;
  }
}
