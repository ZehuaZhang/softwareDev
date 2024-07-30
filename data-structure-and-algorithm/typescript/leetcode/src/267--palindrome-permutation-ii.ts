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

function generatePalindromes(s: string): string[] {
  const map = new Map<string, number>();
  for (const c of s) {
    map.set(c, (map.get(c) || 0) + 1);
  }

  let ttl = 0;
  let mc = "";
  for (const [c, cnt] of map) {
    if (cnt % 2) {
      if (mc) {
        return [];
      }
      mc = c;
    }
    map.set(c, Math.trunc(cnt / 2));
    ttl += Math.trunc(cnt / 2);
  }

  const path: string[] = [];
  const rslt: string[] = [];
  dfs();
  return rslt;

  function dfs() {
    if (path.length === ttl) {
      const s = path.join("");
      const rs = path.reverse().join("");
      return rslt.push([s, mc, rs].join(""));
    }

    for (const [c, cnt] of map) {
      if (cnt > 0) {
        map.set(c, cnt - 1);
        path.push(c);
        dfs();
        path.pop();
        map.set(c, cnt);
      }
    }
  }
}
