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
    vector<vector<string> > findLadders(string start, string end, unordered_set<string> &dict) {
        vector<vector<string>> result;
        dict.insert(end);
        vector<string> p;
        p.push_back(start);
        queue<vector<string> > paths;
        paths.push(p);
        int level = 1, minLevel = INT_MAX;
        unordered_set<string> words;
        while (!paths.empty()) {
            vector<string> path = paths.front();
            paths.pop();
            if (path.size() > level) {
                for (string w : words) dict.erase(w);
                words.clear();
                level = path.size();
                if (level > minLevel) break;
            }
            string last = path.back();
            for (int i = 0; i < last.size(); ++i) {
                string newLast = last;
                for (char ch = 'a'; ch <= 'z'; ++ch) {
                    newLast[i] = ch;
                    if (dict.find(newLast) != dict.end()) {
                        words.insert(newLast);
                        vector<string> nextPath = path;
                        nextPath.push_back(newLast);
                        if (newLast == end) {
                            res.push_back(nextPath);
                            minLevel = level;
                        } else paths.push(nextPath);
                    }
                }
            }            
        }
        return res;
    }
};