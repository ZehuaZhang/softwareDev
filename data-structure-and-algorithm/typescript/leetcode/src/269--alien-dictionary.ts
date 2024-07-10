/**
269. Alien Dictionary

There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

Example 1:

Input:
[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]

Output: "wertf"
Example 2:

Input:
[
  "z",
  "x"
]

Output: "zx"
Example 3:

Input:
[
  "z",
  "x",
  "z"
]

Output: ""

Explanation: The order is invalid, so return "".
Note:

You may assume all letters are in lowercase.
You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return any one of them is fine.
*/

function alienOrder(words: string[]): string {
  const n = words.length;
  const set = new Set<String>();
  for (const w of words) {
    for (const c of w) {
      set.add(c);
    }
  }
  const m = set.size;

  const graph: Set<number>[] = [...Array(26)].map(() => new Set<number>);
  const inDgr: number[] = Array(26).fill(0);
  const code = 'a'.charCodeAt(0);
  for (let i = 1; i < n; ++i) {
    const w1 = words[i - 1];
    const w2 = words[i];
    for (let j = 0; j < Math.min(w1.length, w2.length); ++j) {
      const c1 = w1.charCodeAt(j) - code;
      const c2 = w2.charCodeAt(j) - code;

      if (c1 !== c2) {
        graph[c1].add(c2);
        ++inDgr[c2];
        break;
      }
    }
  }

  
  const q: number[] = [];
  for (let i = 0; i < m; ++i) {
    if (!inDgr[i]) {
      q.push(i);
    }
  }

  const rslt: string[] = [];
  while (q.length) {
    const p = q.shift();
    rslt.push(String.fromCharCode(p + code));
    for (const c of graph[p]) {
      if (--inDgr[c] === 0) {
        q.push(c);
      }
    }
  }

  return m === rslt.length ? rslt.join('') : '';
}
