20. Valid Parentheses
Difficulty: Easy

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

// Time:  O(n)		
// Space: O(n)

class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> pair = {{')', '('},
                                            {']', '['},
                                            {'}', '{'}};
        stack<char> lefts;
        for (auto c : s) {
            if (pair.find(c) != pair.end()) {
                if (lefts.empty() ||
                    lefts.top() != pair[c]) {
                    return false;
                }
                lefts.pop();
            } else {
                lefts.emplace(c);
            }
        }
        return lefts.empty();
    }
};
