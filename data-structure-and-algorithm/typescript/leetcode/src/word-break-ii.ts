/*
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.



Example 1:

Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
Example 2:

Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []


Constraints:

1 <= s.length <= 20
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 10
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
*/

function wordBreakII(input: string, dict: string[]): string[] {
  const cache = new Map<string, string[]>();
  return wordBreakIIDfs(input);

  function wordBreakIIDfs(input: string): string[] {
    if (cache.has(input)) {
      return cache.get(input)!;
    }
    const result: string[] = [];
    if (input.length === 0) {
      result.push('');
      cache.set(input, result);
      return result;
    }
    for (const word of dict) {
      if (input.startsWith(word)) {
        for (const phraseList of wordBreakIIDfs(input.substring(word.length))) {
          result.push([word, phraseList].filter(Boolean).join(' '));
        }
      }
    }
    cache.set(input, result);
    return result;
  }
}
