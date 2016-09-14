301. Remove Invalid Parentheses
Difficulty: Hard

Remove the minimum number of invalid parentheses in order to make the input string valid.
Return all possible results.

Note: The input string may contain letters other than the parentheses ( and ).

Examples:
"()())()" -> ["()()()", "(())()"]
"(a)())()" -> ["(a)()()", "(a())()"]
")(" -> [""]

// Time:  O(C(n, c)), try out all possible substrings with the minimum c deletion.
// Space: O(c), the depth is at most c, and it costs n at each depth

// DFS solution with removed array. (4ms)
class Solution {
public:
    vector<string> removeInvalidParentheses(string s)  {
        class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        unordered_set<string> visited;
        bool found = false;
        vector<string> result;
        queue<string> q;
        q.push(s);
        visited.insert(s);

        while (!q.empty()) {
            s = q.front(); q.pop();
            if (isValid(s)) {
                result.push_back(s);
                found = true;
            }
            if (found) {
                continue;
            }
            for (int i = 0; i < s.size(); ++i) {
                if (s[i] != '(' && s[i] != ')') {
                    continue;
                }    
                string subS = s.substr(0, i) + s.substr(i + 1);
                if (!visited.count(subS)) {
                    q.push(subS);
                    visited.insert(subS);
                }
            }
        }
        return result;
    }
    bool isValid(string t) {
        int cnt = 0;
        for (int i = 0; i < t.size(); ++i) {
            if (t[i] == '(') {
                ++cnt;
            }
            if (t[i] == ')' && cnt-- == 0) {
                return false;
            }
        }
        return cnt == 0;
    }
};