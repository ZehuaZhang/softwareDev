/*
Given a string s, return all the palindromic permutations (without duplicates) of it. Return an empty list if no palindromic permutation could be form.

Example 1:

Input: "aabb"
Output: ["abba", "baab"]
Example 2:

Input: "abc"
Output: []
*/

function generatePalindromes(s) {
  const map = new Map();
  for (const c of s) {
    map.set(c, (map.get(c) || 0) + 1);
  }
  const ss = [],
    odd = [];
  for (const [c, count] of map) {
    if (count & 1) {
      if (odd.length) {
        return [];
      }
      odd.push(c);
    }
    map.set(c, count / 2);
    ss.push(c.repeat(count / 2));
  }
  const result = [];
  dfs(ss.join(''), odd, '', result, map);
  return result;
}

function dfs(s, odd, curr, result, map) {
  if (curr.length === s.length) {
    result.push([curr, ...odd, ...[...curr].reverse()].join(''));
    return;
  }
  for (const [c, count] of map) {
    if (count > 0) {
      map.set(c, count - 1);
      dfs(s, odd, curr + c, result, map);
      map.set(c, count);
    }
  }
}
