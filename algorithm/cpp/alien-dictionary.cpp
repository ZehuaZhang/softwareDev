// 269. Alien Dictionary
// Difficulty : Hard 

// There is a new alien language which uses the latin alphabet. 
// However, the order among letters are unknown to you. You receive a list of words from the dictionary,
// where words are sorted lexicographically by the rules of this new language. 
// Derive the order of letters in this language.

// For example,
// Given the following words in dictionary,
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]
 

// The correct order is: "wertf".

// Note:
// You may assume all letters are in lowercase.
// If the order is invalid, return an empty string.
// There may be multiple valid order of letters, return any one of them is fine.

// Time:  O(n)
// Space: O(|V|+|E|) = O(26 + 26^2) = O(1)

// BFS solution.
// BFS
class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_set<char> letters;
        for (auto word : words) {
            letters.insert(word.begin(), word.end());
        }

        set<pair<char, char>> orders;
        for (int i = 0; i < words.size() - 1; ++i) {
            for (int j = 0; j < min(words[i].size(), words[i + 1].size()); ++j) {
                if (words[i][j] != words[i + 1][j]) {
                    orders.insert(make_pair(words[i][j], words[i + 1][j]));
                    break;
                }
            }
        }
        vector<int> in(256, 0);
        for (auto order : orders) {
            ++in[order.second];
        }
        queue<char> q;
        string result = "";
        for (auto letter : letters) {
            if (in[letter] == 0) {
                q.push(letter);
                result += letter;
            } 
        }
        while (!q.empty()) {
            char letter = q.front(); q.pop();
            for (auto order : orders) {
                if (order.first == letter) {
                    if (--in[order.second] == 0) {
                        q.push(order.second);
                        result += order.second;
                    }
                }
            }
        }
        return result.size() == letter.size() ? result : "";
    }
};