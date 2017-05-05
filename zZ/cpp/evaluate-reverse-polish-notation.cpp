// 150. Evaluate Reverse Polish Notation
// Difficulty: Medium

// Evaluate the value of an arithmetic expression in Reverse Polish Notation.

// Valid operators are +, -, *, /. Each operand may be an integer or another expression.

// Some examples:
//   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
//   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  int evalRPN(vector<string>& tokens) {
    if (tokens.empty()) {
      return 0;
    }
    stack<int> s;
    for (const auto& token : tokens) {
      if (!isOperator(token)) {
        s.emplace(stoi(token));
      } else {
        int y = s.top(); s.pop();
        int x = s.top(); s.pop();
        switch(token[0]) {
          case '+' : x += y; break;
          case '-' : x -= y; break;
          case '*' : x *= y; break;
          case '/' : x /= y; break;
        }
        s.emplace(x);
      }
    }
    return s.top();
  }

private:
  bool isOperator(const string& op) {
    return op.length() == 1 && string("+-*/").find(op) != string::npos;
  }
};
