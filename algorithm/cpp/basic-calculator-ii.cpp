// 227. Basic Calculator II
// Difficulty: Medium

// Implement a basic calculator to evaluate a simple expression string.

// The expression string contains only non-negative integers, +, -, *, / operators and empty spaces .
// The integer division should truncate toward zero.

// You may assume that the given expression is always valid.

// Some examples:
// "3+2*2" = 7
// " 3/2 " = 1
// " 3+5 / 2 " = 5

// Time:  O(n)
// Space: O(n)

// Support +, -, *, /, (, ).
class Solution {
public:
    int calculate(string s) {
        stack<int64_t> operands;
        stack<char> operators;
        int d = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (isdigit(s[i])) {
                d = d * 10 + s[i] - '0';
                if (i == s.length() - 1 || !isdigit(s[i + 1])) {
                    operands.push(d);
                    d = 0;
                }
            } else if (s[i] == '(' || isOperator(s[i])) {
                while (!operators.empty() && precedence(s[i]) <= precedence(operators.top())) {
                    compute(operands, operators);
                }
                operators.emplace(s[i]);
            } else if (s[i] == ')') {
                // operators at least one element, i.e. ')'.
                while (operators.top() != '(') {
                    compute(operands, operators);
                }
                operators.pop();
            }
        }
        while (!operators.empty()) {
            compute(operands, operators);
        }
        return operands.top();
    }
    
    bool isOperator(const char op) {
        return string("+-*/").find(op) != string::npos;
    }
    
    int precedence(const char op) {
        switch(op) {
        case '+' : return 1;
        case '-' : return 1;
        case '*' : return 2;
        case '/' : return 2;
        case '(' : return 3;
        }
        return 0;
    }

    void compute(stack<int64_t>& operands, stack<char>& operators) {
        const int64_t y = operands.top(); operands.pop();
        const int64_t x = operands.top(); operands.pop();
        const char op = operators.top(); operators.pop();

        switch (op) {
        case '+' : operands.emplace(x + y); break;
        case '-' : operands.emplace(x - y); break;
        case '*' : operands.emplace(x * y); break;
        case '/' : operands.emplace(x / y); break;
        }
    }
};