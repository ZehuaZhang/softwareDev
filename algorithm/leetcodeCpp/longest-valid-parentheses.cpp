32. Longest Valid Parentheses
Difficulty: Hard

Given a string containing just the characters '(' and ')', 
find the length of the longest valid (well-formed) parentheses substring.

For "(()", the longest valid parentheses substring is "()", which has length = 2.

Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int longestValidParentheses(string s) {
        int maxLen = 0;
        stack<int> matchStart; // keep track of the positions of non-matching '('s
        matchStart.push(-1);
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] =='(') {
                matchStart.push(i);
            } else {
                matchStart.pop();
                
                if (matchStart.empty()) {
                    matchStart.push(i);
                } else {
                    maxLen = max(maxLen, i - matchStart.top());
                }
            }
        }
        return maxLen;
    }
};

class Solution2 {
public:
    int longestValidParentheses(string s) {
        int maxLen = 0, last = -1; // the position of the last ')'
        stack<int> lefts; // keep track of the positions of non-matching '('s
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] =='(') {
                lefts.push(i);
            } else {
                if (lefts.empty()) {
                    // no matching left
                    last = i;
                } else {
                    // find a matching pair
                    lefts.pop();
                    int len = lefts.empty() ? i - last : i - lefts.top();
                    maxLen = max(maxLen, len);
                }
            }
        }
        return maxLen;
    }
};

