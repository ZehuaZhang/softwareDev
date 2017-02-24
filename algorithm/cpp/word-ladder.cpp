// 127. Word Ladder
// Difficulty: Medium

// Given two words (beginWord and endWord), and a dictionary word list,
// find the length of shortest transformation sequence from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each intermediate word must exist in the word list
// For example,

// Given:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
// As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.

// Note:
// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.


class Solution {
public:
    int ladderLength(string beginWord, string endWord, unordered_set<string>& wordDict) {
        unordered_map<string, int> pathLength;
        queue<string> q;
        pathLength[beginWord] = 1;
        q.push(beginWord);

        while (!q.empty()) {
            string word = q.front(); q.pop();
            for (int i = 0; i < word.size(); ++i) {
                string newWord = word;
                for (char ch = 'a'; ch <= 'z'; ++ch) {
                    newWord[i] = ch;
                    if (newWord == endWord) {
                    	return pathLength[word] + 1;
                    }
                    if (wordDict.count(newWord) && !pathLength.count(newWord)) {
                        q.push(newWord);
                        pathLength[newWord] = pathLength[word] + 1;
                    }   
                }
            }
        }
        return 0;
    }
};