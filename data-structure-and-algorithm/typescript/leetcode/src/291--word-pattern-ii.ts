/*
291. Word Pattern II
 

Given a pattern and a string str, find if strfollows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty substring in str.

Example 1:

Input: pattern = "abab", str = "redblueredblue"
Output: true

Example 2:

Input: pattern = pattern = "aaaa", str = "asdasdasdasd"
Output: true

Example 3:

Input: pattern = "aabb", str = "xyzabcxzyabc"
Output: false

Notes:
You may assume both pattern and str contains only lowercase letters.
*/

function wordPatternMatch(pattern: string, str: string) {
  const [a, b] = [pattern.length, str.length];
  const m = new Map<string, string>();
  const st = new Set<string>();
  return dfs(0, 0);

  function dfs(p: number, r: number) {
    if (p === a && r === b) {
      return true;
    }
    if (p === a || r === b) {
      return false;
    }
    const c = pattern[p];
    for (let i = r; i < b; ++i) {
      const t = str.substring(r, i + 1);
      if (m.has(c) && m.get(c) === t) {
        if (dfs(p + 1, i + 1)) {
          return true;
        }
      } else if (!m.has(c)) {
        if (st.has(t)) {
          continue;
        }
        m.set(c, t);
        st.add(t);
        if (dfs(p + 1, i + 1)) {
          return true;
        }
        m.delete(c);
        st.delete(t);
      }
    }
    return false;
  }
}
