// 22. Generate Parentheses
// Difficulty: Medium

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// For example, given n = 3, a solution set is:

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

// Time Complexity: O(2^n/n)??
// Space Complexity: O(n)

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        if (n == 0) {
            return vector<string>(1, "");
        }
        if (n == 1) {
            return vector<string>(1, "()");
        }
        vector<string> result;
        for (int i = 0; i < n; ++i) {
            for (auto inner : generateParenthesis (i)) {
                for (auto outer : generateParenthesis (n - 1 - i)) {
                    result.push_back ("(" + inner + ")" + outer);
                }
            }
        }
        return result;
    }
};
