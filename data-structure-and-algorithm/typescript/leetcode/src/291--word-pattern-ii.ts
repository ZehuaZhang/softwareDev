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

  function dfs(i0: number, j0: number) {
    if (i0 === m && j0 === n) {
      return true;
    }
    if (i0 === m || j0 === n) {
      return false;
    }
    const c = pattern[i0];
    for (let j = j0; j < n; ++j) {
      const w = str.substring(j0, j + 1);
      if (mp.get(c) === w) {
        if (dfs(i0 + 1, j + 1)) {
          return true;
        }
      } else if (!mp.has(c)) {
        if (st.has(w)) {
          continue;
        }
        mp.set(c, w);
        st.add(w);
        if (dfs(i0 + 1, j + 1)) {
          return true;
        }
        st.delete(w);
        mp.delete(c);
      }
    }

    return false;
  }
}
