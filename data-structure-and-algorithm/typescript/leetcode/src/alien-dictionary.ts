/**
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

import {runTestCaseList} from './util/test';
import {Queue} from './data-structure/Queue';

function alienOrder(words: string[]): string {
  const baseCode = 'a'.charCodeAt(0);
  const uniqCharSet = new Set<string>();
  words.forEach(word => {
    for (const char of word) {
      uniqCharSet.add(char);
    }
  });
  const inDegree = Array(26).fill(0);
  const graph = [...Array(26)].map(() => new Set<number>());
  for (let i = 0; i < words.length - 1; ++i) {
    for (let j = 0; j < Math.min(words[i].length, words[i + 1].length); ++j) {
      const prev = words[i][j].charCodeAt(0) - baseCode;
      const curr = words[i + 1][j].charCodeAt(0) - baseCode;
      if (prev !== curr) {
        graph[prev].add(curr);
        ++inDegree[curr];
        break;
      }
    }
  }

  const queue = new Queue();
  inDegree.forEach((degree, offset) => {
    if (
      degree === 0 &&
      uniqCharSet.has(String.fromCharCode(baseCode + offset))
    ) {
      queue.push(offset);
    }
  });

  const result = [];
  while (!queue.isEmpty()) {
    const offset = queue.pop();
    result.push(String.fromCharCode(offset + baseCode));
    for (const next of graph[offset].values()) {
      if (--inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return uniqCharSet.size === result.length ? result.join('') : '';
}

// tests

const testInputListCollection = [
  [['wrt', 'wrf', 'er', 'ett', 'rftt']],
  [['z', 'x']],
  [['z', 'x', 'z']],
];

const expectedResultList = ['wertf', 'zx', ''];

runTestCaseList(testInputListCollection, expectedResultList, alienOrder);
