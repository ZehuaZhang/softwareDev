126. Word Ladder II
Difficulty : Hard

Given two words (start and end), and a dictionary, find all shortest transformation sequence(s) from start to end, such that:

Only one letter can be changed at a time
Each intermediate word must exist in the dictionary
For example,

Given:
start = "hit"
end = "cog"
dict = ["hot","dot","dog","lot","log"]
Return
  [
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
  ]
Note:
All words have the same length.
All words contain only lowercase alphabetic characters.

class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, unordered_set<string>& wordDict) {
        unordered_map<string, int> pathLength;
        unordered_map<string, vector<string> > father;
        queue<string> q;
        pathLength[beginWord] = 1;
        q.push(beginWord);

        vector<vector<string>> result;
        int minLevel = INT_MAX;
        while (!q.empty()) {
            string word = q.front(); q.pop();
            for (int i = 0; i < word.size(); ++i) {
                string newWord = word;
                for (char ch = 'a'; ch <= 'z'; ++ch) {
                    newWord[i] = ch;
                    if (newWord == endWord) {
                    	if (pathLength[word] + 1 > minLevel) {
                    		return result;
                    	}
                    	minLevel = pathLength[word] + 1;

                    	vector<string> path;
						gen_path(father, beginWord, newWord, path, result);
                    }
                    if (wordDict.count(newWord) && !pathLength.count(newWord)) {
                        father[newWord].push_back(word);
                        q.push(newWord);
                        pathLength[newWord] = pathLength[word] + 1;
                    }   
                }
            }
        }
        return 0;
    }

	void genPath(unordered_map<string, vector<string> > &father, const string &start, const string &curr, 
					vector<string> &path, vector<vector<string> > &result) {
		path.push_back(curr);
		if (curr == start) {
			result.push_back(path);
			reverse(result.back().begin(), result.back().end());
			return;
		}
		for (auto f : father[curr]) {
			gen_path(father, start, f, path, result);
		}
		path.pop_back();
	}
};