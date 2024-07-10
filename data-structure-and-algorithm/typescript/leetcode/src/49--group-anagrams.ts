/*
49. Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]
 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
*/

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (let i = 0; i < strs.length; ++i) {
      const cnts = Array(26).fill(0);
      for (const c of strs[i]) {
          ++cnts[c.charCodeAt(0) - 'a'.charCodeAt(0)];
      }
      const h = cnts.map((c, i) => c ? `${c}:${i}` : '').filter(Boolean).join('_');
      if (!map.has(h)) {
          map.set(h, []);
      }
      map.get(h).push(strs[i]);
  }

  return [...map.values()];
};
