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
  const result: string[][] = [];
  const ngrmRsltIdxMap = new Map<string, number>();
  for (const str of strs) {
    const cntList = Array(26).fill(0);
    for (const c of str) {
      ++cntList[c.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    const key = cntList
      .map((cnt, i) => (cnt ? `${cnt}:${i}` : ''))
      .filter(Boolean)
      .join('_');
    if (!ngrmRsltIdxMap.has(key)) {
      ngrmRsltIdxMap.set(key, result.length);
      result.push([]);
    }
    result[ngrmRsltIdxMap.get(key)].push(str);
  }
  return result;
}
