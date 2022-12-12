/*
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
strs[i] consists of lower-case English letters.
*/
function groupAnagrams(inputList: string[]): string[][] {
  const result: string[][] = [];
  const anagramListMap = new Map<string, string[]>();
  for (const input of inputList) {
    const countList = Array(26).fill(0);
    for (const char of input) {
      ++countList[char.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    const key = countList
      .filter(Boolean)
      .map((count, i) => `${count}:${i}`)
      .join('_');
    if (!anagramListMap.has(key)) {
      anagramListMap.set(key, []);
    }
    anagramListMap.get(key)!.push(input);
  }
  result.push(...anagramListMap.values());

  return result;
}

function groupAnagramsSort(inputList: string[]): string[][] {
  const result: string[][] = [];
  const anagramIndexMap = new Map<string, number>();
  for (const input of inputList) {
    const sorted = [...input].sort().join('');
    if (!anagramIndexMap.has(sorted)) {
      anagramIndexMap.set(sorted, result.length);
      result.push([]);
    }
    result[anagramIndexMap.get(sorted)!].push(input);
  }

  return result;
}
