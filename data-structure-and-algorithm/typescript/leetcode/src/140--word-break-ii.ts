/*
140. Word Break II

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
Input is generated in a way that the length of the answer doesn't exceed 105.
*/

function wordBreak(s: string, wordDict: string[]): string[] {
  const memo = new Map<string, string[]>();
  const set = new Set(wordDict);

  return dfs(s);

  function dfs(str: string) {
      if (memo.has(str)) {
          return memo.get(str);
      }

      if (!str.length) {
          memo.set(str, ['']);
          return memo.get(str);
      }

      const rslt: string[] = [];

      for (const word of set) {
          if (str.startsWith(word)) {
              for (const phrase of dfs(str.substring(word.length))) {
                  rslt.push([word, phrase].filter(Boolean).join(' '));
              }
          }
      }

      memo.set(str, rslt);
      return memo.get(str);
  }
};
